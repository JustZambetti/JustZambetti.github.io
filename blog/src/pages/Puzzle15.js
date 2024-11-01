import {Sudoku} from "../sudoku";
import {shuffleArray} from "../helpFunctions";
import p5 from 'p5';
import {useEffect, useRef} from "react";

const sketch = (p) => {


    p.setup = () => {

    }
    p.draw = () =>{

    }
}
export function Puzzle15() {
    const p5ContainerRef = useRef();
    useEffect(() => {
        let p5Instance = new p5(sketch, p5ContainerRef.current)
        //setP5Instance(p5Instance)

        return () => p5Instance.remove();
    }, [])

    return (
        <div>
            <div className="App" style={{marginTop: 5}} ref={p5ContainerRef}/>
            <h2>THE GAME</h2>
            <p>
                You have two bottles: one with a capacity of 3 liters and another with a capacity of 5 liters. Your task
                is to measure out exactly 4 liters of water.<br/>
                You can perform the following actions:<br/>
                <ul>
                    <li> Fill either bottle to its maximum capacity.</li>
                    <li> Empty either bottle completely.</li>
                    <li> Pour water from one bottle into the other until one of the bottles is either full or empty.
                    </li>
                </ul>

                Using these actions, how can you measure out exactly 4 liters of water?
            </p>

            <h2> CAN WE GENERALIZE IT?</h2>
            <p>
                Now one bottle has a capacity of A liters and the other has a capacity of B liters.
                Try to measure exactly C liters of water.
            </p>

            <h2> IN WHICH CASES IS IT POSSIBLE?</h2>


        </div>
);
}