import {Sudoku} from "../sudoku";
import {shuffleArray} from "../helpFunctions";
import p5 from 'p5';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class Confetti {
    constructor(x, y, p) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.size = this.p.random(5, 10);
        this.color = this.p.color(this.p.random(255), this.p.random(255), this.p.random(255), 150);
        this.speed = this.p.random(3, 6);
    }

    update(respawn) {
        this.y += this.speed;
        if (respawn && this.y > 250) {
            this.y = this.p.random(-50, -10);
            this.x = this.p.random(250);
        }
    }

    show() {
        this.p.noStroke();
        this.p.fill(this.color);
        this.p.ellipse(this.x, this.y, this.size);
    }
}

function sketch(p) {
    let canvasSize = 350
    let cellMargin = 8
    let font;
    let won = false;
    let confettiTime = 0
    let overX = null
    let overY = null
    let width = 3
    let array = [[2, 1, 4], [3, 8, 6], [7, 5, null]]

    let emptyX = 2
    let emptyY = 2
    p.preload = () => {
        font = p.loadFont('/fonts/Roboto.ttf');
    }
    let confetti = [];
    p.setup = () => {
        p.createCanvas(canvasSize + cellMargin, canvasSize + cellMargin)
        //p.background(255)


        for (let i = 0; i < 100; i++) {
           // confetti.push(new Confetti(p.random(250), p.random(-50, -10), p));
        }
    }

    const drawBackground = () => {
        p.fill("#aec4e8")
        p.noStroke()
        p.rect(0, 0, canvasSize + cellMargin, canvasSize + cellMargin, 6)
    }
    const drawCell = (x, y, num) => {
        p.fill("#eeeffb")
        p.noStroke()
        let size = canvasSize / width
        if (overX === x && overY === y)
            p.fill('#ffe466');

        p.rect(x * size + cellMargin, y * size + cellMargin, size - cellMargin, size - cellMargin, 6)

        p.fill('#636363');
        p.textFont(font);
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(num.toString(), x * size + size / 2 + cellMargin / 2, y * size + size / 2);
    }
    p.draw = () => {
        drawBackground();
        let size = canvasSize / width
        for (let x = 0; x < width; x++)
            for (let y = 0; y < width; y++)
                if (p.mouseX >= x * size + cellMargin && p.mouseX <= x * size + cellMargin + size - cellMargin
                    && p.mouseY >= y * size + cellMargin && p.mouseY <= y * size + cellMargin + size - cellMargin) {
                    overX = x
                    overY = y
                }

        for (let x = 0; x < width; x++)
            for (let y = 0; y < width; y++) {
                if (array[x][y] !== null)
                    drawCell(x, y, array[x][y])
            }

        if (won) {
            for (let particle of confetti) {
                particle.update(confettiTime > 0);
                particle.show();
            }
            confettiTime--
        }


        p.mousePressed = () => {
            if (overX != null && overY != null && Math.abs(emptyX - overX) + Math.abs(emptyY - overY) === 1) {
                array[emptyX][emptyY] = array[overX][overY]
                array[overX][overY] = null
                emptyX = overX
                emptyY = overY
            }
            let hasWon = true
            for (let x = 0; x < width; x++)
                for (let y = 0; y < width; y++)
                    if (array[x][y] !== x + width * y + 1 && (y !== width - 1 || x !== width - 1)) {
                        hasWon = false
                    }

            if (hasWon) {
                won = true
                confettiTime = 60
            }
        }

        p.setGame = (n) => {
            width = n
            array = []
            emptyX = emptyY = n-1
            if (n === 3){
                array = [[2, 1, 4], [3, 8, 6], [7, 5, null]]
            }
            else if (n === 4) {
                array = [
                    [1, 8, 14, 1],
                    [5, 2, 3, 15],
                    [13, 12, 9, 7],
                    [10, 6, 4, null]]
            } else {
                array = [
                    [6, 1, 3, 10, 4],
                    [17, 12, 15, 9, 5],
                    [16, 2, 20, 24, 18],
                    [23, 8, 21, 7, 19],
                    [11, 22, 13, 14, null]]
            }

            p.setup()
        }
    }
}


