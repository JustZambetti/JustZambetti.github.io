import {useEffect, useRef} from "react";
import p5 from 'p5';
import {convexHullGrahamScan, distance} from "./helpFunctions";

function sketch(p) {
    const pointsCount = 5
    const radius = 150
    const points = []
    let convexHull = []
    const pointRadius = 25
    let canvasWidth = 400
    let canvasHeight = 400
    const convexHullColor = "#7639bf"


    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight)
        p.background(255)
        resetPoints()
    }
    p.draw = () => {
        p.background(255)
        drawConvexHull()
        drawPoints()
        drawCenter()
    }

    function drawCenter(){
        const center = {
            x: convexHull.reduce((acc, curr) => acc + curr.x, 0) / convexHull.length,
            y: convexHull.reduce((acc, curr) => acc + curr.y, 0) / convexHull.length,
        }
        p.fill("red")

        convexHull.forEach(point =>{
            p.line(center.x, center.y, point.x, point.y)
        })

        p.circle(center.x, center.y, pointRadius)
    }

    function drawPoints(){
        points.forEach(point => {
            p.fill("black")
            p.circle(point.x, point.y, pointRadius)
        })
    }


    function drawConvexHull() {
        p.push()
        convexHull = convexHullGrahamScan(points)
        p.fill(convexHullColor)
        p.beginShape();
        convexHull.forEach(point => {
            p.vertex(point.x, point.y);
        })
        p.endShape(p.CLOSE);
        p.pop()
    }

    function resetPoints(){
        points.length = 0
        const center = { x:canvasWidth/2, y: canvasHeight/2 }
        let angleOffset = 2 * p.PI / pointsCount
        for(let i = 0; i < pointsCount; i++){
            let angle = angleOffset * i
            const point = {
                x: center.x + p.cos(angle) * radius,
                y: center.y + p.sin(angle) * radius
            }
            points.push(point)
        }
    }
    function movePointToMouse(point) {
        point.x = p.mouseX
        point.y = p.mouseY
    }
    let selectedPoint = null
    function resetSelection() {
        selectedPoint = null
    }
    p.mouseDragged = () => {
        if (isPointOutsideOfCanvas({x: p.mouseX, y: p.mouseY}))
            return

        if (selectedPoint != null) {
            movePointToMouse(selectedPoint)
        }
    }
    p.mouseReleased = () => {
        resetSelection()
    }
    p.mousePressed = () => {
        if (isPointOutsideOfCanvas({x: p.mouseX, y: p.mouseY}))
            return

        let nearestPointToMouse = getNearestPointToMouse()
        if (isPointPressed(nearestPointToMouse)) {
            selectedPoint = nearestPointToMouse
        } else {
            points.push({x: p.mouseX, y: p.mouseY})
        }
    }
    const isPointPressed = (point) => point != null && distanceFromMouse(point) < pointRadius

    const getNearestPointToMouse = () => {
        if (points.length > 0)
            return points.reduce((prev, curr) => distanceFromMouse(prev) < distanceFromMouse(curr) ? prev : curr)
    }
    function distanceFromMouse(point) {
        return distance(point.x, point.y, p.mouseX, p.mouseY)
    }

    const isPointOutsideOfCanvas = (point) =>
        point.x < 0 || point.x > canvasWidth || point.y < 0 || point.y > canvasHeight;

}

export function ConvexHull() {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);
        return () => {
            p5Instance.remove();
        }
    }, [])

    return (
        <p>
            <div className="App" ref={p5ContainerRef}/>
        </p>
    )
}