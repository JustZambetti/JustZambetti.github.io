import {Link} from "react-router-dom";

export const AboutMe = () => {
    //const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow:"hidden"}}>
        <h1 style={{fontFamily: "inter", fontWeight:500, textAlign:"center", marginTop:70}}>ABOUT ME</h1>
        <div style={{display:"flex", flexWrap:"wrap"}}>
            <div style={{flex:3, minWidth:"70%"}}>
                <p style={{margin:"auto", maxWidth:"75%"}}>
                    I’m Zambetti Giorgio, a Computer Science student based in Italy.
                    Here I share my projects and some interactive explanations of the algorithms I learn about.
                    I hope you will like them!  </p>
                <p style={{margin:"auto", maxWidth:"75%"}}>
                    I really like spending my free time solving riddles and LeetCode-like questions.
                    That's why I'm currently working on <Link to="/AlgorithmicRiddles">Algorithmic Riddles</Link>: a curated collection of the logical puzzles I like the most!
                </p>
            </div>
            <div style={{flex:1, overflow:"visible", paddingBottom:10}}>
                <img style={{borderRadius: "50%", width:"14rem", display:"block", margin:"auto",boxShadow:"0px 4px 4px"}} alt="Giorgio" src="/imgs/propic.jpg"/>
            <div style={{display:"flex", fontSize:64, width:"14rem", margin:"auto", color:"#424242", justifyContent:"space-evenly"}}>
                <a className="social-link" href="https://github.com/JustZambetti"><i className="bi bi-github"></i></a>
                <a className="social-link" href="https://www.linkedin.com/in/giorgio-zambetti"><i className="bi bi-linkedin"></i></a>
            </div>
            </div>
        </div>


        <h2 style={{fontFamily: "inter", fontWeight:500, textAlign:"center",  marginTop:"50vh"}}>OTHER THINGS I LIKE</h2>
        <div style={{display:"flex", flexWrap:"wrap"}}>

            <div style={{ minWidth:"70%"}}>
                <p style={{margin:"auto", maxWidth:"75%"}}>I also like to do stay fit and have fun by playing sports like Ultimate Frisbee, Running and Hiking. I'm currently training to (eventually) run a marathon and I enjoy every bit of wilderness I can find.</p>
                <p style={{margin:"auto", maxWidth:"75%"}}>Those in the photo below are my beloved cats: Zero and Kiwi ❤️❤️</p>
            </div>
            <div style={{margin:"auto", display:"flex", flexWrap:"wrap", justifyContent:"space-around", overflow:"visible", paddingBottom:10}}>
                <img style={{width:"14rem", margin:"auto", display:"block"}} alt="Hiking" src="/imgs/hiking.jpg"/>
                <img style={{width:"14rem", margin:"auto", display:"block"}} alt="My cats" src="/imgs/cats.jpg"/>
            </div>
        </div>

    </div>    /* <p style={{color:"#787878", textAlign:"center", padding:"top", marginTop:200}}>{text}</p>*/
}