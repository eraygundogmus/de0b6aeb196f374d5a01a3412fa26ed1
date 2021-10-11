import React from "react";
import "./Button.scss";
import cn from "classnames";

function Button({ children, theme = "white", type }) {
  return (
    <div type={type} className={cn("btn", theme === "dark" ? "dark" : "white")}>
      {children}
    </div>
  );
}

export default Button;
