import React from "react";
import "./Bar.scss";

function Bar({ hotelName, formData, selectedHotelDetails }) {
  return (
    <div className="bar-grid">
      <div className="span-2">
        <b>{hotelName} </b> ({selectedHotelDetails.city})
      </div>

      <div>
        <b>Giriş Tarihi: </b> {formData.start_date}
      </div>
      <div>
        <b>Çıkış Tarihi: </b> {formData.end_date}
      </div>
      <div>
        <b> Yetişkin: </b> {formData.adult}
      </div>
      <div>
        <b> Çocuk: </b> {formData.child}
      </div>
    </div>
  );
}

export default Bar;
