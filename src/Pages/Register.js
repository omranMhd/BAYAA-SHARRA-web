import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import MainAppBar from "../Components/MainAppBar";

import axiosInstance from "../Axios/axiosInstance";
import registerSchema from "../Validations Schema/register validation schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function Register() {
  //==================  Begin Hooks ====================//
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCode: "",
      country: "",
      city: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const { register, control, handleSubmit, formState, setValue, watch } = form;
  const { errors } = formState;
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

  console.log("selectedCountry :", selectedCountry);
  console.log("selectedCity :", selectedCity);

  //هنا قمت باعادة قيمة حقل المدينة الى الحالة الافتراضية بعد كل عملية تغيير البلد وذلك لاجبار المستخدم على اختيار المدينة من جديد
  useEffect(() => {
    setValue("city", "");
  }, [selectedCountry, setValue]);

  // This is to save the case where the user wants to enter an email or mobile number
  const [showEmailField, setShowEmailField] = useState(false);

  const [emailExist, setEmailExist] = useState(null);
  const [phoneExist, setPhoneExist] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const postRegisterMutation = useMutation(
    (data) => axiosInstance.post("/register", data),
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // save response data (user info and its token ) in local Storage
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);

        // after that go to verevication-code page
        navigate("/verevication-code");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // email or phone already been taken
        if (error.response.status === 422) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.message);
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.errors);
          if ("email" in error.response.data.errors) {
            setEmailExist(error.response.data.errors.email);
          } else if ("phone" in error.response.data.errors) {
            setPhoneExist(error.response.data.errors.phone);
          }
          // setEmailExist(error.response.data.message);
          // setPhoneExist(error.response.data.message);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
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

  console.log("country :", selectedCountry);
  console.log("cities :", citiesCorrespondingToTheSelectedCountry);

  const theme = useTheme();

  //==================  End Hooks ====================//

  //==================  Begin Defind methods and variables ====================//
  const onSubmit = (formData) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, formData);
    console.log("submitted dataaaaaaaaaaaa :", data);

    if (showEmailField) {
      delete data["phone"];
      delete data["phoneCode"];
    } else {
      delete data["email"];
      //combine phone code and phone together
      data.phone = `${data.phoneCode}${data.phone}`;
      delete data["phoneCode"];
    }

    data.address = {};
    data.address.country = data.country;
    data.address.city = data.city;
    delete data.country;
    delete data.city;
    // convert address object to string to store it in DB in this format
    data.address = JSON.stringify(data.address);

    console.log("newwwwwwwwwwwww submitted dataaaaaaaaaaaa :", data);
    postRegisterMutation.mutate(data);
  };

  const handleSwitchChange = () => {
    setShowEmailField((showEmailField) => !showEmailField);
  };

  //==================  End Defind methods and variables ====================//

  return (
    <>
      <MainAppBar />
      {/* this background page with image */}
      <Box
        id="a"
        sx={{
          height: "700px",
          // backgroundImage: "url(realEstates‬.jpg)", // Set the background image
          // backgroundImage: "url('hand shake.gif')", // Set the background image
          // backgroundImage: "url(https://source.unsplash.com/random?wallpapers)", // Set the background image
          backgroundImage: "url(slide3.jpg)", // Set the background image
          backgroundSize: "cover", // Cover the entire Box with the image
          backgroundPosition: "center", // Center the image within the Box
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
        }}
      >
        <Link to="/" variant="body2">
          <img
            src={"BAYAASHARRA.png"}
            alt="Login"
            style={{ width: "120px", height: "100px", marginBottom: "5px" }}
          />
        </Link>

        {/* <Typography component="h1" variant="h5">
          BAYYA SHARRA
        </Typography> */}
        <Box
          id="b"
          sx={{
            // width: "300px",
            // height: "300px",
            backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
            padding: "20px",
            borderRadius: "10px",
            // border: "2px solid",
            // borderColor: "blue",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", color: theme.palette.BLACK_or_WHITE }}
          >
            {t("Sign up")}
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
                  label={t("First Name")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={t(errors.firstName?.message)}
                />
                {JSON.stringify(errors.firstName?.message)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={t("Last Name")}
                  // name="lastName"
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={t(errors.lastName?.message)}
                />
              </Grid>
            </Grid>
            <div>
              <label>{t("Register by email")} :</label>
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
                  label={t("Email Address")}
                  name="email"
                  autoComplete="email"
                  size="small"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={t(errors.email?.message)}
                />
                {emailExist != null ? (
                  <small style={{ color: "red" }}>{emailExist}</small>
                ) : null}
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
                      label={t("code")}
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
                      label={t("phone number")}
                      name="phoneNumber"
                      size="small"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={t(errors.phone?.message)}
                    />
                    {phoneExist != null ? (
                      <small style={{ color: "red" }}>{phoneExist}</small>
                    ) : null}
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
                  label={t("Country")}
                  autoFocus
                  size="small"
                  margin="normal"
                  {...register("country")}
                  error={!!errors.country}
                  helperText={t(errors.country?.message)}
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
                  label={t("City")}
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...register("city")}
                  error={!!errors.city}
                  helperText={t(errors.city?.message)}
                >
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
              label={t("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              size="small"
              {...register("password")}
              error={!!errors.password}
              helperText={t(errors.password?.message)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={postRegisterMutation.isLoading}
            >
              {postRegisterMutation.isLoading ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                t("Sign up")
              )}
            </Button>
            {/* <LoadingButton
              size="small"
              // onClick={handleClick}
              loading={true}
              loadingIndicator="Loading…"
              variant="outlined"
            >
              <span>Fetch data</span>
            </LoadingButton> */}
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  <Box color={theme.palette.BLACK_or_WHITE}>
                    {t("Do you have an account? Sign In")}
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <DevTool control={control} />
      </Box>
    </>
  );
}
