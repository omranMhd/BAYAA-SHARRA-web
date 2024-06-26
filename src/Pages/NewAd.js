import React, { useState } from "react";
import _ from "lodash";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { convertNewAdData } from "../Helpers/formatNewAdDataform";
import MainAppBar from "../Components/MainAppBar";
import PriceNumberField from "../Components/Inputs Fields Components/PriceNumberField";
import CurrencyTextFieldSelect from "../Components/Inputs Fields Components/CurrencyTextFieldSelect";
import CladdingTextFieldSelect from "../Components/Inputs Fields Components/CladdingTextFieldSelect";
import PaymentMethodTextFieldSelect from "../Components/Inputs Fields Components/PaymentMethodTextFieldSelect";
import AreaNumberField from "../Components/Inputs Fields Components/AreaNumberField";
import FloorNumberField from "../Components/Inputs Fields Components/FloorNumberField";
import FloorCountNumberField from "../Components/Inputs Fields Components/FloorCountNumberField";
import RoomCountNumberField from "../Components/Inputs Fields Components/RoomCountNumberField";
import DirectionTextFieldSelect from "../Components/Inputs Fields Components/DirectionTextFieldSelect";
import OwnershipTextFieldSelect from "../Components/Inputs Fields Components/OwnershipTextFieldSelect";
import VehicleBrandTextFieldSelect from "../Components/Inputs Fields Components/VehicleBrandTextFieldSelect";
import VehicleModelTextFieldSelect from "../Components/Inputs Fields Components/VehicleModelTextFieldSelect";
import PaintStatusTextFieldSelect from "../Components/Inputs Fields Components/PaintStatusTextFieldSelect";
import VehicleColorTextFieldSelect from "../Components/Inputs Fields Components/VehicleColorTextFieldSelect";
import GearTextFieldSelect from "../Components/Inputs Fields Components/GearTextFieldSelect";
import ManufactureYearNumberField from "../Components/Inputs Fields Components/ManufactureYearNumberField";
import TraveledDistanceNumberField from "../Components/Inputs Fields Components/TraveledDistanceNumberField";
import EngineCapacityNumberField from "../Components/Inputs Fields Components/EngineCapacityNumberField";
import FuelTextFieldSelect from "../Components/Inputs Fields Components/FuelTextFieldSelect";
import VehicleTypeTextFieldSelect from "../Components/Inputs Fields Components/VehicleTypeTextFieldSelect";
import SparePartStatusTextFieldSelect from "../Components/Inputs Fields Components/SparePartStatusTextFieldSelect";
import MobileOrTableteBrandTextFieldSelect from "../Components/Inputs Fields Components/MobileOrTableteBrandTextFieldSelect";
import MobileOrTableteCategoryTextFieldSelect from "../Components/Inputs Fields Components/MobileOrTableteCategoryTextFieldSelect";
import MobileOrTabletHardNumberField from "../Components/Inputs Fields Components/MobileOrTabletHardNumberField";
import MobileOrTabletRamNumberField from "../Components/Inputs Fields Components/MobileOrTabletRamNumberField";
import DeviceStatusTextFieldSelect from "../Components/Inputs Fields Components/DeviceStatusTextFieldSelect";
import BatteryStatusTextFieldSelect from "../Components/Inputs Fields Components/BatteryStatusTextFieldSelect";
import ComputerBrandTextFieldSelect from "../Components/Inputs Fields Components/ComputerBrandTextFieldSelect";
import ComputerCategoryTextFieldSelect from "../Components/Inputs Fields Components/ComputerCategoryTextFieldSelect";
import ComputerRamNumberField from "../Components/Inputs Fields Components/ComputerRamNumberField";
import ComputerHardNumberField from "../Components/Inputs Fields Components/ComputerHardNumberField";
import ProcessorTextField from "../Components/Inputs Fields Components/ProcessorTextField";
import ScreenTypeTextFieldSelect from "../Components/Inputs Fields Components/ScreenTypeTextFieldSelect";
import ScreenSizeNumberField from "../Components/Inputs Fields Components/ScreenSizeNumberField";
import DeviceTypeTextFieldSelect from "../Components/Inputs Fields Components/DeviceTypeTextFieldSelect";
import FurnitureStatusTextFieldSelect from "../Components/Inputs Fields Components/FurnitureStatusTextFieldSelect";
import MaterialTextFieldSelect from "../Components/Inputs Fields Components/MaterialTextFieldSelect";
import ClothesStatusTextFieldSelect from "../Components/Inputs Fields Components/ClothesStatusTextFieldSelect";
import ClothesTypeTextFieldSelect from "../Components/Inputs Fields Components/ClothesTypeTextFieldSelect";
import MapContainer from "../Components/MapContainer";

