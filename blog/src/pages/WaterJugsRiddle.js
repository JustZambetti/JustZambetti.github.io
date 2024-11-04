import {Sudoku} from "../sudoku";
import {shuffleArray} from "../helpFunctions";
import p5 from 'p5';
import {useEffect, useRef} from "react";

const sketch = (p) => {
    let tapImg;

    p.preload = () => {
        tapImg = p.loadImage('/imgs/tap.png');
    }
    let tapHeight = 200
    let binHeight = 200
    let bottlesCount = 2
    let bottlesY = 200
    let width = 400
    let height = 600
    let bottleWidth = 25
    let literHeight = 20

    let capacities = [3, 5]
    let quantities = [0, 0]
    let selectedBottle = null

    p.setup = () => {
        p.createCanvas(width, height)

    }
    p.draw = () => {
        p.background("white")

        drawBottles()
        p.scale(0.5)
        p.image(tapImg, width + 160, 100);
    }

    const drawBottles = () => {
        for (let i = 0; i < bottlesCount; i++) {


            let x = (i + 1) * width / (bottlesCount + 1) - bottleWidth / 2

            let bottleHeight = capacities[i] * literHeight
            let waterHeight = quantities[i] * literHeight


            p.push()
            p.noStroke()
            p.fill("#a7e1ea")
            if (selectedBottle === i) {
                // p.stroke()
                p.rect(x - 5, height - bottlesY - waterHeight - 5 * quantities[i], bottleWidth + 10, waterHeight + 5 * quantities[i])
            } else p.rect(x, height - bottlesY - waterHeight, bottleWidth, waterHeight)
            p.pop()

            p.push()
            p.noFill()
            if (selectedBottle === i) {
                // p.stroke()
                p.strokeWeight(4);
                p.rect(x - 5, height - bottlesY - bottleHeight - 5 * capacities[i], bottleWidth + 10, bottleHeight + 5 * capacities[i])
            } else
                p.rect(x, height - bottlesY - bottleHeight, bottleWidth, bottleHeight)
            p.pop()
        }
    }

    p.mousePressed = () => {
        let somethingPressed = false

        for (let i = 0; i < bottlesCount; i++) {
            let x = (i + 1) * width / (bottlesCount + 1) - bottleWidth / 2
            if (p.mouseX >= x && p.mouseX <= x + bottleWidth) {
                if (selectedBottle !== null) {
                    let oldQuantity = quantities[i]
                    quantities[i] = Math.min(capacities[i], quantities[i] + quantities[selectedBottle])
                    let difference = quantities[i] - oldQuantity
                    quantities[selectedBottle] -= difference
                    selectedBottle = null
                } else {
                    selectedBottle = i

                }
                somethingPressed = true;
                break;
            }
            //  p.rect(x,height - bottlesY - bottleHeight, bottleWidth,100)
        }
        if (p.mouseY <= tapHeight) {
            if (selectedBottle !== null) {
                quantities[selectedBottle] = capacities[selectedBottle]
                selectedBottle = null
            }
            somethingPressed = true;
        }

        if (p.mouseY >= height - binHeight) {
            if (selectedBottle !== null) {
                quantities[selectedBottle] = 0
                selectedBottle = null
            }
            somethingPressed = true;
        }

        if (!somethingPressed) {
            selectedBottle = null
        }
    }

}

