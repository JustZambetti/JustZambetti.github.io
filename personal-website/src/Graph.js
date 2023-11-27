import "./App.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Column from "./Column.js";

export default function Graph(props) {
  var ref = useRef();
  const { width, height } = useResize(ref);

  return (
    <>
      <div id="container" ref={ref} className="data-container">
        {props.columns.map((c) => (
          <Column color={c.color} value={c.value} />
        ))}
      </div>
    </>
  );
}
//export default Graph;

const useResize = (myRef) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    setWidth(myRef.current.offsetWidth);
    setHeight(myRef.current.offsetHeight);
  }, [myRef]);

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, handleResize]);

  return { width, height };
};
