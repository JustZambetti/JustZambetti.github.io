import './App.css';
import {Home} from "./Home";
import {ConvexHull} from "./ConvexHull";
import {Random} from "./Random";
import {Header} from "./Header";
import {AppRouter, Routes} from "./Routes";
import {BinomialDistribution} from "./pages/BinomialDistribution";

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
    binomialDistribution: <BinomialDistribution/>
}

export default App;
