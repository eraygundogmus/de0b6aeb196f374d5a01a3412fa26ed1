import * as yup from "yup";

export const stepOneSchema = yup
  .object()
  .shape({
    hotel_id: yup.number(),
    start_date: yup.date().required(),
    end_date: yup
      .date()
      .min(yup.ref("start_date"), "End date can not be before start date")
      .required(),
    adult: yup.number().positive().integer().required(),
  })
  .required();
