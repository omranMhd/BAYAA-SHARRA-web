import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import NavBar from "../Components/NavBar";

function Login() {
  const form = useForm({
    defaultValues: {
      email: "omran.mohamed996@gmail.com",
      password: 1212112121,
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted :", data);
  };
  return (
    <>
      <NavBar />
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[a-zA-Z0-9.!#]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
              message: "invalid email",
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <label>password</label>
        <input type="password" {...register("password")} />
        <button>submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default Login;
