import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import StepperHeader from "./StepperHeader";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";

import { setStep, setHotels, setHotelsDetails } from "./stepperSlice";
import Hotels from "../../api/services/Hotels";

import "./index.scss";

function Stepper({ children }) {
  const stepper = useSelector((state) => state.stepper.step);
  const dispatch = useDispatch();

  useEffect(() => {
    const formState = localStorage.getItem("formState");

    const fetchHotels = async () =>
      await Hotels.fetchAll().then((res) => dispatch(setHotels(res.data)));
    fetchHotels();

    const fetchDetails = async () => {
      await Hotels.fetchAllWithDetails().then((res) =>
        dispatch(setHotelsDetails(res.data))
      );
    };
    fetchDetails();

    const localStorageObj = JSON.parse(formState);
    if (localStorageObj) {
      dispatch(setStep(localStorageObj.step));
    }
  }, []);

  return (
    <div className="stepper">
      <StepperHeader step={stepper} />

      {stepper === 0 && <StepOne></StepOne>}
      {stepper === 1 && <StepTwo> </StepTwo>}
      {stepper === 2 && <StepThree> </StepThree>}
      {stepper === 3 && <div> Rezervasyon başarıyla oluşturuldu.</div>}
    </div>
  );
}

export default Stepper;
