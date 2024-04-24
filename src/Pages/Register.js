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
import registerSchema from "../Validations Schema/register validation schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as types from "../Redux/actionTypes";
import NavBar from "../Components/NavBar";
import { useQuery } from "react-query";

const defaultTheme = createTheme();

const schema = registerSchema;

export default function Register() {
  //==================  Begin Hooks ====================//
  const navigate = useNavigate();

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
  const { register, control, handleSubmit, formState, setValue, watch } = form;
  const { errors } = formState;
  const selectedCountry = watch("address.country");

  // //هنا قمت باعادة قيمة حقل المدينة الى الحالة الافتراضية بعد كل عملية تغيير البلد وذلك لاجبار المستخدم على اختيار المدينة من جديد
  // useEffect(() => {
  //   setValue("address.city", "");
  // }, [selectedCountry, setValue]);

  // This is to save the case where the user wants to enter an email or mobile number
  const [showEmailField, setShowEmailField] = useState(false);

  const [emailExist, setEmailExist] = useState(null);
  const [phoneExist, setPhoneExist] = useState(null);

  //هنا ببساطة عندما نريد استخدام الأيميل بعملية التسجيل يجب ان نعيد قيمة الهاتف الى القيمة الابتدائية والعكس صحيح
  useEffect(() => {
    console.log("setShowEmailField :", Number(showEmailField));
    if (showEmailField) {
      setValue("phone", "");
    } else {
      setValue("email", "");
    }
  }, [showEmailField, setValue]);

  const { data: countriesInfo } = useQuery(
    "countries-info",
    () => {
      return axiosInstance.get("/countries-info");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );

  
  /*هنا نقوم باختيار فقط المدن التي تنتمي الى البلد المختار لاستخدامها ضمن الـ
  select
  الخاصة بالمدينة
  */
  const citiesCorrespondingToTheSelectedCountry = countriesInfo?.find(
    (country) => country.country === selectedCountry
  )?.cities;

  console.log("cities :", citiesCorrespondingToTheSelectedCountry);
  console.log("country :", selectedCountry);

  //   console.log("use query  isLoading:", isLoading);
  // console.log("use query result:", result.data?.data);

  // let countriesInfo = result.data?.data;

  // const [countriesInfo, setCountriesInfo] = useState([]);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/countries-info")
  //     .then((res) => {
  //       console.log("countries-infoooooooooooooooooooo :", res.data);

  //       setCountriesInfo(res.data);
  //     })
  //     .catch((e) => {
  //       console.log("dfdfdfdfdfddfd :", e);
  //     });
  // }, []);

  //==================  End Hooks ====================//

  //==================  Begin Defind methods and variables ====================//
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

        //save response data (user info and its token ) in local Storage
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", res.data.data.token);

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

  const handleSwitchChange = () => {
    setShowEmailField((showEmailField) => !showEmailField);
  };

  //==================  End Defind methods and variables ====================//

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
                      <TextField
                        margin="normal"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        select
                        label="Code"
                        size="small"
                        fullWidth
                        // value={age}
                        // label="Age"
                        // onChange={handleChange}
                        {...register("phoneCode")}
                      >
                        {countriesInfo?.map((country) => {
                          return (
                            <MenuItem value={country.phoneCode}>
                              {country.phoneCode}
                            </MenuItem>
                          );
                        })}
                      </TextField>
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
                    {countriesInfo?.map((country) => {
                      return (
                        <MenuItem key={country.country} value={country.country}>
                          {country.country}
                        </MenuItem>
                      );
                    })}
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
                    // disabled={
                    //   selectedCountry === undefined || selectedCountry === ""
                    // }
                  >
                    {/* {cities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}

                    {/* {countriesInfo
                      .filter((country) => country.country === selectedCountry)
                      .cities?.map((city) => {
                        return (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        );
                      })} */}
                    {citiesCorrespondingToTheSelectedCountry?.map((city) => {
                      return (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      );
                    })}
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
