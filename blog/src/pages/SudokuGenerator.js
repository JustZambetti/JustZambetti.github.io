import {useEffect, useRef, useState} from "react";
import p5 from 'p5';
import {shuffleArray} from "../helpFunctions";
import {Button, ButtonGroup} from "react-bootstrap";
import {Sudoku} from "../sudoku";

const sketch = (p)=> {
    let canvasWidth, canvasHeight
    let gridSize = 9, cellSize, gridPixelSize
    let margin = 10
    let thickLineWeight = 3
    let thinLineWeight = 0.8
    let sudoku = []


    let solution
    p.setup = () => {
        canvasWidth = canvasHeight = Math.min(600, 0.6*Math.min(p.displayWidth, p.displayHeight))
        cellSize = Math.min(0.95 * canvasWidth / gridSize, 0.95 * canvasHeight / gridSize)
        gridPixelSize = gridSize*cellSize;
        p.easySetup()
        p.createCanvas(canvasWidth, canvasHeight)
    }

    p.easySetup = () => {
        errors = []
        sudoku = new Sudoku()
        findRandomSudokuSolution(0)
        solution = sudoku.grid.map(innerArray => innerArray.slice());
        removeSudokuCells(45)
    }
    p.normalSetup = () => {
        errors = []
        sudoku = new Sudoku()
        findRandomSudokuSolution(0)
        solution = sudoku.grid.map(innerArray => innerArray.slice());
        removeSudokuCells(50)
    }
    p.hardSetup = () => {
        errors = []
        sudoku = new Sudoku()
        findRandomSudokuSolution(0)
        solution = sudoku.grid.map(innerArray => innerArray.slice());
        removeSudokuCells(55)
    }

    p.draw = () => {
        drawGrid()
    }

    let selectedCell = null
    p.mouseClicked = ()=> {
        let x =  Math.floor((p.mouseX - margin) / cellSize)
        let y =Math.floor((p.mouseY - margin) / cellSize)

        if (x >= 0
            && x < gridSize
            && y >= 0
            && y < gridSize)
            selectedCell = {
                x: x,
                y: y
            }
    }
    p.touchStart = () => {
        let firstTouch = p.touches[0];
        p.mouseX = firstTouch.clientX;
        p.mouseY = firstTouch.clientY;
        p.mouseClicked()
    }

    function drawGrid() {
        p.background(255)
        p.translate(margin, margin)

        if (selectedCell) {
            p.push()
            p.strokeWeight(0)
            p.fill("#edfaff")
            p.rect(Math.floor(selectedCell.x / 3) * 3 * cellSize,
                Math.floor(selectedCell.y / 3) * 3 * cellSize, cellSize * 3, cellSize * 3)
            p.rect(0, selectedCell.y * cellSize, gridPixelSize, cellSize)
            p.rect(selectedCell.x * cellSize, 0, cellSize, gridPixelSize)

            p.fill("#abd3f5")
            p.rect(selectedCell.x * cellSize, selectedCell.y * cellSize, cellSize, cellSize)
            p.pop()
        }

        for (let i = 0; i <= gridSize; i++) {
            const cord = i * cellSize;
            const isThick = i % 3 === 0
            if (!isThick) {
                drawVerticalGridLine(cord, isThick)
                drawHorizontalGridLine(cord, isThick)
            }
        }
        for (let i = 0; i <= gridSize; i++) {
            const cord = i * cellSize;
            const isThick = i % 3 === 0

            if (isThick) {
                drawVerticalGridLine(cord, isThick)
                drawHorizontalGridLine(cord, isThick)
            }
        }

        p.push()
        p.fill("red")
        errors.forEach(error => {
            p.text(error.value, error.x * cellSize, error.y * cellSize, cellSize, cellSize)
        })
        p.pop()

        for (let x = 0; x < gridSize; x++)
            for (let y = 0; y < gridSize; y++) {
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(40);
                if(sudoku.get(x,y))
                    p.text(sudoku.get(x,y), x*cellSize, y*cellSize, cellSize, cellSize)
        }
    }
    function drawHorizontalGridLine(y, isThick) {
        drawGridLine(0, y, gridPixelSize, y, isThick)
    }

    function drawVerticalGridLine(x, isThick) {
        drawGridLine(x, 0, x, gridPixelSize, isThick)
    }

    function drawGridLine(x1, y1, x2, y2, isThick){
        p.push()
        p.strokeWeight(isThick ? thickLineWeight : thinLineWeight)
        p.stroke(isThick ? "#3d3d3d" : "#c7c7c7")
        p.line(x1, y1, x2, y2);
        p.pop()
    }

    function findRandomSudokuSolution(i = 0) {
        if (sudoku.isFull())
            return true

        let x = Math.floor(i % 9)
        let y = Math.floor(i / 9)

        if(sudoku.get(x,y))
            findRandomSudokuSolution(i+1)

        let shuffledArray = Array.from(enumerateBinaryBitsSudoku(sudoku.findImmediatelyPossibleValues(x, y)));
        shuffleArray(shuffledArray)
        for (let value of shuffledArray) {
            sudoku.move(x, y, value)

            if (findRandomSudokuSolution(i + 1))
                return true

            sudoku.move(x, y, 0)
        }

        return false
    }

    function solutionsCount(i = 0){
        if(sudoku.isFull())
            return 1

        let x = Math.floor(i%9)
        let y = Math.floor(i/9)

        if(sudoku.get(x,y))
            return solutionsCount(i+1)

        let shuffledArray = Array.from(enumerateBinaryBitsSudoku(sudoku.findImmediatelyPossibleValues(x, y)));
        shuffleArray(shuffledArray)

        let solCount = 0
        for(let value of shuffledArray){
            sudoku.move(x, y, value)

            solCount += solutionsCount(i+1)
            if(solCount > 1)
            {
                sudoku.move(x, y, 0)

                return 2
            }

            sudoku.move(x, y, 0)
        }
        return solCount
    }

    function removeSudokuCells(n){
        if(n === 0){
            return true
        }

        if(solutionsCount() > 1)
            return false;

        let possibleRemovals = []
        for(let x = 0; x < 9; x++)
            for(let y = 0; y < 9; y++)
                if(sudoku.get(x,y) !== 0)
                    possibleRemovals.push(x+y*9)

        if(possibleRemovals.length < n)
            return false
        shuffleArray(possibleRemovals)

        for(let index of possibleRemovals){
            let x = index % 9
            let y = Math.floor(index / 9)
            let temp = sudoku.get(x,y)
            sudoku.move(x,y, 0)

            if(removeSudokuCells(n-1, sudoku) === true)
                return true

            sudoku.move(x,y, temp)
        }

        return false
    }

    p.solve = ()=>{
        findRandomSudokuSolution(0, sudoku)
    }

    let errors = []
    p.setValue = (v) => {
        if(selectedCell && !sudoku.get(selectedCell.x,selectedCell.y)){
            if(solution[selectedCell.x][selectedCell.y] === v){
                sudoku.move(selectedCell.x,selectedCell.y, v)
                errors = errors.filter(error => error.x !== selectedCell.x || error.y !== selectedCell.y)
            }
            else if(errors.some(error => error.x === selectedCell.x && error.y === selectedCell.y))
                errors.find(error => error.x === selectedCell.x && error.y === selectedCell.y).value = v
            else
                errors.push({x: selectedCell.x, y: selectedCell.y, value: v})
        }
    }
}

