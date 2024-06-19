
export const AboutMe = () => {
    const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow:"hidden"}}>
        <div style={{display:"flex"}}>
            <img style={{borderRadius: "50%", width:200, marginLeft:"75%", position:"absolute", marginTop:70, boxShadow:"0px 4px 4px"}} alt="Giorgio" src="/imgs/propic.jpg"/>
        </div>
        <h1 style={{fontFamily: "inter", fontWeight:500, textAlign:"center", marginTop:70}}>ABOUT ME</h1>
        <p style={{margin:"auto", width:"50%"}}>I’m Zambetti Giorgio, a Computer Science student based in Italy. Here I share my projects and some interactive explainations of the algorithms I learn about. I hope that you will like them!  </p>

        <p style={{color:"#787878", textAlign:"center", padding:"top", marginTop:200}}>{text}</p>
    </div>
}