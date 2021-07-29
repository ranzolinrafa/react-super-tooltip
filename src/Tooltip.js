import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

/**
 * Tooltip
 */
const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Tooltip = ({ children, ...props }) => {
  const { placement, isOpen } = props;

  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const positionRef = useRef({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActive(!!isOpen);
    } else {
      setActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    positionTooltip(targetRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (isOpen !== undefined) {
      return false;
    }

    let targetRect = targetRef.current.getBoundingClientRect();
    let tooltipRect = tooltipRef.current.getBoundingClientRect();
    console.log(targetRect);

    setActive(true);
    // console.log(getElementRect(targetRef.current));
  };
  const handleMouseLeave = () => {
    if (isOpen !== undefined) {
      return false;
    }

    setActive(false);

    // console.log(getElementRect(targetRef.current));
  };

  const getElementRect = (el) => {
    return el.getBoundingClientRect();
  };

  /**
   * - Position tooltip element based on target's position
   */
  const positionTooltip = (targetEl) => {
    let targetRect = targetRef.current.getBoundingClientRect();
    let tooltipRect = tooltipRef.current.getBoundingClientRect();
    console.log(targetRect);

    switch (placement) {
      case "top":
        positionRef.current.x =
          targetRect.x + (targetRect.width - tooltipRect.width) / 2;
        positionRef.current.y = targetRect.top - (tooltipRect.height + 16);
        break;
      case "left":
        positionRef.current.x = targetRect.left - tooltipRect.width;
        positionRef.current.y = targetRect.top - 25;
        break;
      default:
        positionRef.current.x =
          targetRect.x + (targetRect.width - tooltipRect.width) / 2;
        positionRef.current.y = targetRect.bottom + 16;
        break;
    }
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
  padding: 16px;
  z-index: 99999;

  position: absolute;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;

  ${(props) => {
    return "";
  }}

  ${(props) =>
    props.isActive
      ? `display: flex; transform: translateY(0);`
      : `opacity: 0; pointer-events: none; transform: translateY(16px);`}
`;
