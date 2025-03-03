import * as Yup from "yup";

export const cityValidationSchema = Yup.object({
  name: Yup.string()
    .required("City name is required")
    .min(3, "Name should have at least 3 characters.")
    .matches(/^[^\d]+$/, "Name must not contain numbers."),
});
