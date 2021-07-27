import React, { useState } from "react";
import { Tooltip } from "./Tooltip";
import "./styles.css";

/**
 * App
 */
export default function App() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  return (
    <div className="App">
      <h1>Tooltip Example</h1>

      <div className="container">
        <Tooltip content="Tooltip Content">
          <button className="btn">Hover me</button>
        </Tooltip>
        <Tooltip content="Tooltip Content" isOpen={isTooltipOpen}>
          <button
            className="btn"
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          >
            Open on render
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
