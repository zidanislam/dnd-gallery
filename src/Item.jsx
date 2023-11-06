import React, { forwardRef, useState } from "react";

const Item = forwardRef(function Item(
  { id, image, index, withOpacity, isDragging, style, ...props },
  ref
) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const inlineStyles = {
    opacity: withOpacity ? "0.5" : "1",
    transformOrigin: "0% 0%",
    border: "2px solid lightgrey",
    height: "200px",
    borderRadius: "5px",
    cursor: isDragging ? "grabbing" : "grab",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    backgroundImage: image ? `url(${image.src})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    ...style,
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: isChecked ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
    display: isHovered || isChecked ? "block" : "none",
  };

  const checkboxStyles = {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: isHovered || isChecked ? "block" : "none",
    zIndex: 99
  };

  return (
    <div
      style={inlineStyles}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div style={overlayStyles} onClick={toggleCheckbox}></div>
      <input
        type="checkbox"
        style={checkboxStyles}
        checked={isChecked}
        onChange={toggleCheckbox}
      />
    </div>
  );
});

Item.displayName = "Item";

export default Item;


