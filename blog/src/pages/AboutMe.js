import {Link} from "react-router-dom";
import {Space} from "./Portfolio";

export const AboutMe = () => {
    //const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow: "hidden"}}>
        <Space amount="8vh"/>
        <h1 className="title" style={{textAlign: "center"}}>LET'S CONNECT!</h1>
        <Space amount="8vh"/>
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <div className="big-list-item" style={{width: "100%", textAlign: "center"}}> About Me</div>
            <div style={{flex: 3, minWidth: "15%"}}/>
            <div style={{flex: 5, maxWidth: "50%", minWidth: "25%", textAlign: "center"}}>
                <p style={{margin: "auto", width: "100%"}}>
                    I’m Giorgio Zambetti, a 20 years old Software Engineer.<br/>
                    Here I share my projects and some interactive explanations of the algorithms I learn about.
                    I hope you will like them!</p>
            </div>
            <div style={{flex: 1, minWidth: "0%"}}/>
            <div style={{flex: 1, overflow: "visible", paddingBottom: 10}}>
                <img style={{
                    borderRadius: "50%",
                    width: "14rem",
                    display: "block",
                    margin: "auto",
                    boxShadow: "0px 4px 4px"
                }} alt="Giorgio" src="/imgs/propic.jpg"/>
                <div style={{
                    display: "flex",
                    fontSize: 64,
                    width: "14rem",
                    margin: "auto",
                    color: "#424242",
                    justifyContent: "space-evenly"
                }}>
                    <a className="social-link" href="https://github.com/JustZambetti"><i
                        className="bi bi-github"></i></a>
                    <a className="social-link" href="https://www.linkedin.com/in/giorgio-zambetti"><i
                        className="bi bi-linkedin"></i></a>
                </div>
            </div>

            <div style={{flex: 3, textAlign: "center", minWidth: "70%"}}>
                <span className="big-list-item"> Contact me</span><br/>
                <span className="text"> work@zambettigiorgio.com</span><br/>
                <span className="text"><a href="/CV.pdf" className="text" download="CV Zambetti Giorgio">CV</a></span>
            </div>
        </div>
    <NavBar/>
    </div>

    /* <p style={{color: "#787878", textAlign:"center", padding:"top", marginTop:200}}>{text}</p>*/
}

const NavBar = () => {
    return (
        <div style={{position: "fixed", right: "5%", top: "10%", mixBlendMode: "difference"}}>
            <div className="navbar-line"></div>
            <div style={{marginRight: "10px"}}>
                <p className="navbar-text-selected"> contacts</p>
                <Link to="/" className="navbar-text-unselected"> portfolio</Link><br/>
                <Link to="/Articles" className="navbar-text-unselected"> articles</Link>
            </div>
        </div>
    );
}