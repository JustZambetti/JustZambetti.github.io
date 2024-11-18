import {Sudoku} from "../sudoku";
import {shuffleArray} from "../helpFunctions";
import p5 from 'p5';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Space} from "./Portfolio";

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

function getSketch(impossible) {
    return function sketch(p) {
        let canvasSize = 350
        let cellMargin = 8
        let font;
        let fontSize = 64
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
            if (impossible) {
                width = 4
                emptyX = emptyY = 3
                array = [
                    [1, 5, 9, 13],
                    [2, 6, 10, 15],
                    [3, 7, 11, 14],
                    [4, 8, 12, null]]
                fontSize = 48
            }
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
            p.textSize(fontSize);
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
                emptyX = emptyY = n - 1
                if (n === 3) {
                    array = [[2, 1, 4], [3, 8, 6], [7, 5, null]]
                    fontSize = 64
                } else if (n === 4) {
                    array = [
                        [1, 8, 14, 1],
                        [5, 2, 3, 15],
                        [13, 12, 9, 7],
                        [10, 6, 4, null]]
                    fontSize = 48
                } else {
                    array = [
                        [6, 1, 3, 10, 4],
                        [17, 12, 15, 9, 5],
                        [16, 2, 20, 24, 18],
                        [23, 8, 21, 7, 19],
                        [11, 22, 13, 14, null]]
                    fontSize = 40
                }

                p.setup()
            }

        }
    }
}


    export function Puzzle15() {
        const [p5Instance, setP5Instance] = useState()
        const p5ContainerRef = useRef();
        const p5UnsolvableContainerRef = useRef();


        useEffect(() => {
            let p5Instance = new p5(getSketch(false), p5ContainerRef.current)
            setP5Instance(p5Instance)

            let p5UnsolvableInstance = new p5(getSketch(true), p5UnsolvableContainerRef.current)
            return () => {
                p5Instance.remove();
                p5UnsolvableInstance.remove();
            }
        }, [])

        return (
            <div style={{
                margin: "auto", maxWidth: 1200,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
            }}>
                <div style={{
                    display: "flex",
                    flexFlow: "column",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    marginBottom: 20
                }}>
                    <Space amount="2vh"/>
                    <h1 className="title" style={{textAlign: "center", margin: "auto"}}>15 Puzzle</h1>
                    <Space amount="2vh"/>

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

                <div className="card">
                    <h2 className={"big-list-item"}>Rules</h2>
                    <p>
                        The 15 Puzzle consists of a shuffled 4x4 grid containing tiles numbered from 1 to 15 and an
                        empty
                        space. <br/>
                        The goal is to slide the tiles horizontally or vertically to rearrange them into numerical
                        order. <br/>
                        Other version exists with any NxN grid.
                    </p>
                </div>
                <div className="card">
                    <h2 className={"big-list-item"}>
                        Solvability
                    </h2>
                    <p>
                        Not all
                        configurations of the 15 Puzzle can be solved. To determine whether a given configuration is
                        solvable,
                        mathematicians use the concept of <b>inversions</b>. An inversion occurs when a tile with a
                        higher
                        number
                        precedes a tile with a lower number in the sequence when read row-wise. If the number of
                        inversions
                        is
                        even, the puzzle is solvable; if it is odd, it is not.
                    </p>
                    <p>
                        This mathematical insight helps explain why some configurations seem impossible to solve no
                        matter
                        how many moves you make. Which is why Sam Loyd offered a $1,000 prize to anyone who could solve
                        the
                        puzzle from this starting position:
                    </p>
                    <div className="App" ref={p5UnsolvableContainerRef}/>
                </div>
            </div>
        )
    }