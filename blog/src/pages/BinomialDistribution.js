
import {useEffect, useRef} from "react";
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


function sketch(p) {
    let n = 20
    let probability = 0.5
    let probabilities = []

    let tests = 10000
    let heads = []

    let canvasWidth = 400
    let canvasHeight = 400
    let slider
    let testsSlider

    p.setup = () => {
        slider = p.createSlider(2, 101);
        testsSlider = p.createSlider(1, 10000);
        p.createCanvas(canvasWidth, canvasHeight)
        p.background(255)
    }

    function simulateCoinTosses(n){
        let heads = 0;
        for(let i = 0; i < n; i++)
           if(Math.random() >= 0.5)
               heads++;
        return heads;
    }

    let oldN
    let oldTests
    function needToUpdate(){
        n = parseInt(slider.value())
        tests = Math.ceil((parseInt(testsSlider.value()) **5)/10000**4)

        let result = n === oldN && tests === oldTests

        oldN = n
        oldTests = tests

        return !result;
    }

    p.draw = () => {
       if(!needToUpdate())
           return

        p.background(255)

        heads = [...Array(n)].map(()=> 0)
        for(let i = 0; i < tests; i++)
            heads[simulateCoinTosses(n-1)]++

        drawDensityFunction()
        let highestProbability = Math.max(...probabilities)

        heads.forEach((value, index) =>{
            let x = canvasWidth / n * index
            let width = canvasWidth / n
            let y = canvasHeight
            let height = -(1/highestProbability)*(canvasHeight * value/tests)/1.2
            p.fill("#0000ff70")
            p.rect(x, y, width, height)
        })


        p.fill("black")
        p.text("Max% = " + (Math.round((highestProbability + Number.EPSILON) * 100)) +"%" +
                "\nTests (blue) = " + tests, 0, canvasHeight * 0.2-16)

        p.fill("black")
        p.text("N = " + (n-1), 0, canvasHeight * 0.1)
    }

    function drawDensityFunction(){
        probabilities = [...Array(n).keys()].map(k=> binomialCoefficient(n-1, k)*probability**k*(1-probability)**(n-1-k))

        let highestProbability = Math.max(...probabilities)
        probabilities.forEach((value, index) =>{
            let x = canvasWidth / n * index
            let width = canvasWidth / n
            let y = canvasHeight
            let height = -(1/highestProbability)*(canvasHeight * value)/1.2
            p.fill("red")
            p.rect(x, y, width, height)
            if(n <= 20){
                p.fill("black")
                p.text(index.toString(), (x+width/2), height+y-2)
            }
        })
    }
}

export function BinomialDistribution() {
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
            <p>For this example we are going to toss a coin N times. The random variable X = "Number of heads" </p>

            <p>The red rectangles represent the distribution density function</p>
            <p>The transparent blue rectangles represent X on the (pseudo)random coin toss tests</p>
        </p>
    )
}