import * as Yup from "yup";
import { VALIDATION_MESSAGES_USER } from "../../constants";

export const userValidationSchema = Yup.object({
  firstName: Yup.string()
    .required(VALIDATION_MESSAGES_USER.FIRST_NAME_REQUIRED)
    .min(2, VALIDATION_MESSAGES_USER.FIRST_NAME_MIN_LENGTH),
  lastName: Yup.string()
    .required(VALIDATION_MESSAGES_USER.LAST_NAME_REQUIRED)
    .min(2, VALIDATION_MESSAGES_USER.LAST_NAME_MIN_LENGTH),
  username: Yup.string()
    .required(VALIDATION_MESSAGES_USER.USERNAME_REQUIRED)
    .matches(/^[A-Za-z0-9_]+$/, VALIDATION_MESSAGES_USER),
  email: Yup.string()
    .email(VALIDATION_MESSAGES_USER.EMAIL_INVALID)
    .required(VALIDATION_MESSAGES_USER.EMAIL_REQUIRED),
  phone: Yup.string()
    .matches(/^05\d{8}$/, VALIDATION_MESSAGES_USER.PHONE_INVALID)
    .required(VALIDATION_MESSAGES_USER.PHONE_REQUIRED),
  password: Yup.string()
    .required(VALIDATION_MESSAGES_USER.PASSWORD_REQUIRED)
    .min(6, VALIDATION_MESSAGES_USER.PASSWORD_MIN_LENGTH),
});
