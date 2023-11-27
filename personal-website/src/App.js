import "./App.css";
import React, { useState } from "react";
import Graph from "./Graph.js";
import Column from "./Column.js";

function App() {
  const columns = [
    new Column(500, "#111111"),
    new Column(400, "#111111"),
    new Column(200, "#111111"),
  ];
  return (
    <div className="App">
      <Graph columns={columns} />
    </div>
  );
}
/*
function Column({ value, color }) {
  const [count, setCount] = useState(0);
  return <div className="column" color={color} height={value}></div>;
}
*/

export default App;
