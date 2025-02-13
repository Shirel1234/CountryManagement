import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First name must have at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last name must have at least 2 characters"),
  username: Yup.string()
    .required("Username is required")
    .matches(
      /^[A-Za-z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^05\d{8}$/, "Invalid phone number")
    .required("Phone is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
});
