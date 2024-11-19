import {Sudoku} from "../sudoku";
import {shuffleArray} from "../helpFunctions";
import p5 from 'p5';
import {useEffect, useRef} from "react";

class TimedState {
    constructor(onEnter = () => {
    }, update = (time) => {
    }, onExit = () => {
    }) {
        this.onEnter = onEnter;
        this.update = update;
        this.onExit = onExit;
    }
}

class StateMachine {
    constructor(initialState, states) {
        this.states = states;
        this.currentState = null;
        this.setState(initialState);
        this.time = 0
    }

    setState(newState) {
        if (this.currentState && this.currentState.name === newState)
            return;

        if (this.currentState)
            this.currentState.onExit();


        if (!this.states.includes(newState)) {
            throw new Error(`State "${newState}" does not exist in the state machine`);
        }

        this.currentState = newState;
        this.currentState.onEnter();
        this.time = 0
    }

    update() {
        let keepUpdating = this.currentState.update(this.time);
        this.time++
        if (!keepUpdating) {
            this.currentState = this.currentState.onExit();
            this.time = 0
        }
    }
}

const sketch = (p) => {
    let tapImg;

    p.preload = () => {
        tapImg = p.loadImage('/imgs/tap.png');
    }
    let tapHeight = 100
    let binHeight = 200
    let bottlesCount = 2
    let bottlesY = 400
    let width = 400
    let height = 600
    let bottleWidth = 50
    let literHeight = 40

    let capacities = [3, 5]
    let quantities = [0, 2]
    let tookControl = [false, false]
    let bottleOverrides = Array(2)

    let selectedBottle = null

    let pourWidth = 0

    let actionTime = 10

    let movingWater
    let oldWater
    let startPouringAngle = 0

    let statemachine

    const idleState = new TimedState(() => {
        tookControl =  tookControl.map(_ => false)
    }, (time) => {
        if(selectedBottle !== null){
            tookControl[selectedBottle] = true
            bottleOverrides[selectedBottle] = {y: bottlesY-20}
        }
        else
            tookControl = tookControl.map(_ => false)

        return true
    }, () => {
    })
    const reachingSecondBottleState = new TimedState(
        () => {
            tookControl[selectedBottle] = true
        },
        (time) => {
            let bottleHeight = capacities[selectedBottle] * literHeight
            const duration = 10
            bottleOverrides[selectedBottle] = {
                x: p.map(time, 0, duration, getXFromBottleIndex(selectedBottle), getXFromBottleIndex(secondBottle) + bottleWidth / 2),
                y: p.map(time, 0, duration, bottleOverrides[selectedBottle].y, bottlesY - (capacities[secondBottle] * literHeight) + bottleHeight - 50)
            }

            return time < duration
        }, () => {
            movingWater = Math.min(quantities[selectedBottle], capacities[secondBottle] - quantities[secondBottle])
            oldWater = quantities[secondBottle]
            //console.log(movingWater)

            return rotatingBottleState
        }
    )
    const rotatingBottleState = new TimedState(
        () => {
            tookControl[secondBottle] = true
        }, (time) => {
            const duration = 15.0
            const targetAngle = p.HALF_PI
            let angle = lerpEase(0, targetAngle, time / duration, 'easeOut', true)
            bottleOverrides[selectedBottle].angle = angle
            bottleOverrides[selectedBottle].y = lerpEase(bottleOverrides[selectedBottle].y , bottleOverrides[selectedBottle].y -5, time / duration, 'easeOut', true)

            let visibleWaterLevel = Math.max(0, -(bottleWidth / 2) * p.sin(angle) + (capacities[selectedBottle] - quantities[selectedBottle]) * literHeight * p.cos(angle))

            if (visibleWaterLevel === 0 && startPouringAngle === 0)
                startPouringAngle = angle

            if (visibleWaterLevel === 0)
                quantities[secondBottle] = p.map(angle, startPouringAngle, targetAngle, oldWater, oldWater + movingWater)

            return time <= duration
        }, () => {
            startPouringAngle = 0
            quantities[selectedBottle] -= movingWater
            return rotatingBottleBackState
        })
    const emptyingBottleState = new TimedState(
        () => {
            tookControl[secondBottle] = true
        }, (time) => {
            const duration = 15.0
            const targetAngle = p.HALF_PI
            let angle = lerpEase(0, targetAngle, time / duration, 'easeOut', true)
            bottleOverrides[selectedBottle].angle = angle
            bottleOverrides[selectedBottle].y = lerpEase(bottleOverrides[selectedBottle].y , bottleOverrides[selectedBottle].y -4, time / duration, 'easeOut', true)
            bottleOverrides[selectedBottle].x = getXFromBottleIndex(selectedBottle)
            return time <= duration
        }, () => {
            startPouringAngle = 0
            quantities[selectedBottle] = 0
            return rotatingBottleBackState
        })

    const movingToTapState = new TimedState(
        () => {
            tookControl[secondBottle] = true
        }, (time) => {
            const duration = 10
            bottleOverrides[selectedBottle] = {
                x: lerpEase(getXFromBottleIndex(selectedBottle), width-130, time / duration, 'easeOut', true),
                y: p.map(time, 0, duration, bottleOverrides[selectedBottle].y, 100+ capacities[selectedBottle] * literHeight ),
                angle: 0
            }
            return time <= duration
        }, () => {
            return fillingBottleState
        })

    const fillingBottleState = new TimedState(
        () => {
            tookControl[secondBottle] = true
        }, (time) => {
            const duration = 10
            quantities[selectedBottle] = p.map(time, 0, duration, quantities[selectedBottle], capacities[selectedBottle])
            const width = time <= duration/2? lerpEase(0, 4, time / duration/2, 'easeOut', true)
            : lerpEase(4, 0, time / duration - duration/2, 'easeOut', true)
            const x = bottleOverrides[selectedBottle].x
            const y = bottleOverrides[selectedBottle].y
            p.push()
            {
                p.translate(x, y)
                p.fill(100, 150, 250)
                p.noStroke()
                p.rect(bottleWidth/2-5, -17 - capacities[selectedBottle] * literHeight, width,15 +capacities[selectedBottle] * literHeight);
            }
            p.pop()

            return time <= duration
        }, () => {
            return rotatingBottleBackState
        })

    const rotatingBottleBackState = new TimedState(() => {
    }, (time) => {
        const duration = 25.0

        bottleOverrides[selectedBottle] = {
            x: p.map(time, duration, 0, getXFromBottleIndex(selectedBottle), bottleOverrides[selectedBottle].x),
            y: p.map(time, duration, 0, bottlesY, bottleOverrides[selectedBottle].y),
            angle: lerpEase(bottleOverrides[selectedBottle].angle, 0, time / duration, 'easeInOut', true)
        }
        return time <= duration
    }, () => {
        selectedBottle = null
        secondBottle = null
        return idleState
    })

    p.setup = () => {
        p.createCanvas(width, height)
        statemachine = new StateMachine(idleState,
            [
                idleState,
                reachingSecondBottleState,
                rotatingBottleState,
                rotatingBottleBackState,
                emptyingBottleState,
                fillingBottleState,
                movingToTapState
            ])
    }
    p.draw = () => {
        p.background("white")
        drawBottles()

        statemachine.update()

        p.push()
        {
            p.scale(0.5)
            p.image(tapImg, width + 160, 0);
        }
        p.pop()
    }

    function getXFromBottleIndex(i) {
        return (i + 1) * width / (bottlesCount + 1) - bottleWidth / 2
    }

    const drawBottles = () => {
        for (let i = 0; i < bottlesCount; i++) {

            let x = getXFromBottleIndex(i)

            let bottleHeight = capacities[i] * literHeight
            let waterHeight = quantities[i] * literHeight

            let isSelected = selectedBottle === i
            let y = bottlesY
            let angle = 0

            if (tookControl[i]) {
                if (bottleOverrides[i].x !== undefined)
                    x = bottleOverrides[i].x
                if (bottleOverrides[i].y !== undefined)
                    y = bottleOverrides[i].y
                if (bottleOverrides[i].angle !== undefined)
                    angle = bottleOverrides[i].angle
            }
            let canPour = statemachine.currentState === rotatingBottleState || statemachine.currentState === emptyingBottleState && isSelected
            drawBottle(x, y - bottleHeight, angle, bottleHeight, waterHeight, i, canPour)
        }
    }

    let secondBottle = null

    p.mousePressed = () => {
        if (statemachine === undefined || statemachine.currentState !== idleState)
            return

        let somethingPressed = false

        for (let i = 0; i < bottlesCount; i++) {
            let x = (i + 1) * width / (bottlesCount + 1) - bottleWidth / 2
            if (p.mouseX >= x && p.mouseX <= x + bottleWidth) {
                if (selectedBottle === i)
                    break

                if (selectedBottle !== null) {
                    if (quantities[selectedBottle] === 0 || quantities[i] === capacities[i])
                        break
                    statemachine.setState(reachingSecondBottleState)
                    secondBottle = i
                } else {

                    selectedBottle = i
                }
                somethingPressed = true;
                break;
            }
        }
        if (p.mouseY <= tapHeight && quantities[selectedBottle] < capacities[selectedBottle]) {
            statemachine.setState(movingToTapState)
            somethingPressed = true;
        }

        if (p.mouseY >= height - binHeight&& quantities[selectedBottle] > 0 ) {
            statemachine.setState(emptyingBottleState)
            somethingPressed = true;
        }

        if (!somethingPressed) {
            selectedBottle = null
            tookControl.map(_ => false)
        }
    }

    function drawBottle(x, y, angle, bottleHeight, waterLevel, index, canPour) {
        let visibleWaterLevel = Math.max(0, -(bottleWidth / 2) * p.sin(angle) + (bottleHeight - waterLevel) * p.cos(angle))
        let isPouring = visibleWaterLevel === 0 && angle < p.HALF_PI && canPour

        p.push()

        p.translate(x, y)

        p.beginClip() //CLIP
        p.push()
        {
            p.rotate(-angle);
            bottleShape(0, 0, bottleWidth, bottleHeight, 10)
        }
        p.pop()
        p.endClip()

        p.push()
        {
            p.fill(100, 150, 250)
            p.noStroke()
            if (waterLevel > 0) {
                p.rect(0, visibleWaterLevel, 1000, 1000);
            }
            p.fill("#28553C10")
            p.rect(0, -bottleWidth, 1000, 1000);
        }
        p.pop()


        p.push()
        {
            p.noFill()
            p.rotate(-angle);
            // p.rect(0, 0, bottleWidth, bottleHeight, 10);
            bottleShape(0, 0, bottleWidth, bottleHeight, 10)

            p.push()
            {
                for (let i = 1; i < capacities[index]; i++) {
                    p.strokeWeight(2)
                    p.stroke("black")
                    p.line(0, i * literHeight, bottleWidth / 3, i * literHeight)
                }
            }
            p.pop()
        }
        p.pop()


        p.pop()

        if (isPouring) {
            if (pourWidth < 5)
                pourWidth++
        } else if (pourWidth > 0)
            pourWidth--

        if (pourWidth > 0) {
            p.push()
            p.translate(x, y)
            p.fill(100, 150, 250)
            p.noStroke()
            p.rect(-pourWidth / 2, 0, pourWidth, statemachine.currentState === emptyingBottleState?10000 : bottlesY - y);
            p.pop()
        }
    }

    function bottleShape(x, y, width, height, radius) {
        let w = width;
        let h = height;
        let r = radius;
        p.stroke(0);
        p.strokeWeight(4);

        p.beginShape();
        //p.vertex(x, y);
        p.vertex(x + w, y);
        p.vertex(x + w, y + h - r);

        p.bezierVertex(
            x + w, y + h,
            x + w - r, y + h,
            x + w - r, y + h
        );
        p.vertex(x + r, y + h);
        p.bezierVertex(
            x, y + h,
            x, y + h - r,
            x, y + h - r
        );
        p.vertex(x, y);
        p.endShape();
    }

    function lerpEase(start, end, t, easingType = 'linear', clamp = false) {
        const easingFunctions = {
            linear: t => t,
            easeIn: t => t * t,
            easeOut: t => t * (2 - t),
            easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        };

        if (clamp) {
            t = Math.max(0, Math.min(1, t));
        }

        const ease = easingFunctions[easingType] || easingFunctions.linear;
        const easedT = ease(t);

        return p.lerp(start, end, easedT);
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


                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Solvability</h2> <p> To
                    determine whether it is
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

                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Exploring the Operations</h2>
                    <p> To solve the
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


                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Algorithmic Approach</h2> <p> We
                    can describe a
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
                <div className="card" style={cardStyle}><h2 className={"big-list-item"}>Practical Examples and
                    Strategies</h2> <p> Let’s
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