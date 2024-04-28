import * as yup from "yup";

const schema = yup.object({
  firstName: yup
    .string()
    .required("first name is required ")
    .max(10, "Must be less than 10 characters"),

  lastName: yup
    .string()
    .required("last name is required ")
    .max(10, "Must be less than 10 characters"),

  email: yup
    .string()
    // .required("email is required")
    .email("invalid email format"),
  phone: yup.string() /*.required("phone is required")*/,

  // address: yup.object().shape({
  //   country: yup.string().required("country is required "),
  //   city: yup.string().required("city is required "),
  // }),
  country: yup.string().required("country is required "),
  city: yup.string().required("city is required "),

  password: yup
    .string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default schema;
