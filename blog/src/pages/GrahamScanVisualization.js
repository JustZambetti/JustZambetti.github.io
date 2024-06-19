import {useEffect, useRef} from 'react';
import p5 from 'p5';
import {
    smoothStep,
    lerp,
    distance,
    orientation,
    backtrackingGrahamScan,
    getLowestPoint,
    setAngleToPoints, sortPointsByAngle
} from "../helpFunctions";
//TODO: FIX THIS FILE. Currently it does not work :(
function sketch(p) {
    let canvasWidth = 400
    let canvasHeight = 400
    let slider, slider2
    let start = false

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.background(0);
        let button = p.createButton('click me');
        let button1 = p.createButton('+');
        let button2 = p.createButton('-');
        slider = p.createSlider(0.0, 1.0, 0, 0.01);
        slider2 = p.createSlider(0.0, 1.0, 0, 0.005);
        slider.size(150);
        slider2.size(150);
        button.mousePressed(() => {
            start = true
        });
        button1.mousePressed(() => {
            if (steps >= maxSteps) steps = maxSteps
            else steps++
            onPointsPositionChange()
        });
        button2.mousePressed(() => {
            if (steps >= 0) steps--
            onPointsPositionChange()
        });

        lowestPoint = {x: 50, y: 50}
        points.push(lowestPoint)
    }

    function addPoint() {
        const point = {}
        points.push(point)
        movePointToMouse(point)
    }

    function movePointToMouse(point) {
        point.x = p.mouseX
        point.y = p.mouseY
        onPointsPositionChange()
    }

    let maxSteps

    function onPointsPositionChange() {
        lowestPoint = getLowestPoint(points)
        setPointsData()
        sortPointsByAngle()
        maxSteps = getGrahamSteps(points)
        convexHull = convexHullGrahamScan(points)
    }

    let phase1Duration = 2.0
    let phase2Duration = 2.0
    let phase3Duration = 2.0
    let time = 0.0

    let lowestPoint

    let heightLinePercent = 0.0
    let horizontalLineY
    const horizontalLineDefaultHeight = 350
    let selectedPoint = null
    let pointRadius = 10
    let steps = 0
    let points = []
    let convexHull = []
    let lineToPointPercent = 0.0

    p.draw = () => {
        let radiusColor = "#c8ffc2"
        let radiusPercent = 0.0
        if (time <= phase1Duration) {
            heightLinePercent = time / phase1Duration
        } else if (time <= phase1Duration + phase2Duration) {
            const phase2Time = time - phase1Duration
            lineToPointPercent = smoothStep(phase2Time / phase2Duration)
        } else if (time <= phase1Duration + phase2Duration + phase3Duration) {
            const phase3Time = time - phase1Duration - phase2Duration
            radiusPercent = smoothStep(phase3Time / phase3Duration);
            heightLinePercent = 1 - smoothStep(phase3Time / phase3Duration)
        } else {
            heightLinePercent=0
            radiusPercent = 1
            radiusColor = "#ffffff00"
            horizontalLineY = 1000

            if (steps < maxSteps && time >= phase1Duration + phase2Duration + phase3Duration + 0.4) {
                time = phase1Duration + phase2Duration + phase3Duration
                steps++
                convexHull = convexHullGrahamScan(points)
            }
        }
        if (start)
            time += p.deltaTime / 1000.0

        p.background(255);
        const rotatingLineAngle = radiusPercent * p.PI

        setPointsBasedOnAngleData(rotatingLineAngle)
        drawRadius(rotatingLineAngle, radiusColor)
        drawHorizontalLine(horizontalLineY)
        drawHeightLines()
        drawPoints()
        drawConvexHull()
    }

    function drawConvexHull() {
        if (points.length < 2)
            return
        p.beginShape();
        p.fill(0, 0, 0, 0)
        for (let i = 0; i < convexHull.length; i++)
            p.vertex(convexHull[i].x, convexHull[i].y)
        if (steps === maxSteps)
            p.vertex(convexHull[0].x, convexHull[0].y)
        p.endShape();
    }

    function drawHorizontalLine(horizontalLineY) {
        p.line(0, horizontalLineY, canvasWidth, horizontalLineY)
    }

    function drawRadius(rotatingLineAngle, radiusColor) {
        p.push()
        p.fill(radiusColor)
        p.arc(lowestPoint.x, lowestPoint.y, 1000, 1000, -rotatingLineAngle, 0, p.PIE);
        p.pop()
    }

    function drawHeightLines() {
        let maxPointHeight = Math.min(...points.map(point => point.y))
        let minPointHeight = lowestPoint.y
        horizontalLineY = lerp(horizontalLineDefaultHeight, minPointHeight, lineToPointPercent)
        let maxHeightLineHeight = horizontalLineY - maxPointHeight
        let heightLineHeight = maxHeightLineHeight * smoothStep(heightLinePercent)

        p.push()
        setLineDash([5, 5])
        points.forEach(point => {
            p.line(point.x, point.y, point.x, Math.min(point.y + heightLineHeight, horizontalLineY))
        })
        p.pop()
    }

    function setPointsBasedOnAngleData(angle) {
        points.forEach((point, index) => {
            if (angle != null && point.angle > -angle) {
                point.color = "green"
                point.text = index.toString()
            }
        })
    }

    function setPointsData() {
        points.forEach(point => {
            point.color = "black"
        })
        lowestPoint.color = "red"
        setAngleToPoints(points, lowestPoint)
    }

    function drawPoints() {
        points.forEach((point, index) => {
            if (point.text != null) {
                p.pop()
                if (point.color != null) p.fill(point.color)
                p.text(point.text, point.x, point.y - 15);
                p.push()
            }

            if (point.color != null) {
                p.fill(point.color)
            } else p.fill("black")
            p.circle(point.x, point.y, pointRadius * 2)
        })
    }

    function setLineDash(list) {
        p.drawingContext.setLineDash(list);
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
            onPressPoint(nearestPointToMouse)
        } else {
            onNotPressAnyPoint()
            addPoint()
        }
    }

    const isPointPressed = (point) => point != null && distanceFromMouse(point) < pointRadius
    const getNearestPointToMouse = () => {
        if (points.length > 0)
            return points.reduce((prev, curr) => distanceFromMouse(prev) < distanceFromMouse(curr) ? prev : curr)
    }
    const onPressPoint = (point) => {
        selectedPoint = point
    }
    const onNotPressAnyPoint = () => {
        resetSelection()
    }
    const resetSelection = () => {
        selectedPoint = null
    }

    const isPointOutsideOfCanvas = (point) =>
        point.x < 0 || point.x > canvasWidth || point.y < 0 || point.y > canvasHeight;

    function distanceFromMouse(point) {
        return distance(point.x, point.y, p.mouseX, p.mouseY)
    }
    function convexHullGrahamScan(points) {
        const stack = [points[0], points[1]]
        if (steps === 0)
            return []
        if (steps === 1)
            return stack

        let stepsCounter = 1

        for (let i = 2; i < points.length; i++) {
            backtrackingGrahamScan(stack, points, points[i])
            stack.push(points[i])

            if (++stepsCounter === steps)
                return stack
        }
        return stack;
    }
    function getGrahamSteps(points) {
        if (points.length < 2)
            return 0

        const stack = [points[0], points[1]]

        let stepsCounter = 1
        for (let i = 2; i < points.length; i++) {
            backtrackingGrahamScan(stack, points, points[i])
            stack.push(points[i])
            stepsCounter++
        }
        return stepsCounter + 1
    }
}

export function GrahamScanVisualization() {
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