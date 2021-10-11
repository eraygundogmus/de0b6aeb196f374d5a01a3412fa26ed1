import * as yup from "yup";

export const stepTwoSchema = yup
  .object()
  .shape({
    room_type: yup.number().positive().required(),
    room_scenic: yup.number().positive().required(),
  })
  .required();
