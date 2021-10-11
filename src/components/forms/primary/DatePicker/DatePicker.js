import React from "react";
import "./DatePicker.scss";
import minDate from "../../../../utils/today";

function DatePicker({ children, register, required, label, error }) {
  return (
    <div className="date-picker">
      <label>{children}</label>
      <input
        type="date"
        min={minDate}
        {...register(label, { required })}
      ></input>
      <p className="date-picker_err"> {error}</p>
    </div>
  );
}

export default DatePicker;
