import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import {
  Button,
  TextField,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import axiosInstance from "../Axios/axiosInstance";
import Alert from "@mui/material/Alert";
import { useNavigate, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as types from "../Redux/actionTypes";

const schema = yup.object({
  email: yup
    .string()
    .required("email is required")
    .email("invalid email format"),

  phone: yup.string() /*.required("phone is required")*/,

  password: yup
    .string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function SignIn() {
  // This is to save the case where the user wants to enter an email or mobile number
  const [showEmailField, setShowEmailField] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("submitted data :", data);

    axiosInstance
      .post("/login", data)
      .then((res) => {
        console.log("resssssssssssssssssss :", res);
        console.log("resssssssssssssssssss :", res.data.data.user);
        console.log("resssssssssssssssssss :", res.data.data.token);
        console.log("resssssssssssssssssss :", res.status);

        // ===================== to delete ====================
        // //save response data in global state
        // dispatch({
        //   type: types.SAVE_USER_INFO_AND_TOKEN,
        //   payload: res.data.data,
        // });

        //save response data (user info and its token ) in local Storage
        localStorage.setItem("user", res.data.data.user);
        localStorage.setItem("token", res.data.data.token);

        // after that go to verevication-code page
        navigate("/");
      })
      .catch((e) => {
        console.log("errrrrrrrrrrrrrrr e.response :", e.response);
        console.log("errrrrrrrrrrrrrrr :", e.response.status);

        // if account is unverified
        if (e.response.status === 423) {
          // =====================to delete===============================================
          // //save response data in global state  to use it by user to verify his account
          // dispatch({
          //   type: types.SAVE_USER_INFO_AND_TOKEN,
          //   payload: e.response.data.data,
          // });

          //save response data (user info and its token ) in local Storage to use it by user to verify his account
          localStorage.setItem("user", e.response.data.data.user);
          localStorage.setItem("token", e.response.data.data.token);

          // Then Go To Verevication Code
          navigate("/verevication-code");
        }
        // if credentials is Invalid (email-phone or password)
        if (
          e.response.status === 401 &&
          e.response.data.message === "Invalid credentials"
        ) {
          setInvalidCredentials(true);
          setTimeout(() => {
            setInvalidCredentials(false);
          }, 5000);
        }
      });
  };

  useEffect(() => {
    console.log("setShowEmailField :", Number(showEmailField));
    if (showEmailField) {
      setValue("phone", "");
    } else {
      setValue("email", "");
    }
  }, [showEmailField, setValue]);

  const handleSwitchChange = () => {
    setShowEmailField((showEmailField) => !showEmailField);
  };

  return (
    <Container component="main" maxWidth="xs">
      <NavBar />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
        {invalidCredentials && (
          <Alert severity="error">invalidCredentials</Alert>
        )}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <div>
            <label>Login By Email :</label>
            <Switch
              checked={showEmailField}
              onChange={handleSwitchChange}
              color="primary"
              size="small"
            />
          </div>
          {showEmailField ? (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              size="small"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="phone number"
              name="phoneNumber"
              size="small"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <DevTool control={control} />
        </Box>
      </Box>
    </Container>
  );
}
