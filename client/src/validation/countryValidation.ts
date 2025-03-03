import * as Yup from "yup";

export const countryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Country name is required")
    .min(3, "Name should have at least 3 characters.")
    .matches(/^[^\d]+$/, "Name must not contain numbers."),
  flag: Yup.string()
    .required("Flag is required")
    .matches(
      /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i,
      "Flag should be a valid image URL (jpg, jpeg, png, gif)."
    ),
  population: Yup.number()
    .required("Population is required")
    .min(0, "Population cannot be a negative number"),
  region: Yup.string()
    .required("Region is required")
    .matches(/^[^\d]+$/, "Region must not contain numbers."),
  cities: Yup.array()
    .of(
      Yup.object({
        _id: Yup.string().required("City ID is required"),
        name: Yup.string()
          .required("City name is required")
          .matches(/^[^\d]+$/, "City name must not contain numbers."),
      })
    )
    .default([]),
});
