
import {useEffect, useRef, useState} from "react";
import p5 from 'p5';

function binomialCoefficient (n, k){
    if(k < 0 || k > n){
        return 0
    }
    if(k === 0 || k === n){
        return 1
    }
    if(k === 1 || k === n - 1){
        return n
    }
    let res = n;
    for(let i = 2; i <= k; i++){
        res *= (n - i + 1) / i;
    }
    return Math.round(res);
}
const montecarloSimulation = (steps) => {
    let pointsInCircle = 0
    for (let i = 0; i < steps; i++) {
        let x = Math.random()
        let y = Math.random()
        if (x * x + (1 - y) * (1 - y) <= 1)
            pointsInCircle++
    }

    return pointsInCircle / steps * 4
}

function sketch(p) {
    let pointsDisplayed = 0
    let pointsInCircle = 0
    let timer = 0;
    let pointSize = 10
    let canvasSize = 400
    let pointsInput

    p.setup = () => {
        pointsInput = p.createInput(0, "number");
        p.createCanvas(canvasSize, canvasSize)
        p.background(255)
        p.circle(0, canvasSize, canvasSize*2)
    }

    const drawPoint = () => {
        let x = Math.random()
        let y = Math.random()
        if(x*x+(1-y)*(1-y) > 1)
            p.fill("black")
        else{
            pointsInCircle++
            p.fill("red")
        }

        p.circle(x *canvasSize, y *canvasSize, pointSize)
        pointsDisplayed++
    }




    p.draw = () => {
        let pointsCount = pointsInput.value();
        if(pointsDisplayed < pointsCount)
        {
                drawPoint()
        }

        p.fill("white")
        p.noStroke()
        p.rect(0,0,100,10)
        p.fill("black")
        p.text('Pi = '+ (pointsInCircle / pointsDisplayed * 4).toFixed(5), 0, 10)
    }


}

export function MontecarloPiCalculator() {
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
            <p>We know that the area of a circle is π * r^2. If we put a radius of 1 and consider only one fourth of the circle, the probability of a random point to be inside the circle is π/4</p>
            <p>π ≈ points in circle section / total points * 4 </p>
            <div>Montecarlo(10000000) ≈ 3.141... </div>
            <div>Montecarlo(100000000) ≈ 3.1415... </div>
        </p>
    )
}