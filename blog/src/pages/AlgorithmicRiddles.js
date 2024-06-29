import "bootstrap-icons/font/bootstrap-icons.css";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const AlgorithmicRiddles = () => {
    //const text = "<space intentionally left blank for minimalistic purposes>"
    return <div style={{overflow:"hidden"}}>
        <h1 style={{fontFamily: "inter", fontWeight:500, textAlign:"center", marginTop:70}}>ALGORITHMIC RIDDLES</h1>
        <div style={{display:"flex", flexWrap:"wrap-reverse"}}>
            <div style={{flex:3, minWidth:"70%"}}>
                <p style={{margin:"auto", maxWidth:"70%"}}>Algorithmic Riddles is a collection of famous riddles designed to improve your problem solving skills. It is just a draft and for now it includes:</p>
                <ul style={{margin:"auto", maxWidth:"70%"}}>
                    <li style={{listStyle:"none"}}> <i style={{color:"green"}} className="bi bi-check"></i> <b>3 River Crossing </b> Riddles</li>
                    <li style={{listStyle:"none"}}> <i style={{color:"green"}} className="bi bi-check"></i> <b>8 Boolean Logic </b> Riddles</li>
                    <li style={{listStyle:"none"}}> <i style={{color:"green"}} className="bi bi-check"></i> <b>5  Recursive Thinking </b> Riddles</li>
                    <li style={{listStyle:"none"}}> <i style={{color:"green"}} className="bi bi-check"></i> <b>5 Dynamic Programming </b> Riddles</li>
                    <li style={{listStyle:"none"}}> <i style={{color:"green"}} className="bi bi-check"></i> <b>2 </b> particularly difficult <b>Extra</b> Riddles</li>
                    <li style={{listStyle:"none"}}><i style={{color:"red"}} className="bi bi-x"></i> <b>Solutions</b> (don't worry though, they are easily googled)</li>
                    <li style={{listStyle:"none"}}> <i style={{color:"red"}} className="bi bi-x"></i> A <b>story</b> connecting all the riddles</li>
                </ul>

            </div>

            <div style={{flex:1}}>
                <img style={{width:200, display:"block", margin:"auto",boxShadow:"0px 4px 4px"}} alt="Giorgio" src="/imgs/algorithmic_riddles_cover.png"/>
            </div>
        </div>
        <div className="text-center" style={{marginTop:20}}>
            <Button
                variant="primary"
                size="lg"
                onClick={() =>handleDownload("/algorithmic_riddles.pdf", "Algorithmic Riddles.pdf")}
            >
               <i className="bi bi-download"/> Download Now
            </Button>
        </div>
    </div>
}

const handleDownload = (url, fileName) => {
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "downloaded-file";
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error fetching the file:", error);
        });
}