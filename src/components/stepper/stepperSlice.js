import { createSlice } from "@reduxjs/toolkit";

export const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    step: 0,
    hotels: [],
    hotelsDetails: [],
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setHotelsDetails: (state, action) => {
      state.hotelsDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStep, setHotels, setHotelsDetails } = stepperSlice.actions;
export default stepperSlice.reducer;