export function Puzzle15() {
    const [p5Instance, setP5Instance] = useState()
    const p5ContainerRef = useRef();
    useEffect(() => {
        let p5Instance = new p5(sketch, p5ContainerRef.current)
        setP5Instance(p5Instance)
        return () => {
            p5Instance.remove();
        }
    }, [])

    return (
        <div style={{
            margin: "auto", maxWidth: 1200,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly"
        }}>
            <div style={{display: "flex", flexFlow: "column", alignItems: "center", flexWrap: "wrap"}}>
                <h1 className="title" style={{textAlign: "center", margin: "auto"}}>15 Puzzle</h1>
                <div className="App" ref={p5ContainerRef}/>
                <div style={{display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                    <Button variant="outline-success"
                            onClick={() => p5Instance.setGame(3)}>
                        3x3
                    </Button>
                    <Button variant="outline-warning"
                            onClick={() => p5Instance.setGame(4)}>
                        4x4
                    </Button>
                    <Button variant="outline-danger"
                            onClick={() => p5Instance.setGame(5)}>
                        5x5
                    </Button>
                </div>

            </div>


            <div className="card"><h2 className={"big-list-item"}>The 15 Puzzle: A Classic Game of Logic</h2> <p> The 15
                Puzzle, also known as the "Sliding Puzzle" or "15 Game," is a classic puzzle that has captivated puzzle
                enthusiasts for over a century. It consists of a 4x4 grid containing 15 numbered square tiles and one
                empty space. The objective is to slide the tiles horizontally or vertically to rearrange them into
                numerical order, from 1 to 15, with the empty space positioned at the bottom right corner. </p></div>
            <div className="card"><h2 className={"big-list-item"}>History and Origin</h2> <p> The 15 Puzzle was invented
                in the 1870s and gained immense popularity during the late 19th century. It is often attributed to Noyes
                Palmer Chapman, a postmaster from New York, who created the puzzle in 1874. However, it was Sam Loyd, an
                American puzzle creator and mathematician, who helped popularize it. Loyd offered a prize of $1,000 to
                anyone who could solve a specific version of the puzzle, but it turns out that this version was
                unsolvable, adding to the puzzle’s intrigue and fame. </p></div>
            <div className="card"><h2 className={"big-list-item"}>The Puzzle's Structure</h2> <p> The puzzle is composed
                of a 4x4 grid, with 15 numbered tiles and one blank space. The initial configuration of the tiles can
                vary, and the challenge lies in sliding the tiles around the grid to reach the solved state. Tiles can
                only be moved into the adjacent empty space, and players must plan their moves carefully to avoid
                getting stuck. </p> <p> A solved 15 Puzzle looks like this: </p>
                <pre> 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 </pre>
            </div>
            <div className="card"><h2 className={"big-list-item"}>Understanding Solvability</h2> <p> Not all
                configurations of the 15 Puzzle can be solved. To determine whether a given configuration is solvable,
                mathematicians use the concept of *inversions*. An inversion occurs when a tile with a higher number
                precedes a tile with a lower number in the sequence when read row-wise. If the number of inversions is
                even, the puzzle is solvable; if it is odd, it is not. </p> <p> The rule can be summarized as
                follows: </p>
                <ul>
                    <li>If the blank space is on an even row from the bottom (2nd or 4th row) and the number of
                        inversions is odd, the puzzle is unsolvable.
                    </li>
                    <li>If the blank space is on an odd row from the bottom (1st or 3rd row) and the number of
                        inversions is even, the puzzle is solvable.
                    </li>
                </ul>
                <p> This mathematical insight helps explain why some configurations seem impossible to solve no matter
                    how many moves you make. </p></div>
            <div className="card"><h2 className={"big-list-item"}>Strategies for Solving the Puzzle</h2> <p> Solving the
                15 Puzzle requires logical thinking and a strategic approach. Here are some common strategies used by
                puzzle solvers: </p>
                <ol>
                    <li><b>Focus on Solving One Row or Column at a Time:</b> A common approach is to solve the top row
                        first, followed by the second row, and so on. This reduces the complexity of the puzzle as you
                        progress.
                    </li>
                    <li><b>Use the "3x2 Block" Technique:</b> Once the top two rows are solved, treat the remaining six
                        tiles as a smaller puzzle within the larger one. Rearranging this 3x2 block requires practice
                        and patience.
                    </li>
                    <li><b>Think Several Moves Ahead:</b> Planning your moves is essential to avoid backtracking and
                        making the puzzle more difficult. Visualizing the effect of your moves can save time and effort.
                    </li>
                </ol>
                <p> These strategies can help make the puzzle more manageable, but even with a systematic approach, it
                    remains a mentally stimulating challenge. </p></div>
            <div className="card"><h2 className={"big-list-item"}>The Mathematical Legacy of the 15 Puzzle</h2> <p> The
                15 Puzzle is not just a fun pastime but also a topic of interest in mathematics and computer science. It
                has inspired research in areas like permutation theory, algorithms, and computational complexity. The
                puzzle is an example of a "sliding block puzzle," and more complex variations, such as the 8 Puzzle (on
                a 3x3 grid) and larger grids, have been studied extensively. </p> <p> The puzzle’s influence can be seen
                in fields like artificial intelligence, where algorithms for solving sliding puzzles are used to develop
                search strategies and problem-solving techniques. </p></div>
            <div className="card"><h2 className={"big-list-item"}>Why We Still Love the 15 Puzzle</h2> <p> Despite being
                over a century old, the 15 Puzzle remains a beloved classic because it embodies the perfect blend of
                simplicity and complexity. It’s easy to learn but difficult to master, and it challenges our ability to
                think ahead, strategize, and appreciate the beauty of mathematics. Whether you’re a seasoned puzzle
                solver or a newcomer, the 15 Puzzle is sure to keep your brain engaged and entertained. </p></div>
        </div>
    )
}