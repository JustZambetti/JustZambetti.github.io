import {useEffect, useRef} from "react";
import p5 from 'p5';
import {convexHullGrahamScan, distance} from "../helpFunctions";

function sketch(p) {
    let canvasWidth, canvasHeight
    let gridWidth = 20, gridHeight = 20, cellSize
    let margin = 0

    p.setup = () => {
        canvasWidth = Math.min(400, p.displayWidth)
        canvasHeight = Math.min(400, p.displayHeight)
        cellSize = Math.min(0.95 * canvasWidth / gridWidth, 0.95 * canvasHeight / gridHeight)

        p.createCanvas(canvasWidth, canvasHeight)
    }

    p.draw = () => {
        drawGrid()
    }

    function drawGrid() {
        p.translate(margin, margin)

        const gridHeightInPixels = gridHeight*cellSize;
        const gridWidthInPixels = gridWidth*cellSize;

        for (let i = 0; i <= gridWidth; i++){
            const x = i * cellSize;
            p.line(x, 0, x, gridHeightInPixels);
        }
        for (let i = 0; i <= gridHeight; i++){
            const y = i * cellSize;
            p.line(0, y, gridWidthInPixels, y);
        }

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
            <div className="App" style={{marginTop:5}} ref={p5ContainerRef}/>
        </p>
    )
}