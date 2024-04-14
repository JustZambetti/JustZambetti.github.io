import {articles} from "../App";
import {Link} from "react-router-dom";

export function Articles(){
    return (
    <ul>
        {Object.keys(articles).map(article =>
            <li>
                <Link to={"/"+article}> {article} </Link>
            </li>
        )}
    </ul>
    )
}
