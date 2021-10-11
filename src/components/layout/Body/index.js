import React from "react";
import "./index.scss";

import { useSelector } from "react-redux";

import step1 from "../../../assets/step-1.jpg";
import step2 from "../../../assets/step-2.jpg";
import step3 from "../../../assets/step-3.jpg";

function Body({ children }) {
  const stepper = useSelector((state) => state.stepper.step);

  const steps = [step1, step2, step3];

  return (
    <div style={{ backgroundImage: `url(${steps[stepper]})` }} className="body">
      {children}
    </div>
  );
}

export default Body;
