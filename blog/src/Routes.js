import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {GrahamScanVisualization} from "./pages/GrahamScanVisualization";
import {articles} from "./App";
import {Articles} from "./pages/Articles";
import {Header} from "./Header";
import {AboutMe} from "./pages/AboutMe";
export function AppRouter (){
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path = "/" element = {<Articles/>}/>
                <Route path ="/AboutMe" element={<AboutMe/>}/>
                { Object.keys(articles).map(key =>
                    <Route path={"/"+key} element = {articles[key].route}/>)
                }
            </Routes>
        </Router>
    )
}