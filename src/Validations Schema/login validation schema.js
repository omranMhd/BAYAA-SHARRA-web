import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    // .required("email is required")
    .email("invalid email format"),

  phone: yup.string() /*.required("phone is required")*/,

  password: yup
    .string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default schema;