export function WaterJugsRiddle() {
    const p5ContainerRef = useRef();
    useEffect(() => {
        let p5Instance = new p5(sketch, p5ContainerRef.current)

        //setP5Instance(p5Instance)

        return () => p5Instance.remove();
    }, [])

    const cardStyle = {maxWidth: 500, padding: 20, height: "fit-content"}

    return (
        <div>
            <div style={{
                maxWidth: 1200,
                margin: "auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
            }}>
                <div className="App" style={{marginTop: 5}} ref={p5ContainerRef}/>
                <div className="card " style={cardStyle}>
                    <h2 className={"card-title big-list-item"}>Rules</h2>
                    <p className={"card-text"}>
                        You have two bottles: one with a capacity of 3 liters and another with a capacity of 5
                        liters.<br/>
                        You can perform the following actions:<br/>
                        <ul>
                            <li> Fill either bottle to its maximum capacity.</li>
                            <li> Empty either bottle completely.</li>
                            <li> Pour water from one bottle into the other until one of the bottles is either full or
                                empty.
                            </li>
                        </ul>

                        How can you measure out exactly 4 liters of water?
                    </p>
                </div>



                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Solvability</h2> <p> To determine whether it is
                    possible to measure exactly *C* liters of water using two jugs with capacities of *A* and *B*
                    liters, we need to look at a few mathematical properties. The problem comes down to whether we can
                    generate *C* liters using a series of operations involving filling, emptying, and transferring water
                    between the two jugs. Mathematically, the condition for solvability depends on the concept of the
                    greatest common divisor (GCD). </p> <p> The key insight is that we can only measure a volume *C* if
                    *C* is a multiple of the GCD of *A* and *B*, and *C* does not exceed the capacity of the larger jug.
                    In simpler terms, the conditions are: </p>
                    <ul>
                        <li>*C* must be a multiple of GCD(*A*, *B*).</li>
                        <li>*C* must be less than or equal to the maximum of *A* and *B*.</li>
                    </ul>
                    <p> For example, suppose you have a 3-liter jug and a 5-liter jug. The GCD of 3 and 5 is 1.
                        Therefore, you can measure any amount of water that is a multiple of 1, as long as it does not
                        exceed 5 liters (the capacity of the larger jug). This means you can measure 1, 2, 3, 4, and 5
                        liters. </p></div>

                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Exploring the Operations</h2> <p> To solve the
                    problem using these two jugs, you are allowed to perform three main operations: </p>
                    <ol>
                        <li><b>Fill:</b> Fill one of the jugs to its full capacity.</li>
                        <li><b>Empty:</b> Empty the contents of one of the jugs.</li>
                        <li><b>Transfer:</b> Pour water from one jug into the other until either the first jug is empty
                            or the second jug is full.
                        </li>
                    </ol>
                    <p> These operations can be strategically used to measure the desired quantity *C*. The classic
                        example of using a 3-liter jug and a 5-liter jug to measure 4 liters shows how these operations
                        are combined. By carefully planning the sequence of actions, we can achieve the target
                        amount. </p></div>


                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Algorithmic Approach</h2> <p> We can describe a
                    systematic way to measure *C* liters: </p>
                    <ol>
                        <li>Choose which jug to fill first and start with either the larger or the smaller jug.</li>
                        <li>Repeatedly perform the fill, empty, and transfer operations, keeping track of the amount of
                            water in both jugs.
                        </li>
                        <li>Continue until the desired amount *C* is obtained in either of the jugs.</li>
                    </ol>
                    <p> A useful algorithm to use is based on the idea of expressing numbers as linear combinations.
                        According to a concept in number theory, if *d* is the GCD of *A* and *B*, then there are some
                        whole numbers *x* and *y* such that: </p> <p> *A* times *x* plus *B* times *y* equals *d*. </p>
                    <p> By scaling this equation, we can check if it is possible to express *C* as a combination of *A*
                        and *B*. This forms the mathematical basis for solving the problem. </p></div>
                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Practical Examples and Strategies</h2> <p> Let’s
                    explore some practical examples to make this clearer: </p>
                    <ul>
                        <li><b>Example 1:</b> You have a 4-liter jug and a 6-liter jug. Can you measure 2
                            liters? <br/> The GCD of 4 and 6 is 2. Since 2 is a multiple of the GCD and does not exceed
                            6 liters, it is possible to measure 2 liters.
                        </li>
                        <li><b>Example 2:</b> You have an 8-liter jug and a 5-liter jug. Can you measure 3
                            liters? <br/> The GCD of 8 and 5 is 1. Since 3 is a multiple of 1 and is less than 8 liters,
                            you can measure 3 liters.
                        </li>
                    </ul>
                    <p> By understanding these strategies and applying logical reasoning, the problem becomes an
                        interesting exercise in number theory and problem-solving. </p></div>

            </div>


        </div>
    );
}