import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Tooltip = ({ children, ...props }) => {
  const { placement = "bottom", isOpen } = props;

  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActive(!!isOpen);
    } else {
      setActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setTooltipPosition(targetRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (isOpen !== undefined) {
      return false;
    }

    setActive(true);
    setTooltipPosition(targetRef.current);
  };

  const handleMouseLeave = () => {
    if (isOpen !== undefined) {
      return false;
    }

    setActive(false);
  };

  /**
   * Position tooltip element based on target's position
   */
  const setTooltipPosition = (negate) => {
    let targetRect = targetRef.current.getBoundingClientRect();
    let tooltipRect = tooltipRef.current.getBoundingClientRect();
    let boundaries = {
      left: 0,
      top: 0,
      right: document.body.clientWidth,
      bottom: window.innerHeight
    };

    const recursive = (placement, negate) => {
      switch (placement) {
        case "top":
          positionRef.current.x =
            targetRect.x + (targetRect.width - tooltipRect.width) / 2;
          positionRef.current.y = targetRect.top - (tooltipRect.height + 24);
          break;
        case "left":
          positionRef.current.x = targetRect.left - tooltipRect.width - 24;
          positionRef.current.y =
            targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case "right":
          positionRef.current.x = targetRect.right + 24;
          positionRef.current.y =
            targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case "left-start":
          positionRef.current.x = targetRect.left - tooltipRect.width - 24;
          positionRef.current.y = targetRect.bottom - tooltipRect.height;
          break;
        case "left-end":
          positionRef.current.x = targetRect.left - tooltipRect.width - 24;
          positionRef.current.y = targetRect.top;
          break;
        case "right-start":
          positionRef.current.x = targetRect.right + 24;
          positionRef.current.y = targetRect.bottom - tooltipRect.height;
          break;
        case "right-end":
          positionRef.current.x = targetRect.right + 24;
          positionRef.current.y = targetRect.top;
          break;
        case "bottom-start":
          positionRef.current.x = targetRect.left;
          positionRef.current.y = targetRect.bottom + 24;
          break;
        case "bottom-end":
          positionRef.current.x = targetRect.right - tooltipRect.width;
          positionRef.current.y = targetRect.bottom + 24;
          break;
        case "top-start":
          positionRef.current.x = positionRef.current.x = targetRect.left;
          positionRef.current.y = targetRect.top - (tooltipRect.height + 24);
          break;
        case "top-end":
          positionRef.current.x = targetRect.right - tooltipRect.width;
          positionRef.current.y = targetRect.top - (tooltipRect.height + 24);
          break;
        default:
          positionRef.current.x =
            targetRect.x + (targetRect.width - tooltipRect.width) / 2;
          positionRef.current.y = targetRect.bottom + 24;
          break;
      }

      console.log(boundaries, tooltipRect);
      if (
        tooltipRect.left < boundaries.left ||
        tooltipRect.right > boundaries.right ||
        tooltipRect.top < boundaries.top ||
        tooltipRect.bottom > boundaries.bottom
      ) {
        console.log("overflow");
      }
    };
    recursive(placement);
  };

  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: targetRef
      })}
      <Portal>
        <StyledTooltip
          ref={tooltipRef}
          isActive={active}
          position={positionRef.current}
          placement={placement}
        >
          {props.content}
        </StyledTooltip>
      </Portal>
    </>
  );
};

const StyledTooltip = styled.div`
  background-color: #fff;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1));
  max-width: 400px;
  padding: 16px;
  z-index: 1000;

  position: absolute;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  transform: translate(0, 0);
  transition: transform 160ms, opacity 160ms;

  ${(props) =>
    props.isActive ? `display: flex;` : `opacity: 0; pointer-events: none;`}

  ${(props) => {
    const { isActive, placement } = props;
    if (isActive && placement.startsWith("top")) {
      return `transform: translate(0, 16px);`;
    } else if (isActive && placement.startsWith("bottom")) {
      return `transform: translate(0, -16px);`;
    } else if (isActive && placement.startsWith("left")) {
      return `transform: translate(16px, 0);`;
    } else if (isActive && placement.startsWith("right")) {
      return `transform: translate(-16px, 0);`;
    }
  }}
`;
