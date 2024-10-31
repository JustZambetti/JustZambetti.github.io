import './App.css';
import {GrahamScanVisualization} from "./pages/GrahamScanVisualization";
import {ConvexHull} from "./pages/ConvexHull";
import {Random} from "./pages/Random";
import {Header} from "./Header";
import {AppRouter, Routes} from "./Routes";
import {BinomialDistribution} from "./pages/BinomialDistribution";
import {MontecarloPiCalculator} from "./pages/MontecarloPiCalculator";
import {Maze} from "./pages/Maze";
import {WaveFunctionCollapse} from "./pages/WaveFunctionCollapse";
import {SudokuGenerator} from "./pages/SudokuGenerator";
import {WaterJugsRiddle} from "./pages/WaterJugsRiddle";
import React from "react";

function App() {
  return (
      <>
          <AppRouter/>
      </>
  );
}

export const articles = {
    waterJugs: {route: <WaterJugsRiddle/>, title: "Water Jugs Riddle", description:"A maze generator", src:".png"},
    maze: {route: <Maze/>, title: "Maze Generator", description:"A maze generator", src:"maze.png"},
    waveFunctionCollapse: {route: <WaveFunctionCollapse/>, title: "2D Castle Generator", description:"Learn more about wave function collapse", src:"wave_function_collapse.png"},
    sudoku: {route: <SudokuGenerator/>, title: "Sudoku", description:"A SudokuGenerator generator", src:"sudoku.png"},
    //convexHull: {route: <ConvexHull/>, title:"Convex Hull Editor",description:"A convex hull editor", src:"convex_hull.png"},
    //montecarlo: {route: <MontecarloPiCalculator/>, title:"Montecarlo Simulation",description:"Calculating Pi by choosing random points", src:"montecarlo.png"},
    //random: {route: <Random/>, title:"Linear Distribution", description:"A visualization of a linear distribution", src:"linear_distribution.png"},
    //binomialDistribution: {route: <BinomialDistribution/>, title:"Binomial Distribution",description:"A visualization of a binomial distribution", src:"binomial_distribution.png"},
}

export default App;
