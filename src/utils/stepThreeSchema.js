import * as yup from "yup";
import valid from "card-validator";

export const stepThreeSchema = yup
  .object()
  .shape({
    card_number: yup
      .string()
      .test(
        "test-number",
        "Credit Card number is invalid",
        (value) => valid.number(value).isValid
      ),
    card_name: yup.string().required(),
    card_cvv: yup.number().required(),
  })
  .required();
