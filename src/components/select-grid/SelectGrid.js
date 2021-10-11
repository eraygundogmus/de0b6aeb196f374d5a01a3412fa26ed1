import React from "react";
import "./SelectGrid.scss";

function SelectGrid({ title, children }) {
  return (
    <div className="select-grid-wrapper">
      <b>{title}</b>
      <div className="select-grid"> {children}</div>
    </div>
  );
}

export default SelectGrid;
