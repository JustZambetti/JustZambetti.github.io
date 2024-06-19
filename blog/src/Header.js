import * as React from 'react';
import { Link } from 'react-router-dom';

export function Header(){
    const style = {
        padding: "6px",
        textAlign: "center",
        background: "#F2BF3C",
        color: "white",
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-between"
    }

    const zambettiGiorgioStyle = {
        fontFamily: "inter", fontSize: 36, color: "#EDEDED", fontWeight:"bold"
    }
    const littleTextStyle = {
        fontFamily: "inter", fontSize: 20, color: "#1B1A20", fontWeight:"500", textDecoration:"none", verticalAlign:"middle"
    }

    return <div style={style}>
        <div>
            <Link to="/" style={{textDecoration: "none"}}> <span style={zambettiGiorgioStyle}>ZambettiGiorgio</span><span style={littleTextStyle}>.com</span> </Link>

            <Link to="/" style={{...littleTextStyle,  fontWeight:"bold", marginLeft: "100px"}}> articles </Link>
            <Link to="/AboutMe" style={{...littleTextStyle,  fontWeight:"bold", marginLeft: "20px"}}> about me </Link>
        </div>

    </div>
}