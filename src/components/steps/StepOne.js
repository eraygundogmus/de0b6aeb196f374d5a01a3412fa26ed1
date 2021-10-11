import React, { useEffect } from "react";
import DatePicker from "../forms/primary/DatePicker/DatePicker";
import NumPicker from "../forms/primary/NumPicker/NumPicker";
import SelectBox from "../forms/primary/SelectBox/SelectBox";
import "./StepOne.scss";
import Button from "../button/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepOneSchema } from "../../utils/stepOneSchema";

import { useSelector, useDispatch } from "react-redux";
import { setStep } from "../stepper/stepperSlice";
import dayjs from "dayjs";

function StepOne() {
  const dispatch = useDispatch();
  const stepper = useSelector((state) => state.stepper);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stepOneSchema),
  });

  useEffect(() => {
    const formState = localStorage.getItem("formState");
    if (formState) {
      const localStorageObj = JSON.parse(formState);
      setValue("hotel_id", localStorageObj.payload.hotel_id);
      setValue("start_date", localStorageObj.payload.start_date);
      setValue("end_date", localStorageObj.payload.end_date);
      setValue("adult", localStorageObj.payload.adult);
      setValue("child", localStorageObj.payload.child);
    }
  }, [stepper.hotels]);

  const onSubmit = async (data) => {
    const payload = {
      hotel_id: data.hotel_id,
      start_date: dayjs(Date.parse(data.start_date)).format("YYYY-MM-DD"),
      end_date: dayjs(Date.parse(data.end_date)).format("YYYY-MM-DD"),
      adult: data.adult,
      child: data.child ? data.child : 0,
    };
    let localStorageObj = { step: 1, payload };
    localStorage.setItem("formState", JSON.stringify(localStorageObj));
    dispatch(setStep(1));
  };

  const watchHotelId = watch("hotel_id");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectBox
          label="hotel_id"
          error={errors.hotel_id?.message}
          register={register}
          required
          optionsArr={stepper.hotels}
        />
        <div className="step1-grid">
          <DatePicker
            error={errors.start_date?.message}
            label="start_date"
            register={register}
            required
          >
            Giriş Tarihi
          </DatePicker>

          <DatePicker
            error={errors.end_date?.message}
            label="end_date"
            register={register}
            required
          >
            Çıkış Tarihi
          </DatePicker>

          <NumPicker
            label="adult"
            limit={stepper.hotelsDetails[watchHotelId]?.max_adult_size}
            register={register}
            required
          >
            Yetişkin Sayısı
          </NumPicker>

          <NumPicker
            nonable
            limit="5"
            label="child"
            register={register}
            child={stepper.hotelsDetails[watchHotelId]?.child_status}
          >
            Çocuk Sayısı
          </NumPicker>
          <div onClick={handleSubmit(onSubmit)} className="btn-wrapper">
            <Button>Sonraki Adım</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StepOne;
