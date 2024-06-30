import {useEffect, useRef} from "react";
import p5 from 'p5';
import {convexHullGrahamScan, distance} from "../helpFunctions";

function sketch(p) {
    let canvasWidth, canvasHeight
    let mazeWidth = 20, mazeHeight = 20
    let cellSize
    let visited, visitedSimplifying
    let sol
    let solution = []

    let checkbox, simplifiedCheckbox, gridCheckbox
    let columns, rows
    let offset = 5

    let importantNodes

    function mazeSetup(){
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

        visitedFindingSolution=[]
        visitedSimplifying=[]
        for (var i = 0; i < visited.length; i++){
            visitedFindingSolution.push(visited[i].slice());
            visitedSimplifying.push(visited[i].slice());
        }
        console.log(visitedSimplifying)


        columns.push([])
        rows.push([])
        for (let j = 0; j <= mazeHeight; j++){
            columns[mazeWidth].push(true)
        }
        totalCellsCount = mazeWidth*mazeHeight
        solution = []
        generateMaze(5,3)
        rows[mazeWidth/2][mazeHeight] = false;
        rows[mazeWidth/2][0] = false;
        sol = findSolution(mazeWidth/2, 0, mazeWidth/2, mazeHeight-1, null)
        while(sol){
            solution.push({x: sol.x, y: sol.y})
            sol = sol.next
        }
        importantNodes = []
        simplifyMaze(mazeWidth/2, 0, {nexts:[],x: 0, y: 0})

        p.createCanvas(canvasWidth, canvasHeight)
        p.background(255)
        drawMaze()
    }
    p.setup = () => {
        let button = p.createButton("Generate")
        button.mousePressed(mazeSetup)
        checkbox = p.createCheckbox("Show solution")
        simplifiedCheckbox = p.createCheckbox("Show Simplified Maze")
        gridCheckbox = p.createCheckbox("Show Grid", true)

        canvasWidth = Math.min(400, p.displayWidth)
        canvasHeight = Math.min(400, p.displayHeight)
        cellSize = Math.min(0.95*canvasWidth/mazeWidth, 0.95*canvasHeight/mazeHeight)
        mazeSetup()

    }
    let wasChecked = false
    let wasCheckedSimplified = false
    let wasCheckedGrid = false
    p.draw = () => {
        if(checkbox.checked() !== wasChecked) {
            wasChecked = checkbox.checked()
            drawMaze()
        }

        if(simplifiedCheckbox.checked() !== wasCheckedSimplified) {
            wasCheckedSimplified = simplifiedCheckbox.checked()
            drawMaze()
        }

        if(gridCheckbox.checked() !== wasCheckedGrid) {
            wasCheckedGrid = gridCheckbox.checked()
            drawMaze()
        }
    }

    function drawMaze(){
        p.background(255)
        p.strokeWeight(2)

        if(checkbox.checked()){
            p.push()
            p.strokeWeight(4)
            p.stroke("red")

            let oldPos = {x: solution[0].x, y:mazeHeight}
            solution.push({x: solution[solution.length-1].x, y: -0.5})
            for(let i = 0; i < solution.length-1; i++){
                let s = solution[i]
                let nextPos = solution[i+1]

                let centerX = offset+cellSize/2+s.x*cellSize
                let centerY = offset+cellSize/2+s.y*cellSize
                let oldCenterX = offset+cellSize/2+oldPos.x*cellSize
                let oldCenterY = offset+cellSize/2+oldPos.y*cellSize
                let nextCenterX = offset+cellSize/2+nextPos.x*cellSize
                let nextCenterY = offset+cellSize/2+nextPos.y*cellSize
                let x1 = (oldCenterX+centerX)/2
                let y1 = (oldCenterY+centerY)/2
                let x2 = (nextCenterX+centerX)/2
                let y2 = (nextCenterY+centerY)/2

                p.line(centerX,centerY,x1,y1)
                p.line(centerX,centerY,x2,y2)

                oldPos = s
            }

            p.pop()
        }

        if(simplifiedCheckbox.checked()) {
            p.push()

            p.strokeWeight(2)
            p.stroke("blue")
            for (let i = 0; i < importantNodes.length - 1; i++) {
                let node = importantNodes[i]

                let x1 = offset + cellSize / 2 + node.x1 * cellSize
                let y1 = offset + cellSize / 2 + node.y1 * cellSize
                let x2 = offset + cellSize / 2 + node.x2 * cellSize
                let y2 = offset + cellSize / 2 + node.y2 * cellSize

                p.push()
                p.drawingContext.setLineDash([5, 5]);
                p.line(x1, y1, x2, y2)
                p.pop()
                let radius = node.isLeaf? 2 : 10
                p.circle(x1, y1, radius, radius)
                p.circle(x2, y2, radius, radius)
            }

            p.pop()
        }

       // p.fill("red")
       // p.rect(offset+mazeWidth/2*cellSize, offset+0*cellSize, cellSize, cellSize)
       //// p.rect(offset+mazeWidth/2*cellSize, offset+(mazeHeight-1)*cellSize, cellSize, cellSize)
        if(gridCheckbox.checked()){
            p.stroke("black")

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

    let visitedFindingSolution
    function findSolution(x, y, endX, endY, solution){
        let node = {next: solution, x: x, y: y}
        visitedFindingSolution[x][y] = true;
        if(x === endX && y === endY)
            return node;


        if(y < mazeHeight -1 && !rows[x][y+1] && !visitedFindingSolution[x][y+1]){
            let s = findSolution(x,y+1, endX, endY, node);
            if(s)
                return s;
        }
        if(y > 0 && !rows[x][y] && !visitedFindingSolution[x][y-1]){
            let s = findSolution(x,y-1, endX, endY, node);
            if(s)
                return s;
        }
        if(x < mazeWidth-1 && !columns[x+1][y] && !visitedFindingSolution[x+1][y]){
            let s = findSolution(x+1,y, endX, endY, node);
            if(s)
                return s;
        }
        if(x > 0 && !columns[x][y] && !visitedFindingSolution[x-1][y]){
            let s = findSolution(x-1,y, endX, endY, node);
            if(s)
                return s;
        }

        return false
    }



    function simplifyMaze(x, y, oldNode){
        visitedSimplifying[x][y] = true;
        let roads = 0

        if(y < mazeHeight -1 && !rows[x][y+1] && !visitedSimplifying[x][y+1]){
            roads++
        }
        if(y > 0 && !rows[x][y] && !visitedSimplifying[x][y-1]){
            roads++
        }
        if(x < mazeWidth-1 && !columns[x+1][y] && !visitedSimplifying[x+1][y]){
            roads++
        }
        if(x > 0 && !columns[x][y] && !visitedSimplifying[x-1][y]){
            roads++
        }

        if(roads > 1)
        {
            let newNode = {nexts: [], x: x, y: y}
            oldNode.nexts.push(newNode)

            if(y < mazeHeight -1 && !rows[x][y+1] && !visitedSimplifying[x][y+1]){
                simplifyMaze(x,y+1,newNode)
            }
            if(y > 0 && !rows[x][y] && !visitedSimplifying[x][y-1]){
                simplifyMaze(x,y-1, newNode)
            }
            if(x < mazeWidth-1 && !columns[x+1][y] && !visitedSimplifying[x+1][y]){
                simplifyMaze(x+1,y,newNode)
            }
            if(x > 0 && !columns[x][y] && !visitedSimplifying[x-1][y]){
                simplifyMaze(x-1,y,newNode)
            }

            importantNodes.push({x1:oldNode.x, y1: oldNode.y, x2:newNode.x, y2: newNode.y})
        }
        else {
            if (y < mazeHeight - 1 && !rows[x][y + 1] && !visitedSimplifying[x][y + 1]) {
                simplifyMaze(x, y + 1, oldNode)
            }
            if (y > 0 && !rows[x][y] && !visitedSimplifying[x][y - 1]) {
                simplifyMaze(x, y - 1, oldNode)
            }
            if (x < mazeWidth - 1 && !columns[x + 1][y] && !visitedSimplifying[x + 1][y]) {
                simplifyMaze(x + 1, y, oldNode)
            }
            if (x > 0 && !columns[x][y] && !visitedSimplifying[x - 1][y]) {
                simplifyMaze(x - 1, y, oldNode)
            }

            if(roads === 0)
                importantNodes.push({x1:oldNode.x, y1: oldNode.y, x2:x, y2: y, isLeaf: true})
        }
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