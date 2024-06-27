import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export function Header(){
    const style = {
        padding: "6px",
        textAlign: "center",
        background: "#72a9c4",
        color: "white",
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-between"
    }

    const zambettiGiorgioStyle = {
        fontFamily: "inter", fontSize: "1.2em", color: "#EDEDED", fontWeight:"bold"
    }
    const dotComStyle = {
        fontFamily: "inter", fontSize: "0.8em", color: "#1B1A20", fontWeight:"500", textDecoration:"none", verticalAlign:"middle"
    }
    const littleTextStyle = {
        fontWeight:"500", textDecoration:"none", color:"inherit"
    }
/*<div style={style}>
        <div>



            <Link to="/AboutMe" style={{...littleTextStyle,  fontWeight:"bold", marginLeft: "20px"}}> About Me </Link>
            <a href={"/algorithmic_riddles.pdf"} target="_blank" rel="noreferrer" style={{...littleTextStyle,  fontWeight:"bold", marginLeft: "20px"}}> Algorithmic Riddles </a>
        </div>
    </div>

        */
    return(
        <div className="Main">
            <Navbar
                className="Navy"
                collapseOnSelect
                expand="full"
                style={style}
            >
                <Navbar.Brand href="#home"> <Link to="/" style={{textDecoration: "none"}}> <span style={zambettiGiorgioStyle}>ZambettiGiorgio</span><span style={dotComStyle}>.com</span> </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link> <Link to="/AboutMe" style={littleTextStyle}> About Me </Link></Nav.Link>
                        <Nav.Link> <Link to="/" style={littleTextStyle}> Articles </Link></Nav.Link>
                        <Nav.Link href="/algorithmic_riddles.pdf" target="_blank"> <a style={littleTextStyle}>Algorithmic Riddles</a> </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    </div>)
}