import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
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

function NewAd() {
  const { t, i18n } = useTranslation();
  const [isConfirm, setIsConfirm] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [selectedPhotoes, setselectedPhotoes] = useState(
    Array.from({ length: 6 })
  );
  const [selectedPhotoesHasErrorInSize, setSelectedPhotoesHasErrorInSize] =
    useState(Array.from({ length: 6 }));
  const navigate = useNavigate();
  const theme = useTheme();

  const form = useForm({
    defaultValues: {
      // Basic feilds
      category: "",
      subCategory: "",
      locationLongitude: null, //خط الطول
      locationLatitude: null, //خط العرض
      country: "",
      city: "",
      title: "",
      description: "",

      // sell or rent feilds
      sellOrRent: "sell",
      paymentMethodRent: "",
      price: "",
      currency: "",

      // realestate feilds
      area: "",
      floor: "",
      roomCount: "",
      cladding: "",
      direction: "",
      floorsCount: "",
      ownership: "",

      // vehicles feilds
      vehicleType: "",
      SparePartStatus: "",
      vehicleColor: "",
      paintStatus: "",
      manufactureYear: "",
      traveledDistance: "",
      engineCapacity: "",
      vehicleBrand: "",
      vehicleModel: "",

      // mobile and tablet and comouter and execoar fields
      mobOrTabBrand: "",
      mobOrTabCategory: "",
      mobOrTabHard: "",
      mobOrTabRam: "",
      deviceStatus: "",
      batteryStatus: "",
      computerBrand: "",
      computerCategory: "",
      computerRam: "",
      computerHard: "",
      processor: "",
      screenType: "",
      screenSize: "",
      deviceType: "",

      // clothes fields
      clothesType: "",
      clothesStatus: "",

      // furniture fields
      material: "",
      furnitureStatus: "",

      // photes fields
      photoes: [],

      // contact info fields
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
  console.log("all values of form", watch());

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

  const { data: vehiclesBrandsResponse } = useQuery(
    "vehicles-brands",
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get("/vehicles-brands");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );

  console.log("vvvvvvvvvvv :", vehiclesBrandsResponse?.data);

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
  const addNewAd = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/add-new-ad", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        navigate("/");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
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
    const photo = event.target.files[0];
    console.log("file size :", photo.size / 1024);
    // photo size in KB
    let photoSize = photo.size / 1024;

    if (photoSize > 500) {
      const temp = selectedPhotoesHasErrorInSize;
      temp[index] = true;
      setSelectedPhotoesHasErrorInSize(temp);
    }
    newselectedPhotoesArray[index] = photo;
    setselectedPhotoes(newselectedPhotoesArray);
  };

  const handleIconClick = (input_id) => {
    // Trigger the file input click event
    document.getElementById(input_id).click();
  };

  const onSubmit = (dataFromForm) => {
    //هون عملت نسخة من بيانات الفورم مشان اشتغل عليها وعدل عليه , لانو التعديل على اوبجكت الفورم الأساسي رح يأثر على الفورم
    const data = Object.assign({}, dataFromForm);
    data.photoes = selectedPhotoes;
    console.log("data :", data);
    const { advertisement, filterFields, photoes } = convertNewAdData(data);

    console.log("advertisement :", advertisement);
    console.log("filterFields :", filterFields);
    console.log("photoes :", photoes);

    const formData = new FormData();

    Object.keys(advertisement).forEach((key) => {
      formData.append(`advertisement_${key}`, advertisement[key]);
    });
    Object.keys(filterFields).forEach((key) => {
      formData.append(`filterFields_${key}`, filterFields[key]);
    });

    photoes.forEach((photo, index) => {
      formData.append(`photo_${index + 1}`, photo);
    });

    formData.append("photoes count", photoes.length);

    console.log("formData :");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    addNewAd.mutate(formData);
  };
  console.log("selected Files :", selectedPhotoes);

  return (
    <Box sx={{ backgroundColor: theme.palette.BLACK2_or_BLUED_WHITE }}>
      <MainAppBar />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        // encType="multipart/form-data"
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
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            marginTop: "20px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Grid container spacing={2}>
            {/* category */}
            <Grid item xs={12} sm={subCategories?.length == 0 ? 12 : 6}>
              <TextField
                autoComplete="given-name"
                select
                required
                fullWidth
                id="category"
                label={t("Category")}
                size="small"
                margin="normal"
                {...register("category")}
                error={!!errors.category}
                helperText={t(errors.category?.message)}
              >
                {mainCategoriesResponse?.data.map((category) => {
                  return (
                    <MenuItem
                      key={category.id}
                      value={category.name_en}
                      onClick={() => {
                        // alert(category.id);
                        getSubCategoriesByIdMutation.mutate(category.id);
                      }}
                    >
                      {i18n.language === "en"
                        ? category.name_en
                        : category.name_ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            {/* Sub Category  => don't show this field if no subcategories found */}
            {subCategories?.length > 0 && (
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  required
                  id="Sub Category"
                  label={t("SubCategory")}
                  autoComplete="family-name"
                  size="small"
                  margin="normal"
                  {...register("subCategory")}
                  error={!!errors.subCategory}
                  helperText={errors.subCategory?.message}
                >
                  {subCategories?.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.name_en}>
                        {i18n.language === "en"
                          ? category.name_en
                          : category.name_ar}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}
          </Grid>
          {/* sell or rent for realEstate and vehicles (exept "Spare parts") only */}
          {(watch("category") === "RealEstates" ||
            (watch("category") === "vehicles" &&
              watch("subCategory") !== "Spare parts")) && (
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
                  label={t("sell")}
                />
                <FormControlLabel
                  {...register("sellOrRent")}
                  value="rent"
                  control={<Radio />}
                  label={t("rent")}
                />
              </RadioGroup>
            </FormControl>
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
                label={t("Country")}
                size="small"
                margin="normal"
                {...register("country")}
                error={!!errors.country}
                helperText={t(errors.country?.message)}
              >
                {countriesInfo?.map((country) => {
                  return (
                    <MenuItem key={country.country} value={country.country}>
                      {i18n.language === "en"
                        ? country.country
                        : country.country_ar}
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
                label={t("City")}
                // label="City"
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
                      {i18n.language === "en" ? city.en : city.ar}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={12}>
              {/* map just for realestates */}
              {watch("category") === "RealEstates" && (
                <>
                  <Typography>{t("ChooseLocation")}</Typography>
                  <Box
                    sx={{
                      margin: "15px",
                    }}
                  >
                    <MapContainer
                      cityLocation={
                        citiesCorrespondingToTheSelectedCountry?.find(
                          (city) => city.en === watch("city")
                        )?.location
                      }
                      setLocationValues={(location) => {
                        setValue("locationLatitude", location.lat);
                        setValue("locationLongitude", location.lng);
                      }}
                    />
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="Title"
                        label={t("latitude")}
                        // label="lat"
                        autoComplete="family-name"
                        size="small"
                        margin="normal"
                        {...register("locationLatitude")}
                        error={!!errors.locationLatitude}
                        helperText={t(errors.locationLatitude?.message)}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="Title"
                        label={t("longitude")}
                        // label="lng"
                        autoComplete="family-name"
                        size="small"
                        margin="normal"
                        {...register("locationLongitude")}
                        error={!!errors.locationLongitude}
                        helperText={t(errors.locationLongitude?.message)}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="Title"
                label={t("Title")}
                autoComplete="family-name"
                size="small"
                margin="normal"
                {...register("title")}
                error={!!errors.title}
                helperText={t(errors.title?.message)}
              />
            </Grid>
            {/* Description */}
            <Grid item xs={12} sm={12}>
              <TextField
                label={t("description")}
                required
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("description")}
                error={!!errors.description}
                helperText={t(errors.description?.message)}
              />
            </Grid>
          </Grid>
        </Box>
        {/* Real estate attributes */}
        {watch("category") === "RealEstates" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography variant="h6" component="h2">
              {t("moreDetails")}
            </Typography>
            {/* Apartment */}
            {watch("subCategory") === "Apartment" && (
              <Box>
                <Grid container spacing={1}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* direction */}
                  <Grid item xs={12} sm={6}>
                    <DirectionTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                  <Grid container spacing={1}>
                    {/* floor */}
                    <Grid item xs={12} sm={6}>
                      <FloorNumberField register={register} errors={errors} />
                    </Grid>

                    {/* roomCount */}
                    <Grid item xs={12} sm={6}>
                      <RoomCountNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Office */}
            {watch("subCategory") === "Office" && (
              <Box>
                <Grid container spacing={2}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* direction */}
                  <Grid item xs={12} sm={6}>
                    <DirectionTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* roomCount */}
                  <Grid item xs={12} sm={6}>
                    <RoomCountNumberField register={register} errors={errors} />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>

                  {/* floor */}
                  <Grid item xs={12} sm={6}>
                    <FloorNumberField register={register} errors={errors} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* curreny */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Villa */}
            {watch("subCategory") === "Villa" && (
              <Box>
                <Grid container spacing={1}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* floorsCount */}
                  <Grid item xs={12} sm={6}>
                    <FloorCountNumberField
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                  {/* direction */}
                  <Grid item xs={12} sm={6}>
                    <DirectionTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {/* roomCount */}
                  <Grid item xs={12} sm={6}>
                    <RoomCountNumberField register={register} errors={errors} />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* curreny */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Store */}
            {watch("subCategory") === "Store" && (
              <Box>
                <Grid container spacing={2}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* floor */}
                  <Grid item xs={12} sm={6}>
                    <FloorNumberField register={register} errors={errors} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Farm */}
            {watch("subCategory") === "Farm" && (
              <Box>
                <Grid container spacing={1}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* direction */}
                  <Grid item xs={12} sm={6}>
                    <DirectionTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* roomCount */}
                  <Grid item xs={12} sm={6}>
                    <RoomCountNumberField register={register} errors={errors} />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                  {/* floorsCount */}
                  <Grid item xs={12} sm={6}>
                    <FloorCountNumberField
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Land */}
            {watch("subCategory") === "Land" && (
              <Box>
                <Grid container spacing={2}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* ownership */}
                  <Grid item xs={12} sm={6}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            {/* Chalet */}
            {watch("subCategory") === "Chalet" && (
              <Box>
                <Grid container spacing={2}>
                  {/* area */}
                  <Grid item xs={12} sm={6}>
                    <AreaNumberField register={register} errors={errors} />
                  </Grid>
                  {/* floor */}
                  <Grid item xs={12} sm={6}>
                    <FloorNumberField register={register} errors={errors} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* ownership */}
                  <Grid item xs={12} sm={12}>
                    <OwnershipTextFieldSelect register={register} errors={errors} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* roomCount */}
                  <Grid item xs={12} sm={6}>
                    <RoomCountNumberField register={register} errors={errors} />
                  </Grid>
                  {/* cladding */}
                  <Grid item xs={12} sm={6}>
                    <CladdingTextFieldSelect
                      register={register}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {/* price */}
                  <Grid item xs={12} sm={4}>
                    <PriceNumberField register={register} errors={errors} />
                  </Grid>
                  {/* currency */}
                  <Grid item xs={12} sm={2}>
                    <CurrencyTextFieldSelect
                      register={register}
                      errors={errors}
                      currencies={countriesInfo.map((country) => {
                        return country.currency;
                      })}
                    />
                  </Grid>
                  {/* paymentMethodRent */}
                  {watch("sellOrRent") === "rent" && (
                    <Grid item xs={12} sm={6}>
                      <PaymentMethodTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
        )}

        {/* Vehicle attributes */}
        {watch("category") === "vehicles" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography variant="h6" component="h2">
              {t("moreDetails")}
              {watch("subCategory") === "Spare parts" ? (
                <>
                  <Typography>Spare parts</Typography>
                  <Grid container spacing={2}>
                    {/* vehicleType */}
                    <Grid item xs={12} sm={6}>
                      <VehicleTypeTextFieldSelect
                        register={register}
                        errors={errors}
                        subCategories={subCategories}
                      />
                    </Grid>
                    {/* SparePartStatus */}
                    <Grid item xs={12} sm={6}>
                      <SparePartStatusTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* price */}
                    <Grid item xs={12} sm={4}>
                      <PriceNumberField register={register} errors={errors} />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={12} sm={2}>
                      <CurrencyTextFieldSelect
                        register={register}
                        errors={errors}
                        currencies={countriesInfo.map((country) => {
                          return country.currency;
                        })}
                      />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container spacing={2}>
                    {/* vehicleBrand */}
                    <Grid item xs={12} sm={6}>
                      <VehicleBrandTextFieldSelect
                        register={register}
                        errors={errors}
                        brands={vehiclesBrandsResponse?.data}
                      />
                    </Grid>
                    {/* vehicleModel */}
                    <Grid item xs={12} sm={6}>
                      <VehicleModelTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* paintStatus */}
                    <Grid item xs={12} sm={6}>
                      <PaintStatusTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* vehicleColor */}
                    <Grid item xs={12} sm={6}>
                      <VehicleColorTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* Gear */}
                    <Grid item xs={12} sm={6}>
                      <GearTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* manufactureYear */}
                    <Grid item xs={12} sm={6}>
                      <ManufactureYearNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* traveledDistance */}
                    <Grid item xs={12} sm={6}>
                      <TraveledDistanceNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* engineCapacity */}
                    <Grid item xs={12} sm={6}>
                      <EngineCapacityNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* fuel */}
                    <Grid item xs={12} sm={12}>
                      <FuelTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* price */}
                    <Grid item xs={12} sm={4}>
                      <PriceNumberField register={register} errors={errors} />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={12} sm={2}>
                      <CurrencyTextFieldSelect
                        register={register}
                        errors={errors}
                        currencies={countriesInfo.map((country) => {
                          return country.currency;
                        })}
                      />
                    </Grid>
                    {/* paymentMethodRent */}
                    {watch("sellOrRent") === "rent" && (
                      <Grid item xs={12} sm={6}>
                        <PaymentMethodTextFieldSelect
                          register={register}
                          errors={errors}
                        />
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* Electrical Electronic Devices attributes */}
        {watch("category") === "Electrical Electronic Devices" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography variant="h6" component="h2">
              {t("moreDetails")}
              {(watch("subCategory") === "Mobile" ||
                watch("subCategory") === "Tablet") && (
                <>
                  <Grid container spacing={2}>
                    {" "}
                    {/* mobOrTabBrand */}
                    <Grid item xs={12} sm={6}>
                      <MobileOrTableteBrandTextFieldSelect
                        register={register}
                        errors={errors}
                        subCategory={watch("subCategory")}
                      />
                    </Grid>
                    {/* mobOrTabCategory */}
                    <Grid item xs={12} sm={6}>
                      <MobileOrTableteCategoryTextFieldSelect
                        register={register}
                        errors={errors}
                        subCategory={watch("subCategory")}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* mobOrTabRam */}
                    <Grid item xs={12} sm={6}>
                      <MobileOrTabletRamNumberField
                        register={register}
                        errors={errors}
                        subCategory={watch("subCategory")}
                      />
                    </Grid>
                    {/* mobOrTabHard */}
                    <Grid item xs={12} sm={6}>
                      <MobileOrTabletHardNumberField
                        register={register}
                        errors={errors}
                        subCategory={watch("subCategory")}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    {/* DeviceStatus */}
                    <Grid item xs={12} sm={6}>
                      <DeviceStatusTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* batteryStatus */}
                    <Grid item xs={12} sm={6}>
                      <BatteryStatusTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* price */}
                    <Grid item xs={12} sm={4}>
                      <PriceNumberField register={register} errors={errors} />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={12} sm={2}>
                      <CurrencyTextFieldSelect
                        register={register}
                        errors={errors}
                        currencies={countriesInfo.map((country) => {
                          return country.currency;
                        })}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {watch("subCategory") === "Computer" && (
                <>
                  <Grid container spacing={2}>
                    {" "}
                    {/* computerBrand */}
                    <Grid item xs={12} sm={6}>
                      <ComputerBrandTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* computerCategory */}
                    <Grid item xs={12} sm={6}>
                      <ComputerCategoryTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {" "}
                    {/* computerRam */}
                    <Grid item xs={12} sm={6}>
                      <ComputerRamNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* computerHard */}
                    <Grid item xs={12} sm={6}>
                      <ComputerHardNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {" "}
                    {/* processor */}
                    <Grid item xs={12} sm={6}>
                      <ProcessorTextField register={register} errors={errors} />
                    </Grid>
                    {/* DeviceStatus */}
                    <Grid item xs={12} sm={6}>
                      <DeviceStatusTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* screenType */}
                    <Grid item xs={12} sm={6}>
                      <ScreenTypeTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                    {/* screenSize */}
                    <Grid item xs={12} sm={6}>
                      <ScreenSizeNumberField
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    {/* price */}
                    <Grid item xs={12} sm={4}>
                      <PriceNumberField register={register} errors={errors} />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={12} sm={2}>
                      <CurrencyTextFieldSelect
                        register={register}
                        errors={errors}
                        currencies={countriesInfo.map((country) => {
                          return country.currency;
                        })}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {watch("subCategory") === "Accessories" && (
                <>
                  <Typography>{watch("subCategory")}</Typography>
                  <Grid container spacing={2}>
                    {/* price */}
                    <Grid item xs={12} sm={4}>
                      <PriceNumberField register={register} errors={errors} />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={12} sm={2}>
                      <CurrencyTextFieldSelect
                        register={register}
                        errors={errors}
                        currencies={countriesInfo.map((country) => {
                          return country.currency;
                        })}
                      />
                    </Grid>
                    {/* deviceType */}
                    <Grid item xs={12} sm={6}>
                      <DeviceTypeTextFieldSelect
                        register={register}
                        errors={errors}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {watch("subCategory") !== "Accessories" &&
                watch("subCategory") !== "Mobile" &&
                watch("subCategory") !== "Tablet" &&
                watch("subCategory") !== "Computer" && (
                  <>
                    <Grid container spacing={1}>
                      {/* price */}
                      <Grid item xs={12} sm={4}>
                        <PriceNumberField register={register} errors={errors} />
                      </Grid>
                      {/* currency */}
                      <Grid item xs={12} sm={2}>
                        <CurrencyTextFieldSelect
                          register={register}
                          errors={errors}
                          currencies={countriesInfo.map((country) => {
                            return country.currency;
                          })}
                        />
                      </Grid>
                      {/* DeviceStatus */}
                      <Grid item xs={12} sm={6}>
                        <DeviceStatusTextFieldSelect
                          register={register}
                          errors={errors}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
            </Typography>
          </Box>
        )}

        {/* furniture attributes */}
        {watch("category") === "Furniture" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            {t("moreDetails")}
            <Grid container spacing={2}>
              {/* material */}
              <Grid item xs={12} sm={6}>
                <MaterialTextFieldSelect register={register} errors={errors} />
              </Grid>
              {/* furnitureStatus */}
              <Grid item xs={12} sm={6}>
                <FurnitureStatusTextFieldSelect
                  register={register}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {/* price */}
              <Grid item xs={12} sm={4}>
                <PriceNumberField register={register} errors={errors} />
              </Grid>
              {/* currency */}
              <Grid item xs={12} sm={2}>
                <CurrencyTextFieldSelect
                  register={register}
                  errors={errors}
                  currencies={countriesInfo.map((country) => {
                    return country.currency;
                  })}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Clothes attributes */}
        {watch("category") === "Clothing and fashion" && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            {t("moreDetails")}
            <Grid container spacing={2}>
              {/* clothesType */}
              <Grid item xs={12} sm={6}>
                <ClothesTypeTextFieldSelect
                  register={register}
                  errors={errors}
                />
              </Grid>
              {/* clothesStatus */}
              <Grid item xs={12} sm={6}>
                <ClothesStatusTextFieldSelect
                  register={register}
                  errors={errors}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {/* price */}
              <Grid item xs={12} sm={4}>
                <PriceNumberField register={register} errors={errors} />
              </Grid>
              {/* currency */}
              <Grid item xs={12} sm={2}>
                <CurrencyTextFieldSelect
                  register={register}
                  errors={errors}
                  currencies={countriesInfo.map((country) => {
                    return country.currency;
                  })}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* 'Animals' or 'Personal Collections' or 'Food and drinks' or 'Books and hobbies' or 'Children equipment' or 'Sports and clubs' or 'Industrial equipment' */}
        {(watch("category") === "Animals" ||
          watch("category") === "Personal Collections" ||
          watch("category") === "Food and drinks" ||
          watch("category") === "Books and hobbies" ||
          watch("category") === "Children equipment" ||
          watch("category") === "Sports and clubs" ||
          watch("category") === "Industrial equipment") && (
          <Box
            sx={{
              // border: "1px solid black",
              boxShadow:
                theme.palette.mode === "light"
                  ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                  : null,
              backgroundColor: theme.palette.WHITE_or_BLACK,
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            {t("moreDetails")}

            <Grid container spacing={2}>
              {/* price */}
              <Grid item xs={12} sm={4}>
                <PriceNumberField register={register} errors={errors} />
              </Grid>
              {/* currency */}
              <Grid item xs={12} sm={2}>
                <CurrencyTextFieldSelect
                  register={register}
                  errors={errors}
                  currencies={countriesInfo.map((country) => {
                    return country.currency;
                  })}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {/* Images */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Typography variant="h5">{t("Images")}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => {
              return (
                <Box
                  sx={{
                    margin: "15px",
                  }}
                >
                  <TextField
                    id={`file_input_${n}`}
                    type="file"
                    inputProps={{
                      accept:
                        // "image/jpeg,image/png,image/gif,image/bmp,image/webp", // Specify the accepted image formats here
                        "image/jpeg,image/png,image/gif", // Specify the accepted image formats here
                    }}
                    sx={{ display: "none" }}
                    onChange={(event) => handleFileChange(event, n)}
                  />
                  {selectedPhotoes[n] === undefined && (
                    <IconButton
                      color="primary"
                      // component="span"
                      sx={{
                        border: `2px solid ${theme.palette.LIGHT_BLUE}`,
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
                      <Box
                        sx={{
                          width: "250px",
                          height: "250px",
                          // backgroundColor: "red",
                          backgroundImage: `url(${URL.createObjectURL(
                            selectedPhotoes[n]
                          )})`,
                          backgroundSize: "cover", // Cover the entire Box with the image
                          backgroundPosition: "center",
                          borderRadius: "10px",
                          // border: `5px solid ${theme.palette.LIGHT_BLUE}`,
                          border: selectedPhotoesHasErrorInSize[n]
                            ? `2px solid red`
                            : null,
                        }}
                      >
                        {/* <img
                          src={URL.createObjectURL(selectedPhotoes[n])}
                          alt="Selected"
                          style={{
                            width: "250px",
                            height: "250px",
                            borderRadius: "10px",
                          }}
                          objectFit="cover"
                        /> */}
                      </Box>
                      {/* error message when photo size more than 200KB */}
                      {selectedPhotoesHasErrorInSize[n] && (
                        <span style={{ color: "red", fontSize: "15px" }}>
                          {t("choosePhotoLessthan200KB")}
                        </span>
                      )}

                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "0px",
                          left: "0px",
                          // backgroundColor:"orange"
                        }}
                        color="warning"
                        onClick={() => {
                          // تصفير مكان الصورة ضمن المصفوفة
                          const newselectedPhotoesArray = [...selectedPhotoes];
                          newselectedPhotoesArray[n] = undefined;
                          setselectedPhotoes(newselectedPhotoesArray);

                          // تصفير الخطا المتعلق بالصورة ان وجد ضمن مصفوفة الأخطاء
                          const temp = [...selectedPhotoesHasErrorInSize];
                          temp[n] = null;
                          setSelectedPhotoesHasErrorInSize(temp);
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
        {/* contact Phones */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Typography>{t("contactPhones")}</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("name")}
                size="small"
                fullWidth
                {...register("contactName1")}
                error={!!errors.contactName1}
                helperText={t(errors.contactName1?.message)}
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
                label={t("code")}
                size="small"
                fullWidth
                {...register("phoneCode1")}
                error={!!errors.phoneCode1}
                helperText={t(errors.phoneCode1?.message)}
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
                label={t("phone number")}
                name="phoneNumber"
                size="small"
                {...register("phone1")}
                error={!!errors.phone1}
                helperText={t(errors.phone1?.message)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={t("name")}
                size="small"
                fullWidth
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
                label={t("code")}
                size="small"
                fullWidth
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
                label={t("phone number")}
                name="phoneNumber"
                size="small"
                {...register("phone2")}
              />
            </Grid>
          </Grid>
        </Box>
        {/* conformation */}
        <Box
          sx={{
            // border: "1px solid black",
            boxShadow:
              theme.palette.mode === "light"
                ? "10px 10px 10px 0px rgba(100, 100, 100, 0.50)"
                : null,
            backgroundColor: theme.palette.WHITE_or_BLACK,
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            // direction: i18n.language === "en" ? "ltr" : "rtl",
            direction: "rtl",
          }}
        >
          <Typography>بسم الله الرحمن الرحيم</Typography>
          <br />
          <Typography variant="string">قال الله تعالى:</Typography>
          <b>
            " وَأَوْفُواْ بِعَهْدِ اللهِ إِذَا عَاهَدتُّمْ وَلاَ تَنقُضُواْ
            الأَيْمَانَ بَعْدَ تَوْكِيدِهَا وَقَدْ جَعَلْتُمُ اللهَ عَلَيْكُمْ
            كَفِيلاً "
          </b>
          <Typography variant="string">صدق الله العظيم</Typography>
          <br />
          <br />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Checkbox
              checked={isConfirm}
              onChange={(event) => {
                setIsConfirm(event.target.checked);
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography>
                * اتعهد واقسم بالله أنا المعلن أن أدفع رسوم الموقع وهي 1% من
                قيمة البيع سواء تم البيع عن طريق الموقع أو بسببه.
              </Typography>
              <Typography>
                * كما أتعهد بدفع الرسوم خلال 10 أيام من استلام كامل مبلغ
                المبايعة.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{ mx: 2, mb: 2 }}
            disabled={addNewAd.isLoading || !isConfirm}
          >
            {addNewAd.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("create")
            )}
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mb: 2 }}
            // disabled={postLoginMutation.isLoading}
            onClick={() => {
              navigate("/");
            }}
          >
            {t("Skip")}
          </Button>
        </Box>
      </Box>

      <DevTool control={control} />
    </Box>
  );
}

export default NewAd;
