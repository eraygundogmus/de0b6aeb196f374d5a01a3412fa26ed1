import React, { useEffect, useState } from "react";
import "./StepTwo.scss";
import { useSelector, useDispatch } from "react-redux";
import Bar from "../bar/Bar";
import SelectGrid from "../select-grid/SelectGrid";
import SelectCard from "../forms/primary/SelectCard/SelectCard";
import Button from "../button/Button";

import { stepTwoSchema } from "../../utils/stepTwoSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setStep } from "../stepper/stepperSlice";

function StepTwo() {
  const dispatch = useDispatch();

  const stepper = useSelector((state) => state.stepper);
  const [formData, setFormData] = useState({});
  const [selectedHotelDetails, setSelectedHotelDetails] = useState({});
  const [hotelName, setHotelName] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepTwoSchema),
  });
  const watchType = watch("room_type");
  const watchScenic = watch("room_scenic");

  const onSubmit = async (data) => {
    const formState = JSON.parse(localStorage.getItem("formState"));
    const payload = {
      room_type: data.room_type,
      room_scenic: data.room_scenic,
      hotel_name: hotelName,
      ...formState.payload,
    };
    const localStorageObj = { step: 2, payload };
    localStorage.setItem("formState", JSON.stringify(localStorageObj));
    dispatch(setStep(2));
  };

  useEffect(() => {
    const formState = JSON.parse(localStorage.getItem("formState"));
    setFormData(formState.payload);

    if (stepper.hotelsDetails.length & stepper.hotels.length) {
      const hotelName = stepper.hotels.filter(
        (i) => i.id == formState.payload.hotel_id
      )[0].hotel_name;
      setHotelName(hotelName);

      let selectedHotel = stepper.hotelsDetails.filter(
        (item) => item.hotel_id == formState.payload.hotel_id
      )[0];
      setSelectedHotelDetails(selectedHotel);

      setValue("room_type", "1");
      setValue("room_scenic", "1");
    }
  }, [stepper]);

  return (
    <div>
      <Bar
        hotelName={hotelName}
        formData={formData}
        selectedHotelDetails={selectedHotelDetails}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="form-step2">
        <SelectGrid title="Oda Seçimi">
          {selectedHotelDetails?.room_type?.map((el, index) => (
            <SelectCard
              index={index}
              onClickHandle={() => {
                setValue("room_type", (index + 1).toString());
              }}
              register={register}
              label="room_type"
              key={el.title + Math.random()}
              data={el}
              required
              active={watchType === (index + 1).toString() ? true : false}
            />
          ))}
        </SelectGrid>

        <SelectGrid title="Manzara Seçimi">
          {selectedHotelDetails?.room_scenic?.map((el, index) => (
            <SelectCard
              label="room_scenic"
              index={index}
              onClickHandle={() => {
                setValue("room_scenic", (index + 1).toString());
              }}
              register={register}
              key={el.title + index}
              data={el}
              required
              active={watchScenic === (index + 1).toString() ? true : false}
            />
          ))}
        </SelectGrid>

        <div className="step-2_buttons">
          <div
            onClick={() => {
              dispatch(setStep(0));
            }}
          >
            <Button theme="dark"> &#x2190; Önceki Adım </Button>
          </div>

          <div onClick={handleSubmit(onSubmit)}>
            <Button theme="dark"> Kaydet ve Devam et </Button>
          </div>
        </div>
        {/* Buttons */}
      </form>
    </div>
  );
}

export default StepTwo;
