import React from "react";
import "./SelectCard.scss";
import cn from "classnames";

function SelectCard({
  data,
  active,
  label,
  required,
  register,
  index,
  onClickHandle,
}) {
  const { photo, title } = data;
  return (
    <div className="select-card-wrapper">
      <div
        onClick={onClickHandle}
        className={cn("select-card", active && "select-card-active")}
      >
        <img alt={title} src={photo} />
        <div className="select-card-info"> {title} </div>
      </div>
      <div className={cn("price", active && "price_active")}>
        {data?.price} {data?.price && "TL"} {data?.price_rate}{" "}
        {data?.price_rate && "%"}
      </div>

      <input
        value={index + 1}
        type="radio"
        name={label}
        {...register(label, { required })}
      />
    </div>
  );
}

export default SelectCard;
