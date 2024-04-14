export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

export function smoothStep(t) {
    return sigmoid(t * 12 - 6)
}

export function distance(x, y, x2, y2) {
    return Math.sqrt((x - x2) ** 2 + (y - y2) ** 2)
}

export function orientation(q, p, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return (val > 0) ? 1 : -1;
}
export function backtrackingGrahamScan(stack, points, newPoint) {
    while (orientation(stack[stack.length - 2], stack[stack.length - 1], newPoint) > 0)
        stack.pop()
}

export function sortPointsByAngle(points) {
    points.sort((a, b) => {
        return (b.angle - a.angle);
    });
}

export function convexHullGrahamScan(unorderedPoints) {
    if(unorderedPoints.length < 3)
        return null

    const lowestPoint = getLowestPoint(unorderedPoints)
    setAngleToPoints(unorderedPoints, lowestPoint)
    const points = [...unorderedPoints]
    sortPointsByAngle(points)

    const stack = [points[0], points[1]]

    for (let i = 2; i < points.length; i++) {
        backtrackingGrahamScan(stack, points, points[i])
        stack.push(points[i])
    }
    return stack;
}

export function setAngleToPoints(points, pivot){
    points.forEach(point => {
        point.angle = Math.atan2(point.y - pivot.y, point.x - pivot.x)
    })
}

export function getLowestPoint(points) {
    if (points.length > 0)
        return points.reduce((prev, curr) => prev.y > curr.y ? prev : curr)
}
