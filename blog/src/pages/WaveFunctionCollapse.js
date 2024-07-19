import {useEffect, useRef} from "react";
import p5 from 'p5';
import {convexHullGrahamScan, distance, findMinWithComparator, findRandomMinWithComparator} from "../helpFunctions";
import {getNthElement} from "../quickSelect";

function sketch(p) {
    let canvasWidth, canvasHeight
    let gridWidth = 50, gridHeight = 10, cellWidth, cellHeight
    let margin = 0

    let skyImage, wallImage, wallTopImage, doorImage, towerImage, towerWindowsImage, towerWallTopImage;
    p.preload = () => {
        skyImage = p.loadImage("/imgs/wave_function_collapse/sky.png")
        wallImage = p.loadImage("/imgs/wave_function_collapse/wall.png")
        wallTopImage = p.loadImage("/imgs/wave_function_collapse/wall_top.png")
        doorImage = p.loadImage("/imgs/wave_function_collapse/door.png")
        towerImage = p.loadImage("/imgs/wave_function_collapse/tower.png")
        towerWindowsImage = p.loadImage("/imgs/wave_function_collapse/tower_windows.png")
        towerWallTopImage = p.loadImage("/imgs/wave_function_collapse/tower_wall_top.png")
    }

    p.setup = () => {
        canvasWidth = Math.min(800, p.displayWidth)
        canvasHeight = Math.min(800, p.displayHeight)
        cellWidth = 0.95 * canvasWidth / gridWidth
        cellHeight = 332 / 256 * cellWidth


        p.createCanvas(canvasWidth, canvasHeight)

        init()
        collapse()

        for (let x = 0; x < gridWidth; x++)
            for (let y = 0; y < gridHeight; y++) {
                if (grid[x][y])
                    p.image(grid[x][y].src, x * cellWidth, y * cellHeight, cellWidth, cellHeight)
            }
    }


    let grid = []
    let cells =
        {
            tower: {},
            wall: {},
            wall_top: {},
            door: {},
            tower_windows: {},
            //flag: {src: "flag.png"},
            //tower_top: {src: "tower_top.png"},
            tower_wall_top: {},
            sky: {},
        }

    const init = () => {
        //WALL
        cells.wall.src = wallImage
        cells.wall.top = [cells.wall_top, cells.wall]
        cells.wall.right = cells.wall.left = [cells.wall, cells.wall_top, cells.tower]
        cells.wall.bottom = [cells.wall]

        //WALL TOP
        cells.wall_top.src = wallTopImage
        cells.wall_top.bottom = [cells.wall]
        cells.wall_top.top = [cells.sky]
        cells.wall_top.right = cells.wall_top.left = [cells.wall, cells.wall_top]

        //DOOR
        cells.door.src = doorImage
        cells.door.top = [cells.wall]
        cells.door.right = cells.door.left = [cells.tower, cells.tower_windows]
        cells.door.bottom = []

        //TOWER
        cells.tower.src = towerImage
        cells.tower.top = [cells.tower, cells.tower_windows]
        cells.tower.right = cells.tower.left = [cells.wall, cells.wall_top, cells.sky, cells.top]
        cells.tower.bottom = [cells.tower, cells.tower_windows]

        //TOWER WINDOWS
        cells.tower_windows.src = towerWindowsImage
        cells.tower_windows.top = [cells.tower, cells.tower_wall_top]
        cells.tower_windows.right = cells.tower_windows.left = [cells.wall, cells.wall_top, cells.sky, cells.top]
        cells.tower_windows.bottom = [cells.tower]

        //TOWER WALL TOP
        cells.tower_wall_top.src = towerWallTopImage
        cells.tower_wall_top.top = [cells.sky]
        cells.tower_wall_top.right = cells.tower_wall_top.left = [cells.sky]
        cells.tower_wall_top.bottom = [cells.tower]

        //SKY
        cells.sky.src = skyImage
        cells.sky.top = [cells.sky]
        cells.sky.left = cells.sky.right = [cells.sky]
        cells.sky.bottom = [cells.sky]

        Object.values(cells).forEach(cell => {
            cell.top = new Set(cell.top)
            cell.bottom = new Set(cell.bottom)
            cell.left = new Set(cell.left)
            cell.right = new Set(cell.right)
        })

        Object.values(cells).forEach(cell1 =>
            Object.values(cells).forEach(cell2 => {
                if (cell1 === cell2)
                    return
                if (cell1.top.has(cell2)) cell2.bottom.add(cell1)
                if (cell1.bottom.has(cell2)) cell2.top.add(cell1)
                if (cell1.left.has(cell2)) cell2.right.add(cell1)
                if (cell1.right.has(cell2)) cell2.left.add(cell1)
            }))

        for (let x = 0; x < gridWidth; x++) {
            grid.push([])
            for (let y = 0; y < gridWidth; y++)
                grid[x].push(null)
        }
    }


    let cellsInfo
    const collapse = () => {
        cellsInfo = [...Array(gridWidth * gridHeight).keys()].map((i) => ({
            x: i % gridWidth,
            y: Math.floor(i / gridWidth),
            possibilities: new Set([...Object.values(cells)])
        }))

        collapseRecursive()

        console.log(grid)
    }

    const collapseRecursive = () => {
        if (cellsInfo.length === 0)
            return true

        let chosenCell = findRandomMinWithComparator(cellsInfo, (a, b) => a.possibilities.size - b.possibilities.size)
        cellsInfo = cellsInfo.filter(cell => cell.x !== chosenCell.x || cell.y !== chosenCell.y) //Remove cell
        while (chosenCell.possibilities.size > 0) {
            let chosenPossibility = Array.from(chosenCell.possibilities)[Math.floor(Math.random() * chosenCell.possibilities.size)]

            //MAKE MOVE
            grid[chosenCell.x][chosenCell.y] = chosenPossibility

            //console.log("TRY AT", chosenCell)
            let bottomCell = cellsInfo.find(cell => cell.x === chosenCell.x && cell.y === chosenCell.y + 1)
            let topCell = cellsInfo.find(cell => cell.x === chosenCell.x && cell.y === chosenCell.y - 1)
            let leftCell = cellsInfo.find(cell => cell.x === chosenCell.x + 1 && cell.y === chosenCell.y)
            let rightCell = cellsInfo.find(cell => cell.x === chosenCell.x - 1 && cell.y === chosenCell.y)

            //Backup
            let bottomCellPossibilities = new Set(bottomCell?.possibilities)
            let topCellPossibilities = new Set(topCell?.possibilities)
            let leftCellPossibilities = new Set(leftCell?.possibilities)
            let rightCellPossibilities = new Set(rightCell?.possibilities)

            if (bottomCell) bottomCell.possibilities = bottomCell.possibilities.intersection(chosenPossibility.bottom)
            if (topCell) topCell.possibilities = topCell.possibilities.intersection(chosenPossibility.top)
            if (leftCell) leftCell.possibilities = leftCell.possibilities.intersection(chosenPossibility.left)
            if (rightCell) rightCell.possibilities = rightCell.possibilities.intersection(chosenPossibility.right)

            if (collapseRecursive())
                return true

            //UNMAKE MOVE:
            grid[chosenCell.x][chosenCell.y] = null
            chosenCell.possibilities.delete(chosenPossibility)

            if (bottomCell) bottomCell.possibilities = bottomCellPossibilities
            if (topCell) topCell.possibilities = topCellPossibilities
            if (leftCell) leftCell.possibilities = leftCellPossibilities
            if (rightCell) rightCell.possibilities = rightCellPossibilities

        }
        cellsInfo.push(chosenCell)
        return false
    }
}


export function WaveFunctionCollapse() {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);
        return () => {
            p5Instance.remove();
        }
    }, [])

    return (
        <p>
            <div className="App" style={{marginTop: 5}} ref={p5ContainerRef}/>
        </p>
    )
}