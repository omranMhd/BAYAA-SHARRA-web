import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import MainAppBar from "../Components/MainAppBar";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import newAdSchema from "../Validations Schema/new ad validation schema";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function NewAd() {
  const [subCategories, setSubCategories] = useState(null);
  const [selectedPhotoes, setselectedPhotoes] = useState(
    Array.from({ length: 6 })
  );
  const navigate = useNavigate();
  const theme = useTheme();

  const form = useForm({
    defaultValues: {
      category: "",
      subCategory: "",
      sellOrRent: "sell",
      locationLongitude: "32.22323", //خط الطول
      locationLatitude: "32.22323", //خط العرض
      country: "",
      city: "",
      title: "",
      details: "",
      area: "",
      floor: "",
      roomCount: "",
      cladding: "",
      paymentMethodRent:"",
      price:"",
      currency:"",
      photoes: [],
      phone1: "",
      phoneCode1: "",
      contactName1: "",
      phone2: "",
      phoneCode2: "",
      contactName2: "",
    },
    resolver: yupResolver(newAdSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    trigger,
  } = form;
  const { errors } = formState;
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

  //watch all values of form
  console.log("sssssssssssss", watch());

  const { data: mainCategoriesResponse } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );
  console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,", mainCategoriesResponse?.data);

  const getSubCategoriesByIdMutation = useMutation(
    (id) => axiosInstance.get(`/sub-categories/${id}`),
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("aaaaaaaaaaaaaaaaaaaaaa :", response.data.data);
        setSubCategories(response.data.data);
      },
      onError: (error) => {
        // Handle any errors here
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

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

  console.log("country :", selectedCountry);
  console.log("cities :", citiesCorrespondingToTheSelectedCountry);

  const handleFileChange = (event, index) => {
    const newselectedPhotoesArray = [...selectedPhotoes];
    newselectedPhotoesArray[index] = event.target.files[0];
    setselectedPhotoes(newselectedPhotoesArray);
  };

  const handleIconClick = (input_id) => {
    // Trigger the file input click event
    document.getElementById(input_id).click();
  };

  const onSubmit = (formData) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, formData);
    data.photoes = selectedPhotoes;
    console.log("data :", data);
  };
  console.log("selected Files :", selectedPhotoes);

  return (
    <Box sx={{ backgroundColor: "#e9eff7" }}>
      <MainAppBar />
      {/* <Box
        sx={{
          width: "75%",
          border: "1px solid black",
          // boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
          borderRadius: "20px",
          margin: "auto",
          marginTop: "20px",
          padding: "15px",
          // direction: "rtl",
        }}
      > */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          // backgroundColor: "red",
          width: "75%",
          margin: "auto",
        }}
      >
        {/* first Box */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
            backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            {/* category */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                select
                required
                fullWidth
                id="category"
                label="category"
                size="small"
                margin="normal"
                {...register("category")}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {mainCategoriesResponse?.data.map((category) => {
                  return (
                    <MenuItem
                      key={category.id}
                      value={category.name}
                      onClick={() => {
                        // alert(category.id);
                        getSubCategoriesByIdMutation.mutate(category.id);
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            {/* Sub Category */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                id="Sub Category"
                label="Sub Category"
                autoComplete="family-name"
                size="small"
                margin="normal"
                {...register("subCategory")}
                error={!!errors.subCategory}
                helperText={errors.subCategory?.message}
              >
                {subCategories?.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
          </Grid>
          {/* sell or rent for realEstate and vehicles only */}
          {(watch("category") === "RealEstates" ||
            watch("category") === "vehicles") && (
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={watch("sellOrRent")}
                // onChange={handleChange}
                size="small"
              >
                <FormControlLabel
                  {...register("sellOrRent")}
                  value="sell"
                  control={<Radio />}
                  label="sell"
                />
                <FormControlLabel
                  {...register("sellOrRent")}
                  value="rent"
                  control={<Radio />}
                  label="rent"
                />
              </RadioGroup>
            </FormControl>
          )}
          {watch("category") === "RealEstates" && (
            <>
              <Typography>Choose Location using google map</Typography>
              <Typography>Choose Location using google map</Typography>
              <Typography>Choose Location using google map</Typography>
            </>
          )}

          <Grid container spacing={2}>
            {/*Country  */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="country"
                // label={t("Country")}
                label="Country"
                size="small"
                margin="normal"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
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
            {/* City */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                id="city"
                // label={t("City")}
                label="City"
                autoComplete="family-name"
                size="small"
                margin="normal"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
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

          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="Title"
                // label={t("City")}
                label="Title"
                autoComplete="family-name"
                size="small"
                margin="normal"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            {/* Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Details"
                required
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("details")}
                error={!!errors.details}
                helperText={errors.details?.message}
              />
            </Grid>
          </Grid>
        </Box>
        {/* Real estate attributes */}
        {watch("category") === "RealEstates" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" component="h2">
              Real estate attributes
            </Typography>
            {/* Apartment */}
            {watch("subCategory") === "Apartment" && (
              <Box>
                <Typography>Apartment</Typography>
                <Grid container spacing={2}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="area"
                      label="area"
                      size="small"
                      margin="normal"
                      {...register("area")}
                      error={!!errors.area}
                      helperText={errors.area?.message}
                    />
                  </Grid>
                  {/* floor */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="floor"
                      label="floor"
                      size="small"
                      margin="normal"
                      {...register("floor")}
                      error={!!errors.floor}
                      helperText={errors.floor?.message}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* roomCount */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="roomCount"
                      label="room count"
                      size="small"
                      margin="normal"
                      {...register("roomCount")}
                      error={!!errors.roomCount}
                      helperText={errors.roomCount?.message}
                    />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="cladding"
                      label="cladding"
                      size="small"
                      margin="normal"
                      {...register("cladding")}
                      error={!!errors.cladding}
                      helperText={errors.cladding?.message}
                    >
                      <MenuItem value={"deluxe"}>deluxe</MenuItem>
                      <MenuItem value={"new"}>new</MenuItem>
                      <MenuItem value={"good"}>good</MenuItem>
                      <MenuItem value={"old"}>old</MenuItem>
                      <MenuItem value={"chassis"}>chassis</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      autoComplete="given-name"
                      fullWidth
                      id="price"
                      label="price"
                      size="small"
                      margin="normal"
                      {...register("price")}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      select
                      autoComplete="given-name"
                      fullWidth
                      id="currency"
                      label="currency"
                      size="small"
                      margin="normal"
                      {...register("currency")}
                      error={!!errors.currency}
                      helperText={errors.currency?.message}
                    >
                      <MenuItem value={"USD"}>
                        this data should come from server
                      </MenuItem>
                      <MenuItem value={"EU"}>
                        this data should come from server
                      </MenuItem>
                      <MenuItem value={"SP"}>
                        this data should come from server
                      </MenuItem>
                      <MenuItem value={"RS"}>
                        this data should come from server
                      </MenuItem>
                      <MenuItem value={"EG"}>
                        this data should come from server
                      </MenuItem>
                    </TextField>
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="paymentMethodRent"
                        label="payment Method Rent"
                        size="small"
                        margin="normal"
                        {...register("paymentMethodRent")}
                        error={!!errors.paymentMethodRent}
                        helperText={errors.paymentMethodRent?.message}
                      >
                        <MenuItem value={"daily"}>daily</MenuItem>
                        <MenuItem value={"weekly"}>weekly</MenuItem>
                        <MenuItem value={"monthly"}>monthly</MenuItem>
                        <MenuItem value={"yearly"}>yearly</MenuItem>
                      </TextField>
                    </Grid>
                  )}
                </Grid>
                <Grid container spacing={2}>
                  {/* molkia */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      fullWidth
                      id="molkia"
                      label="molkia"
                      size="small"
                      margin="normal"
                      {...register("molkia")}
                      error={!!errors.roomCount}
                      helperText={errors.roomCount?.message}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            {/* Farm */}
            {watch("subCategory") === "Farm" && (
              <Box>
                <Typography>Farm</Typography>
              </Box>
            )}
            {/* Land */}
            {watch("subCategory") === "Land" && (
              <Box>
                <Typography>Land</Typography>
              </Box>
            )}
            {/* Commercial store */}
            {watch("subCategory") === "Commercial store" && (
              <Box>
                <Typography>Commercial store</Typography>
              </Box>
            )}
            {/* Office */}
            {watch("subCategory") === "Office" && (
              <Box>
                <Typography>Office</Typography>
              </Box>
            )}
            {/* Chalet */}
            {watch("subCategory") === "Chalet" && (
              <Box>
                <Typography>Chalet</Typography>
              </Box>
            )}
            {/* Villa */}
            {watch("subCategory") === "Villa" && (
              <Box>
                <Typography>Villa</Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Vehicle attributes */}
        {watch("category") === "vehicles" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" component="h2">
              Vehicle attributes
            </Typography>
          </Box>
        )}

        {/* Clothes attributes */}
        {watch("category") === "Clothing and fashion" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" component="h2">
              Clothes attributes
            </Typography>
          </Box>
        )}

        {/* furniture attributes */}
        {watch("category") === "Furniture" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" component="h2">
              furniture attributes
            </Typography>
          </Box>
        )}

        {/* Electrical Electronic Devices attributes */}
        {watch("category") === "Electrical Electronic Devices" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
              backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6" component="h2">
              Electrical Electronic Devices attributes
            </Typography>
          </Box>
        )}

        {/* Images */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
            backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography>Images</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => {
              return (
                <Box>
                  <TextField
                    id={`file_input_${n}`}
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(event) => handleFileChange(event, n)}
                    //  {...register(`photoes[${n}]`)}
                  />
                  {/* <input
                            id={`file_input_${n}`}
                            type="file"
                            style={{ display: "none" }}
                            onChange={(event) => handleFileChange(event, n)}
                            // {...register(`photoes[${n}]`)}
                          /> */}
                  {selectedPhotoes[n] === undefined && (
                    <IconButton
                      color="primary"
                      // component="span"
                      sx={{
                        border: "1px solid blue",
                        width: "250px",
                        height: "250px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        handleIconClick(`file_input_${n}`);
                      }}
                    >
                      <AddAPhotoIcon />
                    </IconButton>
                  )}

                  {selectedPhotoes[n] !== undefined && (
                    <Box
                      sx={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(selectedPhotoes[n])}
                        alt="Selected"
                        style={{
                          width: "250px",
                          hight: "250px",
                        }}
                        objectFit="cover"
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          // backgroundColor:"orange"
                        }}
                        color="warning"
                        onClick={() => {
                          const newselectedPhotoesArray = [...selectedPhotoes];

                          newselectedPhotoesArray[n] = undefined;
                          setselectedPhotoes(newselectedPhotoesArray);
                        }}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
        {/* Contact Information */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow: "10px 10px 10px 0px rgba(100, 100, 100, 0.50)",
            backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography>Contact Information</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <TextField
                margin="normal"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // label={t("code")}
                label="name"
                size="small"
                fullWidth
                // value={age}
                // label="Age"
                // onChange={handleChange}
                {...register("contactName1")}
                error={!!errors.contactName1}
                helperText={errors.contactName1?.message}
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
            <Grid item xs={12} sm={2}>
              <TextField
                margin="normal"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                select
                // label={t("code")}
                label="code"
                size="small"
                fullWidth
                // value={age}
                // label="Age"
                // onChange={handleChange}
                {...register("phoneCode1")}
                error={!!errors.phoneCode1}
                helperText={errors.phoneCode1?.message}
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
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                // label={t("phone number")}
                label="phone number"
                name="phoneNumber"
                size="small"
                {...register("phone1")}
                error={!!errors.phone1}
                helperText={errors.phone1?.message}
              />
              {/* {phoneExist != null ? (
                        <small style={{ color: "red" }}>{phoneExist}</small>
                      ) : null} */}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <TextField
                margin="normal"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // label={t("code")}
                label="name"
                size="small"
                fullWidth
                // value={age}
                // label="Age"
                // onChange={handleChange}
                {...register("contactName2")}
                error={!!errors.contactName2}
                helperText={errors.contactName2?.message}
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
            <Grid item xs={12} sm={2}>
              <TextField
                margin="normal"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                select
                // label={t("code")}
                label="code"
                size="small"
                fullWidth
                // value={age}
                // label="Age"
                // onChange={handleChange}
                {...register("phoneCode2")}
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
            <Grid item xs={12} sm={4}>
              <TextField
                margin="normal"
                fullWidth
                id="phoneNumber"
                // label={t("phone number")}
                label="phone number"
                name="phoneNumber"
                size="small"
                {...register("phone2")}
                // error={!!errors.phone}
                // helperText={errors.phone?.message}
              />
              {/* {phoneExist != null ? (
                        <small style={{ color: "red" }}>{phoneExist}</small>
                      ) : null} */}
            </Grid>
          </Grid>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          // disabled={postLoginMutation.isLoading}
        >
          create Ad
          {/* {postLoginMutation.isLoading ? (
                      <CircularProgress size={25} style={{ color: "white" }} />
                    ) : (
                      // t("Sign in")
                      "create Ad"
                    )} */}
        </Button>
        <Button
          type="submit"
          variant="outlined"
          sx={{ mt: 3, mb: 2, ml: 2 }}
          // disabled={postLoginMutation.isLoading}
          onClick={() => {
            navigate("/");
          }}
        >
          Skip
        </Button>
      </Box>

      <DevTool control={control} />
    </Box>
  );
}

export default NewAd;
