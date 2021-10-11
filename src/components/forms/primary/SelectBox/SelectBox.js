import React from "react";
import "./SelectBox.scss";

function SelectBox({ optionsArr = [], label, required, register, error }) {
  return (
    <>
      <select className="select-box" {...register(label, { required })}>
        <option value="a">Rezervasyon yapmak istediğiniz otel seçiniz </option>
        {optionsArr.map((el) => (
          <option value={el.id * 1} key={el.id + el.hotel_name}>
            {el.hotel_name}
          </option>
        ))}
      </select>
      <p className="select-box-err"> {error}</p>
    </>
  );
}

export default SelectBox;
