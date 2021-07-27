import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export const Tooltip = React.forwardRef(({ children, ...props }, ref) => {
  const targetRef = useRef(null);

  const handleMouseEnter = () => console.log(getElementRect(targetRef.current));
  const handleMouseLeave = () => console.log(getElementRect(targetRef.current));

  const getElementRect = (el) => {
    return el.getBoundingClientRect();
  };

  useEffect(() => {
    console.log(getElementRect(targetRef.current), "render");
  }, []);

  return (
    <>
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: targetRef
      })}
      <Portal>
        <div className="tooltip">{props.content}</div>
      </Portal>
    </>
  );
});
