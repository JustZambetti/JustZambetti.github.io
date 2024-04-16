import * as React from 'react';
import { Link } from 'react-router-dom';

export function Header(){
    const style = {
        padding: "10px",
        textAlign: "center",
        background: "#1abc9c",
        color: "white",
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-between"
    }

    const linksStyle = {
        fontSize: "16px",
        flex:1,
        textAlign: "center",
    }

    return <div style={style}>
        <div style={linksStyle}>
            <Link to="/"> Articles </Link>
        </div>
        <div style = {{flex:3}}>
            Welcome to Zambetti Giorgio's blog [W.I.P]
        </div>
        <div style = {{flex:1}}>

        </div>
    </div>
}