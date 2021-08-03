import React, { useState, forwardRef } from "react";
import { Tooltip } from "./Tooltip";
import "./styles.css";

/**
 * Custom Component
 * Since we are cloning the component at the Tooltip component and
 * adding a ref this component's ref needs to be forwared
 */
const Button = forwardRef((props, ref) => {
  const { title } = props;

  return (
    <button ref={ref} {...props}>
      {title}
    </button>
  );
});

/**
 * Tooltip component to simulate content as a React Component
 */
const TooltipContent = ({ onClick }) => {
  return (
    <div className="tooltip-content">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia
        deserunt odio et enim nisi dignissimos explicabo error, reprehenderit
        quisquam quam incidunt!
      </p>
      <button onClick={onClick}>Fechar</button>
    </div>
  );
};

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
        <Tooltip content="bottom-start Content" placement="bottom-start">
          <button className="btn">bottom-start</button>
        </Tooltip>
        <Tooltip content="bottom-end Content" placement="bottom-end">
          <button className="btn">bottom-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="right Tooltip Content" placement="right">
          <button className="btn">right</button>
        </Tooltip>
        <Tooltip content="right-start Content" placement="right-start">
          <button className="btn">right-start</button>
        </Tooltip>
        <Tooltip content="right-end Content" placement="right-end">
          <button className="btn">right-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="left Tooltip Content" placement="left">
          <button className="btn">left</button>
        </Tooltip>
        <Tooltip content="left-start Content" placement="left-start">
          <button className="btn">left-start</button>
        </Tooltip>
        <Tooltip content="left-end Content" placement="left-end">
          <button className="btn">left-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="top Tooltip Content" placement="top">
          <button className="btn">top</button>
        </Tooltip>
        <Tooltip content="top-start Content" placement="top-start">
          <button className="btn">top-start</button>
        </Tooltip>
        <Tooltip content="top-end Content" placement="top-end">
          <button className="btn">top-end</button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip content="Tooltip Content" placement="top">
          <Button className="btn" title="React.FC ref needs to be forwarded">
            React FC
          </Button>
        </Tooltip>
      </div>
      <div className="container">
        <Tooltip
          content={
            <TooltipContent onClick={() => setIsTooltipOpen(!isTooltipOpen)} />
          }
          isOpen={isTooltipOpen}
        >
          <button
            className="btn"
            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          >
            isOpen = {isTooltipOpen ? "true" : "false"}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
