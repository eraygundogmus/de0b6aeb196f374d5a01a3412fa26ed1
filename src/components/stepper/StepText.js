import React from "react";
import "./StepText.scss";
import cn from "classnames";

function StepText({ children, active }) {
  return <div className={cn("step-text", active && "active")}>{children}</div>;
}

export default StepText;
