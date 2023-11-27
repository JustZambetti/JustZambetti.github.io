import "./App.css";
import React, { useState } from "react";
import Graph from "./Graph.js";

export function Column(props) {
  return (
    <div
      className="column"
      style={{ backgroundColor: props.color, height: props.value }}
    >
      {props.value}
    </div>
  );
}

export default Column;
