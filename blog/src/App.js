import './App.css';
import {GrahamScanVisualization} from "./pages/GrahamScanVisualization";
import {ConvexHull} from "./pages/ConvexHull";
import {Random} from "./pages/Random";
import {Header} from "./Header";
import {AppRouter, Routes} from "./Routes";
import {BinomialDistribution} from "./pages/BinomialDistribution";
import {MontecarloPiCalculator} from "./pages/MontecarloPiCalculator";

function App() {
  return (
      <>
          <AppRouter/>
      </>
  );
}

export const articles = {
    random: <Random/>,
    convexHull: <ConvexHull/>,
    binomialDistribution: <BinomialDistribution/>,
    montecarlo: <MontecarloPiCalculator/>,

}

export default App;
