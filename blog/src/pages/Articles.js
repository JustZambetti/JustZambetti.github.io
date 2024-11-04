import {articles} from "../App";
import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";
import {Space} from "./Portfolio";

export function Articles() {
    return (
        <div style={{maxWidth: 1000, margin:"auto"}}>

            <Space amount="18vh"/>
            <Section title={"PUZZLES"} subtitle={"Fun games with tons of maths backing them!"}/>
            <Space amount="5vh"/>
            <ArticleBox
                title="15"
                        subtitle="Learn how to solve it!"
                isRight={true}
                link = "/Puzzle15"
                src = "/imgs/puzzle15.png"
            />
            <Space amount="6vh"/>
            <ArticleBox title="WATER JUGS" subtitle="Learn more about one of the most asked interview riddles!"
                        isRight={false}
                        link = "/WaterJugs"/>
            <Space amount="25vh"/>
            <Section title={"GENERATORS"} subtitle={"Find out how to generate anything"}/>
            <Space amount="5vh"/>
            <ArticleBox title="Mazes"
                        subtitle="Generate mazes on a 2D grid"
                        isRight={false}
                        link={"/maze"}
                        src={"/imgs/maze.png"}/>
            <Space amount="6vh"/>
            <ArticleBox title="SUDOKU" subtitle="Generate valid sudokus with difficulty levels" isRight={true}
                        link={"/sudoku"} src={"/imgs/sudoku.png"}/>
            <Space amount="6vh"/>
            <ArticleBox title="WAVEFUNCTION COLLAPSE" subtitle="Generate anything with a simple set of rules!"
                        isRight={false}
                        link={"/wavefunctioncollapse"} src={"/imgs/wave_function_collapse.png"}/>

            <NavBar/>

        </div>
    )// <Space amount="15vh"/>
        //<Title/>
}

const Title = () => {
    return (
        <div style={{
            margin: "auto",
            width: "613px",
            display: "flex",
            flexDirection: 'column',
            alignItems: "left",
            justifyContent: "start"
        }}>
            <span className="title">ARTICLES</span> <br/>
            <span className="text">If you are looking for project ideas or to learn something new</span> <br/>
            <span className="text"> you are in the right place!</span>
        </div>
    )
}

const ArticleBox = ({title, subtitle, isRight, src, link}) => {
    return (
        <div style={{
            position: "relative",
            display: "flex",
            flexDirection: isRight ? 'row' : "row-reverse",
            alignItems: "left",
            justifyContent: isRight ? "end" : "start",
            marginLeft: 30,
            marginRight: 30,
        }}>
            <div>
                <span style={{float: isRight ? "right" : "left"}} className="big-list-item">{title}</span> <br/>
                <span style={{float: isRight ? "right" : "left"}} className="text">{subtitle}</span>
            </div>
            <Link to={link}>
                <img alt={title}
                     src={src}
                     style={{
                         padding:5,
                         display: "block",
                         position: "relative",
                         marginLeft: 10,
                         top: 0,
                         width: 250, height: 250, background: "white", borderRadius: 10
                     }}
                />

            </Link>

        </div>
    )
}

const Section = ({title, subtitle}) => {
    return (
        <div style={{
            margin:"auto",
            width: "613px",
            display: "flex",
            flexDirection: 'column',
            alignItems: "left",
            justifyContent: "start"
        }}>
            <span className="title">{title}</span> <br/>
            <span className="text">{subtitle}</span>
        </div>
    )
}

const NavBar = () => {
    return (
        <div style={{position: "fixed", display: "flex", right: "5%", top: "10%", mixBlendMode: "difference"}}>
            <div className="navbar-line"></div>
            <div style={{marginRight: "10px"}}>
                <Link to="/AboutMe" className="navbar-text-unselected"> contacts</Link><br/>
                <Link to="/" className="navbar-text-unselected"> portfolio</Link>
                <p className="navbar-text-selected"> articles</p>
            </div>
        </div>
    );
}

