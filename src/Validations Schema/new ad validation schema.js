import * as yup from "yup";
let schema = {};
schema = yup.object({
  category: yup.string().required("field required"),
  subCategory: yup.string().required("field required"),
  country: yup.string().required("field required"),
  city: yup.string().required("field required"),
  title: yup.string().required("field required"),
  details: yup.string().required("field required"),
  phone1: yup.string().required("field required"),
  phoneCode1: yup.string().required("field required"),
});

export default schema;
