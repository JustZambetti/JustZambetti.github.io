import {Col, Row} from "react-bootstrap";
import {articles} from "../App";

export function Portfolio() {
    return (
        <>
            <div style={{height: "25vh"}}></div>
            <Greetings/>
            <div style={{position:"absolute", zIndex:"-1", right:"40vw", top:"20vh"}}>
                <CircleGrid totalCircles={64}  />
            </div>
            <NavBar/>
            <Space amount="30vh"/>
            <Scroller amount="50vh"/>
            <SearchAndOptimization/>
            <Space amount="50vh"/>
            <Scroller amount="50vh" leftOffset="100px"/>
            <SoftwareEngineering/>
            <Space amount="30vh"/>
        </>
    )
}

function Space({amount}) {
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
            <div>
                <span className="text">Then, let's </span>
                <span className="small-connect-button"> <span>CONNECT!</span></span>
            </div>
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
        <div style={{position: "fixed", right: "5%", top: "10%"}}>
            <div className="navbar-line"></div>
            <div style={{marginRight: "10px"}}>
                <p className="navbar-text-unselected"> contacts</p>
                <p className="navbar-text-selected"> portfolio</p>
                <p className="navbar-text-unselected"> articles</p>
            </div>
        </div>
    );
}

const Scroller = ({amount, leftOffset}) => {
    return (
        <div style={{position: "relative", left:leftOffset, margin:"auto"}}>

            <div className="scroll-line" style={{height:amount, bottom:-33}}>
                <div style={{bottom: -7, right: 0}} className="scroll-circle">


                </div>
                <div style={{position: "relative", top: -15, display:"flex",  alignItems: "center"}}>
                    <div className="scroll-circle"></div>
                    <p className="scroll-text" style={{marginLeft: 20, marginBottom:0}}> SCROLL</p>
                </div>

            </div>
        </div>
    );
}