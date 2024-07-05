import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axiosInstance from "../Axios/axiosInstance";
import registerSchema from "../Validations Schema/register validation schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function UserInfo() {
  const [showMainInfoForm, setShowMainInfoForm] = useState(false);
  const [showNewEmailField, setShowNewEmailField] = useState(false);
  const [newEmail, setnewEmail] = useState(null);
  const [verifyCode, setVerifyCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerificationIsDone, setEmailVerificationIsDone] = useState(false);
  const [thereIsAnError, setThereIsAnError] = useState(null);
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [country, setCountry] = useState(" ");
  const [city, setCity] = useState(" ");
  const [email, setEmail] = useState(" ");

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      // email: "",
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

  //   هنا قمت باعادة قيمة حقل المدينة الى الحالة الافتراضية بعد كل عملية تغيير البلد وذلك لاجبار المستخدم على اختيار المدينة من جديد
  useEffect(() => {
    setValue("city", "");
  }, [selectedCountry, setValue]);

  // const user = JSON.parse(localStorage.getItem("user"));

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
  const { data: userInfo, refetch: refetchUserInfo } = useQuery(
    "user-info",
    () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get(`/user-info/${user.id}`);
    },
    {
      onSuccess: (response) => {
        console.log("aaaaaaaaaaaaa :", response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setCountry(JSON.parse(response.data.address).country);
        setCity(JSON.parse(response.data.address).city);
        setEmail(response.data.email);
      },
      select: (data) => {
        return data.data;
      },
    }
  );

  console.log("userInfo :", userInfo?.data);

  const updateUserInfoMutation = useMutation(
    (data) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/update-user-info/${user.id}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        localStorage.setItem("user", JSON.stringify(response.data.data));
        // localStorage.setItem("token", response.data.data.token);
        setShowMainInfoForm(false);
        refetchUserInfo();

        // after that go to verevication-code page
        // navigate("/verevication-code");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // email or phone already been taken
        if (error.response.status === 422) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.message);
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.errors);
          if ("email" in error.response.data.errors) {
            // setEmailExist(error.response.data.errors.email);
          } else if ("phone" in error.response.data.errors) {
            // setPhoneExist(error.response.data.errors.phone);
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
  const updateUserEmailMutation = useMutation(
    (data) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/update-user-info/${user.id}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        localStorage.setItem("user", JSON.stringify(response.data.data));
        // localStorage.setItem("token", response.data.data.token);
        setShowNewEmailField(false);
        refetchUserInfo();

        // after that go to verevication-code page
        // navigate("/verevication-code");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        setThereIsAnError(error.response.data.message);

        // email or phone already been taken
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );
  const verifyNewEmailMutation = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/verify-email", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setEmailVerificationIsDone(true);
        // after that go to verevication-code page
        // navigate("/verevication-code");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error.response.data.message);
        setThereIsAnError(error.response.data.message);
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

    data.address = {};
    data.address.country = data.country;
    data.address.city = data.city;
    delete data.country;
    delete data.city;

    delete data.email;

    // convert address object to string to store it in DB in this format
    data.address = JSON.stringify(data.address);

    console.log("newwwwwwwwwwwww submitted dataaaaaaaaaaaa :", data);
    updateUserInfoMutation.mutate(data);
  };

  //==================  End Defind methods and variables ====================//

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={emailVerificationIsDone}
        autoHideDuration={5000}
        onClose={() => {
          setEmailVerificationIsDone(false);
        }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {t("Check your e-mail. The code has been sent to him.")}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={thereIsAnError != null}
        autoHideDuration={5000}
        onClose={() => {
          setThereIsAnError(null);
        }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {t(thereIsAnError)}
        </Alert>
      </Snackbar>
      <Box
        id="b"
        sx={{
          //   width: "1000px",
          // height: "300px",
          backgroundColor: theme.palette.WHITE_or_BLACK2,
          padding: "20px",
          //   borderRadius: "10px",
          // border: "2px solid",
          // borderColor: "blue",
        }}
      >
        {showMainInfoForm ? (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            {/* first and last name */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
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
                  // defaultValue="EUR"
                />
              </Grid>
            </Grid>

            {/* country and city */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
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
                    const isSelected =
                      country.country === "SYRIA" ? true : false;
                    // console.log("country in select :", country.country);

                    return (
                      <MenuItem
                        selected={isSelected}
                        key={country.country}
                        value={country.country}
                      >
                        {i18n.language === "en" && country.country}
                        {i18n.language === "ar" && country.country_ar}
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
                      <MenuItem key={city.en} value={city.en}>
                        {i18n.language === "en" && city.en}
                        {i18n.language === "ar" && city.ar}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
            {/* password */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
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
                    endAdornment: (
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={updateUserInfoMutation.isLoading}
            >
              {updateUserInfoMutation.isLoading ? (
                <CircularProgress size={25} style={{ color: "white" }} />
              ) : (
                t("Save")
              )}
            </Button>

            <Button
              // fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, mx: "5px" }}
              onClick={() => {
                setShowMainInfoForm(false);
              }}
            >
              {t("skip")}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            {/* first and last name */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
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
                  // value={userInfo?.data.firstName}
                  value={firstName}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="lastName"
                  label={t("Last Name")}
                  autoFocus
                  size="small"
                  margin="normal"
                  value={lastName}
                  readOnly
                />
              </Grid>
            </Grid>

            {/* country and city */}
            <Grid
              container
              spacing={2}
              sx={{
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"

                  fullWidth
                  id="lastName"
                  label={t("Country")}
                  autoFocus
                  size="small"
                  margin="normal"
                  // value={
                  //   userInfo?.data.address != undefined
                  //     ? JSON.parse(userInfo?.data.address).country
                  //     : ""
                  // }
                  value={country}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"

                  fullWidth
                  id="lastName"
                  label={t("City")}
                  autoFocus
                  size="small"
                  margin="normal"
                  // value={
                  //   userInfo?.data.address != undefined
                  //     ? JSON.parse(userInfo?.data.address).city
                  //     : ""
                  // }
                  value={city}
                  readOnly
                />
              </Grid>
            </Grid>

            <Button
              // fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setShowMainInfoForm(true);
              }}
            >
              {t("Updata Main Info")}
            </Button>
          </Box>
        )}

        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("Email Address")}
              name="email"
              autoComplete="email"
              size="small"
              value={email}
              // {...register("email")}
              // error={!!errors.email}
              // helperText={t(errors.email?.message)}
            />
          </Grid>
          {showNewEmailField && (
            <>
              <Grid item xs={12} sm={9}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("New Email Address")}
                  name="email"
                  autoComplete="email"
                  size="small"
                  value={newEmail}
                  onChange={(e) => {
                    setnewEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="verifyCode"
                  label={t("verification Code")}
                  name="verifyCode"
                  size="small"
                  value={verifyCode}
                  onChange={(e) => {
                    setVerifyCode(e.target.value);
                  }}
                />
              </Grid>

              <Button
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mx: 1 }}
                disabled={verifyNewEmailMutation.isLoading}
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user"));

                  // const data = new FormData();

                  // data.append("user_id", user.id);
                  // data.append("email", newEmail);
                  const data = {};
                  data.user_id = user.id;
                  data.email = newEmail;
                  console.log("new email data:", data);
                  verifyNewEmailMutation.mutate(data);
                }}
              >
                {verifyNewEmailMutation.isLoading ? (
                  <CircularProgress size={25} style={{ color: "white" }} />
                ) : (
                  t("verify email")
                )}
              </Button>
              <Button
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mx: 1 }}
                disabled={updateUserEmailMutation.isLoading}
                onClick={() => {
                  const user = JSON.parse(localStorage.getItem("user"));

                  // const data = new FormData();

                  // data.append("user_id", user.id);
                  // data.append("email", newEmail);
                  const data = {};
                  if (newEmail !== null && newEmail !== "") {
                    data.email = newEmail;
                  }
                  if (verifyCode !== "") {
                    data.verificationCode = verifyCode;
                  }
                  console.log("new email data:", data);
                  updateUserEmailMutation.mutate(data);
                }}
              >
                {updateUserEmailMutation.isLoading ? (
                  <CircularProgress size={25} style={{ color: "white" }} />
                ) : (
                  t("save email")
                )}
              </Button>
              <Button
                // fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, mx: 1 }}
                onClick={() => {
                  setShowNewEmailField(false);
                }}
              >
                {t("skip")}
              </Button>
            </>
          )}
        </Grid>
        {!showNewEmailField && (
          <Button
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setShowNewEmailField(true);
            }}
          >
            {t("Update Email")}
          </Button>
        )}
      </Box>
      <DevTool control={control} />
    </>
  );
}

export default UserInfo;
