import { configureStore } from "@reduxjs/toolkit";
import stepperSlice from "../components/stepper/stepperSlice";

export default configureStore({
  reducer: {
    stepper: stepperSlice,
  },
});
