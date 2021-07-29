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
        <Tooltip content="bottom Tooltip Content">
          <button className="btn">bottom</button>
        </Tooltip>
        <Tooltip content="bottom-start Content">
          <button className="btn">bottom-start</button>
        </Tooltip>
        <Tooltip content="bottom-end Content">
          <button className="btn">bottom-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="right Tooltip Content">
          <button className="btn">right</button>
        </Tooltip>
        <Tooltip content="right-start Content">
          <button className="btn">right-start</button>
        </Tooltip>
        <Tooltip content="right-end Content">
          <button className="btn">right-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="left Tooltip Content" placement="left">
          <button className="btn">left</button>
        </Tooltip>
        <Tooltip content="left-start Content">
          <button className="btn">left-start</button>
        </Tooltip>
        <Tooltip content="left-end Content">
          <button className="btn">left-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="top Tooltip Content" placement="top">
          <button className="btn">top</button>
        </Tooltip>
        <Tooltip content="top-start Content">
          <button className="btn">top-start</button>
        </Tooltip>
        <Tooltip content="top-end Content">
          <button className="btn">top-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="Fixed Tooltip Content" isOpen={isTooltipOpen}>
          <button
            className="btn"
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          >
            isOpen = true
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
