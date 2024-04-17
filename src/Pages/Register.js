import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import axiosInstance from "../Axios/axiosInstance";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../Redux/actionTypes";
import NavBar from "../Components/NavBar";

const defaultTheme = createTheme();

const countries = [
  {
    value: "Syria",
    label: "SYRIA",
  },
  {
    value: "iraq",
    label: "IRAQ",
  },
  {
    value: "jordan",
    label: "JORDAN",
  },
  {
    value: "egypt",
    label: "EGYPT",
  },
];
const cities = [
  {
    value: "Damascus",
    label: "Damascus",
  },
  {
    value: "Aleppo",
    label: "Aleppo",
  },
  {
    value: "Homs",
    label: "Homs",
  },
  {
    value: "Daraa",
    label: "Daraa",
  },
];
const phoneCodes = [
  {
    value: "00963",
    label: "+963",
  },
  {
    value: "00962",
    label: "+962",
  },
  {
    value: "00964",
    label: "+964",
  },
  {
    value: "0020",
    label: "+20",
  },
  {
    value: "00966",
    label: "+966",
  },
];

const schema = yup.object({
  firstName: yup
    .string()
    .required("first name is required ")
    .max(10, "First name cannot be longer than 10 characters"),

  lastName: yup
    .string()
    .required("last name is required ")
    .max(10, "last name cannot be longer than 10 characters"),

  email: yup.string(),
  // .required("email is required")
  // .email("invalid email format")
  phone: yup.string() /*.required("phone is required")*/,

  address: yup.object().shape({
    country: yup.string().required("country is required "),
    city: yup.string().required("city is required "),
  }),

  password: yup
    .string()
    .required("password is required")
    .min(8, "Password must be at least 8 characters"),
});

///////////////////////

// TODO remove, this demo shouldn't need to reset the theme.

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCode: "",
      address: {
        country: "",
        city: "",
      },
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("submitted dataaaaaaaaaaaa :", data);

    if (showEmailField) {
      delete data["phone"];
    } else {
      delete data["email"];
      //combine phone code and phone together
      data.phone = `${data.phoneCode}${data.phone}`;
      delete data.phoneCode;
    }

    // convert address object to string to store it in DB in this format
    data.address = JSON.stringify(data.address);

    console.log("newwwwwwwwwwwww submitted dataaaaaaaaaaaa :", data);
    axiosInstance
      .post("/register", data)
      .then((res) => {
        console.log("resssssssssssssssssss :", res);
        console.log("resssssssssssssssssss :", res.data.data.user);
        console.log("resssssssssssssssssss :", res.data.data.token);
        //save response data in global state management
        dispatch({
          type: types.SAVE_USER_INFO_AND_TOKEN,
          payload: res.data.data,
        });

        // after that go to verevication-code page
        navigate("/verevication-code");
      })
      .catch((e) => {
        console.log("errrrrrrrrrrrrrrr :", e);

        // if email or phone exist in table
        if (e.response.status === 422) {
          console.log("e.response.data.errors :", e.response.data.errors);
          if (showEmailField) {
            setEmailExist(e.response.data.errors.email[0]);
            setTimeout(() => {
              setEmailExist(null);
            }, 5000);
          } else {
            setPhoneExist(e.response.data.errors.phone[0]);
          }
        }
      });
  };

  // This is to save the case where the user wants to enter an email or mobile number
  const [showEmailField, setShowEmailField] = useState(false);
  const [emailExist, setEmailExist] = useState(null);
  const [phoneExist, setPhoneExist] = useState(null);

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
    <ThemeProvider theme={defaultTheme}>
      <NavBar />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            // "url(/logo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link to="/">
              <Avatar
                alt="Remy Sharp"
                src="/logo.png"
                sx={{ width: 100, height: 100 }}
                variant="square"
              />
            </Link>
            <Typography component="h1" variant="h5">
              BAYAA SHARRA
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    // name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    size="small"
                    margin="normal"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    // name="lastName"
                    autoComplete="family-name"
                    size="small"
                    margin="normal"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
              </Grid>
              <div>
                <label>Register By Email :</label>
                <Switch
                  checked={showEmailField}
                  onChange={handleSwitchChange}
                  color="primary"
                  size="small"
                />
              </div>
              {showEmailField ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    size="small"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  {emailExist != null ? <small>{emailExist}</small> : null}
                </>
              ) : (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small" margin="normal">
                        <InputLabel id="demo-simple-select-label">
                          Code
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          // label="Age"
                          // onChange={handleChange}
                          {...register("phoneCode")}
                        >
                          {phoneCodes.map((code) => {
                            return (
                              <MenuItem value={code.value}>
                                {code.label}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={9}>
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
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={""}
                      label="Age"
                      onChange={"handleChange"}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl> */}
                  <TextField
                    select
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    autoFocus
                    size="small"
                    margin="normal"
                    {...register("address.country")}
                    error={!!errors.address?.country}
                    helperText={errors.address?.country?.message}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    required
                    fullWidth
                    id="city"
                    label="city"
                    autoComplete="family-name"
                    size="small"
                    margin="normal"
                    {...register("address.city")}
                    error={!!errors.address?.city}
                    helperText={errors.address?.city?.message}
                  >
                    {cities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Do you have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <DevTool control={control} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
