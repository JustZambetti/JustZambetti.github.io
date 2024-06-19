import {useEffect, useRef} from "react";
import p5 from 'p5';

function sketch(p) {
    let elementsCount = 1
    let elements = []
    let canvasWidth = 400
    let canvasHeight = 400
    let heightMultiplier = 4;

    let slider

    p.setup = () => {
        slider = p.createSlider(100, 100_000, 100, 1);
        p.createCanvas(canvasWidth, canvasHeight)
        p.background(255)

    }
    let oldElementsCount = 1
    p.draw = () => {

        let elementsCount = parseInt(slider.value()/1000 * slider.value()/1000);
        if(oldElementsCount !== elementsCount) {
            elements = Array(20).fill(0)
            for(let i = 0; i < elementsCount; i++)
                elements[parseInt(Math.random() * elements.length)]++;
        }

        oldElementsCount = elementsCount
        let standardDeviation = getStandardDeviation(elements)
        let avg = elementsCount / elements.length
      //  standardDeviation = Math.sqrt(standardDeviation)
        p.background(255)

        p.fill("red")

        elements.forEach((value, index) =>{
            let x = canvasWidth / elements.length * index
            let width = canvasWidth / elements.length
            let y = canvasHeight
            let height = -heightMultiplier * (canvasHeight * value / elementsCount)
            p.rect(x, y, width, height)

        })
        p.fill("black")
        p.text(elementsCount + " random tests between 0 to " + elements.length +"\nCoefficient of variation: " + parseInt(standardDeviation / avg * 100) + "%", 100, 100)
    }
}

function getStandardDeviation (array) {
    const n = array.length
    if(n === 0) return 0
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export function Random() {
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