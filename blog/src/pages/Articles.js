import {articles} from "../App";
import {Link} from "react-router-dom";
import { Card, Col, Row} from "react-bootstrap";

export function Articles(){
    return (
        <>
            <h1 style={{fontFamily: "inter", fontWeight:500, textAlign:"center", marginTop:70}}>ARTICLES</h1>

            <Row style={{marginTop:20, marginRight:5, marginLeft:5}}>
                {Object.keys(articles).map((article, id) =>
                    <Col key={id} lg={3} md={4} sm={6} xs={12} className="mb-4">
                        {ArticleCard(article)}
                    </Col>
                )}


            </Row>
        </>
    )
}
/*
    <div style={{display:"flex", flexWrap:"wrap", margin:"auto", justifyContent:"space-evenly"}}>
            {Object.keys(articles).map(article =>
                ArticleCard(article)
            )}
        </div>
 */

function ArticleCard(article) {
    return (
            <Card style={{ width: "auto", height:"100%"}}>
                <Link to={"/"+article}>
                    <Card.Img variant="top" src={"imgs/"+articles[article].src} />
                </Link>
                <div  style= {{height:"100%"}}> </div>
                <Card.Body style={{background:"#dde6f1"}}>
                    <Card.Title>{articles[article].title}</Card.Title>
                    <Card.Text>
                        {articles[article].description}
                    </Card.Text>
                </Card.Body>
            </Card>

    );
}
