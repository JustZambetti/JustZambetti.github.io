import {Col, Row} from "react-bootstrap";
import {articles} from "../App";
import {useEffect, useRef} from "react";
import p5 from 'p5';
import {p5 as canvas} from "p5/lib/p5";
import {Link} from "react-router-dom";

export function Portfolio() {
    return (
        <>
            <div style={{height: "25vh"}}></div>
            <Greetings/>
            <div style={{position: "absolute", zIndex: "-1", right: "40vw", top: "20vh"}}>
                <CircleGrid totalCircles={64}/>
            </div>
            <Space amount="30vh"/>
            <Scroller amount="50vh" leftOffset="100px"/>
            <SearchAndOptimization/>
            <Space amount="35vh"/>
            <Scroller amount="50vh" leftOffset="100px"/>
            <SoftwareEngineering/>
            <Space amount="30vh"/>
            <DarkZone/>
            <NavBar/>
        </>
    )
}

export function Space({amount}) {
    return <div style={{height: amount}}></div>
}

function Greetings() {
    return (

        <div style={{
            margin: "auto",
            width: "613px",
            display: "flex",
            flexDirection: 'column',
            alignItems: "left",
            justifyContent: "start"
        }}>
            <div style={{textAlign: "left"}}>
                <span id="hi">HI</span>
                <span className="subtitle">I'm</span>
            </div>
            <span className="title" style={{marginLeft: 13, marginTop: "-32px"}}>Zambetti Giorgio</span>
            <span className="subtitle" style={{marginLeft: 13}}>Software Engineer</span>
        </div>)
}

function SoftwareEngineering() {
    return (
        <div style={{margin: "auto", width: "613px", display: "flex", flexDirection: 'column'}}>
            <span className="title">SOFTWARE ENGINEERING</span>
            <span className="text">Need help with new or existing software?</span>
            <ul style={{position: "relative", left: "10%"}}>
                <li className="big-list-item">DESIGNING</li>
                <li className="big-list-item">TESTING</li>
                <li className="big-list-item">DEVELOPING</li>
            </ul>
            <SmallLetsConnect/>
        </div>
    )
}

function SearchAndOptimization() {
    return (
        <div style={{margin: "auto", width: "613px", display: "flex", flexDirection: 'column'}}>
            <span className="title">SEARCH & OPTIMIZATION</span>
            <span className="text">Need optimal solutions to hard combinatorial problems?</span>
            <ul style={{position: "relative", left: "10%"}}>
                <li className="big-list-item">PLANNING</li>
                <li className="big-list-item">ROUTING</li>
                <li className="big-list-item">SCHEDULING</li>
                <li className="big-list-item">PACKING</li>
            </ul>
            <SmallLetsConnect/>
            <FifteenGame/>
        </div>
    )
}


const CircleGrid = ({totalCircles}) => {
    const gridSize = Math.ceil(Math.sqrt(totalCircles));
    const circles = Array.from({length: totalCircles}, (_, i) => i);

    return (
        <div
            className="circle-grid"
            style={{
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            }}
        >
            {circles.map((circle) => (
                <div key={circle} className="circle"/>
            ))}
        </div>
    );
};


const NavBar = () => {
    return (
        <div style={{position: "fixed", right: "5%", top: "10%", mixBlendMode: "difference"}}>
            <div className="navbar-line"></div>
            <div style={{marginRight: "10px"}}>
                <Link to="/AboutMe" className="navbar-text-unselected"> contacts</Link>
                <p className="navbar-text-selected"> portfolio</p>
                <Link to="/Articles" className="navbar-text-unselected"> articles</Link>
            </div>
        </div>
    );
}

const Scroller = ({amount, leftOffset}) => {
    return (
        <div style={{position: "relative", left: leftOffset, margin: "auto"}}>

            <div className="scroll-line" style={{height: amount, bottom: -33}}>


                <div style={{position: "relative", top: -15, display: "flex", alignItems: "center"}}>
                    <div className="scroll-circle"></div>
                    <p className="scroll-text" style={{marginLeft: 20, marginBottom: 0}}> SCROLL</p>
                </div>

            </div>
        </div>
    );
}              //<div style={{bottom: -7, right: 0}} className="scroll-circle"/>

function SmallLetsConnect() {
    return <div style={{marginTop: "8vh"}}>
        <span className="text">Then, let's </span>
        <span className="small-connect-button"> <span>CONNECT!</span></span>
    </div>
}

function DarkZone() {
    return (
        <>
            <div className="dark-zone-angled"></div>
            <div className="dark-zone">
                <FinalCallToAction/>
            </div>
        </>
    )
}

function FinalCallToAction() {
    return (
        <>
            <span className="title-dark">CONVINCED?</span>
            <SmallLetsConnect/>
        </>
    )
}


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
    let canvasSize = 250
    let cellMargin = 8
    let font;
    let won = false;
    let confettiTime = 0
    let overX = null
    let overY = null
    const array = [[2, 1, 4], [3, 8, 6], [7, 5, null]]

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
            confetti.push(new Confetti(p.random(250), p.random(-50, -10), p));
        }
    }

    const drawBackground = () => {
        p.fill("#BDBDBD")
        p.noStroke()
        p.rect(0, 0, canvasSize + cellMargin, canvasSize + cellMargin, 6)
    }
    const drawCell = (x, y, num) => {
        p.fill("#D9D9D9")
        p.noStroke()
        let size = canvasSize / 3
        if (overX === x && overY === y)
            p.fill('#ded5b2');

        p.rect(x * size + cellMargin, y * size + cellMargin, size - cellMargin, size - cellMargin, 6)

        p.fill('#636363');
        p.textFont(font);
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(num.toString(), x * size + size / 2 + cellMargin / 2, y * size + size / 2);
    }
    p.draw = () => {
        drawBackground();
        let size = canvasSize / 3
        for (let x = 0; x < 3; x++)
            for (let y = 0; y < 3; y++)
                if (p.mouseX >= x * size + cellMargin && p.mouseX <= x * size + cellMargin + size - cellMargin
                    && p.mouseY >= y * size + cellMargin && p.mouseY <= y * size + cellMargin + size - cellMargin) {
                    overX = x
                    overY = y
                }

        for (let x = 0; x < 3; x++)
            for (let y = 0; y < 3; y++) {
                if (array[x][y] !== null)
                    drawCell(x, y, array[x][y])
            }

        if(won){
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
            for (let x = 0; x < 3; x++)
                for (let y = 0; y < 3; y++)
                    if(array[x][y] !== x+3*y+1 && (y !== 2 || x !== 2)){
                        hasWon = false
                    }

            if(hasWon){
                won = true
                confettiTime = 60
            }
        }


    }
}


export function FifteenGame() {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);
        return () => {
            p5Instance.remove();
        }
    }, [])

    return (
        <div style={{position: "absolute", right: "2vw"}}>
            <span className="subtitle" style={{textAlign: "center", margin: "auto"}}>PUZZLE OF THE DAY </span>
            <div className="App" ref={p5ContainerRef}/>
            <Link to="/Puzzle15" className="text">Learn how to generalize it!</Link>
        </div>
    )
}