function* enumerateBinaryBitsSudoku(number) {
    for (let i = 0; i < 9; i++)
        if((number & (1 << i)) !== 0)
            yield i+1
}

export function SudokuGenerator() {
    const p5ContainerRef = useRef();
    let p5Instance
    useEffect(() => {
        p5Instance = new p5(sketch, p5ContainerRef.current)

        return () => p5Instance.remove();
    }, [])

    return (
        <div style={{marginTop:5}}>
            <div className="text-center">
                <ButtonGroup>
                    <Button size="lg" variant="outline-success"
                            onClick={() => p5Instance.easySetup() }>
                        Easy
                    </Button>
                    <Button  size="lg" variant="outline-warning"
                            onClick={() => p5Instance.normalSetup() }>
                        Medium
                    </Button>
                    <Button size="lg" variant="outline-danger"
                            onClick={() => p5Instance.hardSetup() }>
                        Hard
                    </Button>
                </ButtonGroup>

            </div>

            <div className="App" style={{marginTop:5}} ref={p5ContainerRef}/>
            <div className="text-center">
                <ButtonGroup>
                    {
                        [1,2,3,4,5,6,7,8,9].map((v) =>
                            <Button size="lg" variant="outline-secondary"
                                    onClick={() => p5Instance.setValue(v) }>
                                {v}
                            </Button>
                        )
                    }
                </ButtonGroup>
            </div>
        </div>
    );
}
/*
<Button variant="primary" size="lg"
                    onClick={() => p5Instance.solve() }>
                Solve
            </Button>
 */