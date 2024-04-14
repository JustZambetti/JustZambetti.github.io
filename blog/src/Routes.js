import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from "./Home";
import {articles} from "./App";
import {Articles} from "./pages/Articles";
import {Header} from "./Header";
export function AppRouter (){
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path = "/" element = {<Articles/>}/>
                { Object.keys(articles).map(key =>
                    <Route path={"/"+key} element = {articles[key]}/>)
                }
            </Routes>
        </Router>
    )
}