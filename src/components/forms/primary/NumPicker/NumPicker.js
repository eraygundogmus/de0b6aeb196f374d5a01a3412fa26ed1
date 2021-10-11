import React, { useState, useEffect } from "react";
import "./NumPicker.scss";

function NumPicker({
  children,
  limit = "4",
  nonable,
  label,
  required,
  register,
  child,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let arr = [];
    let arrStart = nonable ? 0 : 1;

    for (let i = arrStart; i <= limit; i++) {
      arr.push(i);
    }
    setOptions(arr);
  }, [limit]);

  return (
    <div className="num-picker">
      <label>
        {children} {child && "*Kabul edilmiyor."}
      </label>
      <select disabled={child} {...register(label, { required })}>
        {options.map((el) => (
          <option value={el} key={el + children + "options"}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NumPicker;
