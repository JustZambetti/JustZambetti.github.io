import {useEffect, useRef} from "react";
import p5 from 'p5';
import {convexHullGrahamScan, distance} from "../helpFunctions";

function sketch(p) {
    let canvasWidth, canvasHeight
    let mazeWidth = 50, mazeHeight = 50
    let cellSize
    let visited

    let columns, rows
    let offset = 5
    p.setup = () => {
        canvasWidth = Math.min(400, p.displayWidth)
        canvasHeight = Math.min(400, p.displayHeight)
        cellSize = Math.min(0.95*canvasWidth/mazeWidth, 0.95*canvasHeight/mazeHeight)
        visited = []
        columns = []
        rows = []
        for (let i = 0; i < mazeWidth; i++){
            visited.push([])
            columns.push([])
            rows.push([])
            for (let j = 0; j < mazeHeight; j++){
                visited[i].push(false)
                columns[i].push(true)
                rows[i].push(true)
            }
            rows[i].push(true)
        }

        columns.push([])
        rows.push([])
        for (let j = 0; j <= mazeHeight; j++){
            columns[mazeWidth].push(true)
        }
        totalCellsCount = mazeWidth*mazeHeight

        generateMaze(5,3)

        p.createCanvas(canvasWidth, canvasHeight)
        p.background(255)
    }
    p.draw = () => {
        p.background(255)
        p.strokeWeight(2);
        for (let i = 0; i < mazeWidth; i++)
            for (let j = 0; j < mazeHeight; j++)
                if(visited[i][j])
                {
                  /*  p.fill("#83f294")
                    p.noStroke()
                    p.rect(offset+i*cellSize, offset+j*cellSize, cellSize, cellSize)
                    p.fill("red")
                    p.stroke("black")

                   */
                }

        for (let i = 0; i < mazeWidth; i++)
            for (let j = 0; j < mazeHeight; j++){
                if(rows[i][j])
                    p.line(offset+i*cellSize, offset+j*cellSize, offset+ (i+1)*cellSize, offset+j*cellSize)
                if(columns[i][j])
                    p.line(offset+i*cellSize, offset+j*cellSize, offset+i*cellSize, offset+(j+1)*cellSize)
            }

        for (let j = 0; j < mazeHeight; j++)
            if(columns[mazeWidth][j])
                p.line(offset+mazeWidth*cellSize, offset+j*cellSize, offset+mazeWidth*cellSize, offset+(j+1)*cellSize)

        for (let i = 0; i < mazeWidth; i++)
            if(rows[i][mazeHeight])
                p.line(offset+i*cellSize, offset+mazeHeight*cellSize, offset+(i+1)*cellSize, offset+mazeHeight*cellSize)

    }
    let totalCellsCount
    let visitedCellsCount = 0
    function generateMaze(x, y) {
        visited[x][y] = true;

        if(visitedCellsCount === totalCellsCount)
            return;

        const possibleMoves = []

        possibleMoves.push(() => {
            if(y < mazeHeight -1 && !visited[x][y+1]){
                rows[x][y+1] = false;
                generateMaze(x,y+1);
            }
        })

        possibleMoves.push(() => {
            if(y > 0 && !visited[x][y-1]){
                rows[x][y] = false;
                generateMaze(x,y-1);
            }
        })

        possibleMoves.push(() => {
            if(x < mazeWidth-1 && !visited[x+1][y]){
               columns[x+1][y] = false;
                generateMaze(x+1,y);
            }
        })

        possibleMoves.push(() => {
            if(x > 0 && !visited[x-1][y]){
                columns[x][y] = false;
                generateMaze(x-1,y);
            }
        })

        shuffleArray(possibleMoves)
        for(let i = 0; i < possibleMoves.length; i++)
            possibleMoves[i]();
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function Maze() {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);
        return () => {
            p5Instance.remove();
        }
    }, [])

    return (
        <p>
            <div className="App" style={{marginTop:5}} ref={p5ContainerRef}/>
        </p>
    )
}