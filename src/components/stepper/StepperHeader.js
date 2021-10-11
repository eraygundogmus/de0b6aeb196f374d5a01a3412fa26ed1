import React from "react";
import "./StepperHeader.scss";

import Hotel from "../svg/Hotel";
import Room from "../svg/Room";
import Payment from "../svg/Payment";

import StepText from "./StepText";

function StepperHeader({ step }) {
  return (
    <div className="stepper-header background">
      <div className="step">
        <Hotel opacity={step === 0 ? "1" : "0.5"} />
        <StepText active={step === 0}> Otel ve Tarih</StepText>
      </div>
      <div className="step">
        <Room opacity={step === 1 ? "1" : "0.5"} />
        <StepText active={step === 1}> oda ve manzara</StepText>
      </div>
      <div className="step">
        <Payment opacity={step === 2 ? "1" : "0.5"} />
        <StepText active={step === 2}> ödeme</StepText>
      </div>
    </div>
  );
}

export default StepperHeader;
