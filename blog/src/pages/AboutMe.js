
export const AboutMe = () => {
    //const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow:"hidden"}}>
        <h1 style={{fontFamily: "inter", fontWeight:500, textAlign:"center", marginTop:70}}>ABOUT ME</h1>
        <div style={{display:"flex", flexWrap:"wrap"}}>
            <div style={{flex:3, minWidth:"70%"}}>
                <p style={{margin:"auto", maxWidth:"70%"}}>I’m Zambetti Giorgio, a Computer Science student based in Italy. Here I share my projects and some interactive explanations of the algorithms I learn about. I hope you will like them!  </p>
            </div>
            <div style={{flex:1, overflow:"visible", paddingBottom:10}}>
                <img style={{borderRadius: "50%", width:200, display:"block", margin:"auto",boxShadow:"0px 4px 4px"}} alt="Giorgio" src="/imgs/propic.jpg"/>
            </div>
        </div>
    </div>    /* <p style={{color:"#787878", textAlign:"center", padding:"top", marginTop:200}}>{text}</p>*/
}