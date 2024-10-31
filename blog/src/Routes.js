import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {GrahamScanVisualization} from "./pages/GrahamScanVisualization";
import {articles} from "./App";
import {Articles} from "./pages/Articles";
import {Header} from "./Header";
import {AboutMe} from "./pages/AboutMe";
import {AlgorithmicRiddles} from "./pages/AlgorithmicRiddles";
import {Portfolio} from "./pages/Portfolio";
export function AppRouter (){
    return (
        <Router>
            <Routes>Portfolio
                <Route path = "/" element = {<Portfolio/>}/>
                <Route path = "/Articles" element = {<Articles/>}/>
                <Route path ="/AboutMe" element={<AboutMe/>}/>
                <Route path ="/AlgorithmicRiddles" element={<AlgorithmicRiddles/>}/>
                { Object.keys(articles).map(key =>
                    <Route path={"/"+key} element = {articles[key].route}/>)
                }
            </Routes>
        </Router>
    )
}