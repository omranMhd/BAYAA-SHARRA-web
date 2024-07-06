import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AdvertisementPhotoesSlider from "../Components/AdvertisementPhotoesSlider";
import AdditionalAdvertisementInfo from "../Components/AdditionalAdvertisementInfo";
import DisplayLocationMap from "../Components/DisplayLocationMap";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextField from "@mui/material/TextField";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { useTranslation } from "react-i18next";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AdDetailsComments from "../Components/AdDetailsComments";

function UserAdDetails() {
  const { t, i18n } = useTranslation();
  let params = useParams();
  let { adId } = useParams();
  const theme = useTheme();

  const [pageNotFound, setPageNotFound] = useState(false);

  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [advertisementIsClosed, setAdvertisementIsClosed] = useState(false);
  const [price, setPrice] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [currency, setCurrency] = useState(null);
  const queryClient = useQueryClient();

  const {
    isError,
    isLoading: adDetailsIsLoading,
    data: adDetailsResponse,
  } = useQuery(
    `ad-details-${adId}`,
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get(`/ad-details/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response);
        setPageNotFound(false);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        setPageNotFound(true);
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  console.log("bbb :", adDetailsResponse?.data.data);
  console.log("bbb isError:", isError);

  const { data: similarAds } = useQuery(`similar-ads-${adId}`, () => {
    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosInstance.get(`/similar-ads/${params.adId}/${user_id}`);
  });

  console.log("similarAds", similarAds);

  const updateAdvertisementMutation = useMutation(
    (data) => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/update-advertisement/${params.adId}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setOpenEditDialog(false);
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

  const adjustDateToTranslate = (datePhrase) => {
    if (
      [
        "a few seconds ago",
        "a minute ago",
        "an hour ago",
        "a day ago",
        "a month ago",
        "a year ago",
      ].includes(datePhrase)
    ) {
      return t(datePhrase);
    } else {
      const digitRegex = /\d+/g;
      const number = Number(datePhrase.match(digitRegex)[0]);
      let phraseWithoutNumbers = datePhrase.replace(/\d/g, "").trim();
      let phraseWithoutAgo = phraseWithoutNumbers.replace("ago", "").trim();

      if (phraseWithoutAgo === "minutes") {
        return t("minutes ago", { count: number });
      } else if (phraseWithoutAgo === "hours") {
        return t("hours ago", { count: number });
      } else if (phraseWithoutAgo === "days") {
        return t("days ago", { count: number });
      } else if (phraseWithoutAgo === "months") {
        return t("months ago", { count: number });
      } else if (phraseWithoutAgo === "years") {
        return t("years ago", { count: number });
      }

      // console.log("number :", number);
      // console.log("phraseWithoutNumbers :", phraseWithoutNumbers);
      // // console.log("phraseWithoutAgo :", phraseWithoutAgo);
      // return datePhrase;
    }
  };

  return (
    <>
      {/* <Box sx={{ backgroundColor: theme.palette.BLACK_or_BLUED_WHITE }}> */}

      {adDetailsIsLoading ? (
        <Box>...</Box>
      ) : adDetailsResponse?.data.data != undefined ? (
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: "red",
              // padding: "20px",
              mt: "10px",
            }}
          >
            <Box
              sx={{
                margin: "10px",
                padding: "10px",
                backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
                borderRadius: "10px",
              }}
            >
              <Tooltip title={t("edit")} arrow>
                <IconButton
                  onClick={() => {
                    setOpenEditDialog(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Dialog
                open={openEditDialog}
                onClose={() => {
                  setOpenEditDialog(false);
                }}
                sx={{
                  direction: i18n.language === "en" ? "ltr" : "rtl",
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle id="alert-dialog-title">
                  {t("Edit Advertisement")}
                </DialogTitle>
                <DialogContent>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={t("Advertisements is Closed")}
                    onChange={(e) => {
                      // alert(e.target.checked);
                      setAdvertisementIsClosed(e.target.checked);
                    }}
                    value={advertisementIsClosed}
                  />
                  <Grid container spacing={1}>
                    <Grid item xs={4} sm={4}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="area"
                        label={t("price")}
                        size="small"
                        margin="normal"
                        value={price}
                        onChange={(e) => {
                          setPrice(Number(e.target.value));
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <TextField
                        type="number"
                        autoComplete="given-name"
                        fullWidth
                        id="area"
                        label={t("new price")}
                        size="small"
                        margin="normal"
                        value={newPrice}
                        onChange={(e) => {
                          setNewPrice(Number(e.target.value));
                        }}
                      />
                    </Grid>
                    {/* currency */}
                    <Grid item xs={4} sm={4}>
                      <TextField
                        select
                        autoComplete="given-name"
                        fullWidth
                        id="currency"
                        label={t("currency")}
                        size="small"
                        margin="normal"
                        value={currency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                          //   console.log("ff :", e.target.value);
                        }}
                      >
                        {countriesInfo
                          ?.map((country) => {
                            return country.currency;
                          })
                          .map((currency) => {
                            return (
                              <MenuItem key={currency} value={currency}>
                                {currency}
                              </MenuItem>
                            );
                          })}
                      </TextField>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setOpenEditDialog(false);
                    }}
                  >
                    {t("Skip")}
                  </Button>
                  <Button
                    disabled={updateAdvertisementMutation.isLoading}
                    variant="contained"
                    sx={{
                      mx: 1,
                    }}
                    onClick={() => {
                      const data = {};

                      if (price !== null && price > 0) {
                        data.price = price;
                      }
                      if (newPrice !== null && newPrice > 0) {
                        data.newPrice = newPrice;
                      }
                      if (currency !== null) {
                        data.currency = currency;
                      }
                      if (advertisementIsClosed) {
                        data.adStatus = "closed";
                      }
                      updateAdvertisementMutation.mutate(data);
                    }}
                  >
                    {updateAdvertisementMutation.isLoading ? (
                      <CircularProgress size={25} style={{ color: "white" }} />
                    ) : (
                      t("Save")
                    )}
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>

            {/* advertisement photoes */}
            <Box>
              <AdvertisementPhotoesSlider
                photoes={adDetailsResponse?.data.data.adPhotoes}
              />
            </Box>
            {/* advertisement attributes */}
            <Box
              sx={{
                margin: "15px",
                padding: "10px",
                backgroundColor: theme.palette.WHITE_or_BLACK2,
                borderRadius: "10px",
                direction: i18n.language == "en" ? "ltr" : "rtl",

                // border: "1px solid red",
              }}
            >
              <Typography sx={{ marginBottom: "20px" }} variant="h5">
                {adDetailsResponse?.data.data.title}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.LIGHT_BLUE,
                }}
              >
                {t("description")} :
              </Typography>

              <Typography sx={{ marginBottom: "20px" }}>
                {adDetailsResponse?.data.data.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // justifyContent: "space-around",
                  padding: "10px",
                  // border:"1px solid black",
                  borderRadius: "20px",
                  boxShadow: "0px 2px 2px 2px black",
                  mb: "20px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <LocationOnOutlinedIcon
                      sx={{
                        color: theme.palette.LIGHT_BLUE,
                      }}
                    />
                    <Typography>
                      {i18n.language === "en"
                        ? adDetailsResponse?.data.data.address.country_en
                        : adDetailsResponse?.data.data.address.country_ar}
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.LIGHT_BLUE,
                      }}
                    >
                      {" - "}
                    </Typography>

                    <Typography>
                      {i18n.language === "en"
                        ? adDetailsResponse?.data.data.address.city_en
                        : adDetailsResponse?.data.data.address.city_ar}
                    </Typography>
                  </Box>
                  {/* price and newPrice if exist */}
                  {adDetailsResponse?.data.data.additionalAttributes != null &&
                    (adDetailsResponse?.data.data.additionalAttributes
                      .newPrice == null ? (
                      // اذا ماكان في سعر جديد
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // border: "1px solid red",
                        }}
                      >
                        {/* price */}
                        <Box
                          sx={
                            {
                              // border: "1px solid blue",
                              // display: "flex",
                            }
                          }
                        >
                          {/* <LocalOfferOutlinedIcon
                              sx={{
                                color: theme.palette.LIGHT_BLUE,
                              }}
                            /> */}
                          <Typography variant="h6">
                            {`${adDetailsResponse?.data.data.additionalAttributes.price
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${
                              adDetailsResponse?.data.data.additionalAttributes
                                .currency
                            }`}
                          </Typography>
                        </Box>
                        {/* طريقة الدفع في حال كان اجار */}
                        <Typography>
                          {adDetailsResponse?.data.data.additionalAttributes
                            .sellOrRent === "rent" &&
                            `${i18n.language === "en" ? "/" : "\\"} ${
                              adDetailsResponse?.data.data.additionalAttributes
                                .paymentMethodRent
                            }`}
                        </Typography>
                      </Box>
                    ) : (
                      // اذا كان في سعر جديد
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // border: "1px solid red",
                        }}
                      >
                        {/* old price */}
                        <Box
                          sx={
                            {
                              // border: "1px solid blue",
                            }
                          }
                        >
                          <Typography variant="h6">
                            <>
                              <del
                                style={{ color: "red" }}
                              >{`${adDetailsResponse?.data.data.additionalAttributes.price
                                ?.toString()
                                .replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ","
                                )} `}</del>{" "}
                              {` ${adDetailsResponse?.data.data.additionalAttributes.currency}`}
                            </>
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            color: theme.palette.LIGHT_BLUE,
                          }}
                        >
                          -
                        </Typography>
                        {/* new price */}
                        <Box
                          sx={
                            {
                              // border: "1px solid blue",
                            }
                          }
                        >
                          <Typography variant="h6">
                            {`${adDetailsResponse?.data.data.additionalAttributes.newPrice
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                 ${
                                   adDetailsResponse?.data.data
                                     .additionalAttributes.currency
                                 }`}
                          </Typography>
                        </Box>
                        {/* طريقة الدفع في حال كان اجار */}
                        <Typography>
                          {adDetailsResponse?.data.data.additionalAttributes
                            .sellOrRent === "rent" &&
                            `/ ${adDetailsResponse?.data.data.additionalAttributes.paymentMethodRent}`}
                        </Typography>
                      </Box>
                    ))}

                  {/* <Typography>{adDetailsResponse?.data.data.date}</Typography> */}

                  <Box sx={{ display: "flex" }}>
                    <AccessTimeIcon
                      sx={{
                        color: theme.palette.LIGHT_BLUE,
                      }}
                    />
                    <Typography sx={{ mx: "5px" }}>
                      {adjustDateToTranslate(
                        moment(adDetailsResponse?.data.data.date).fromNow()
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  >
                    {t("contactNumbers")} :
                  </Typography>
                  {/* first number */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">
                      {adDetailsResponse?.data.data.contactNumber != null
                        ? `${
                            JSON.parse(
                              adDetailsResponse?.data.data.contactNumber
                            ).firstName
                          }  :  ${
                            JSON.parse(
                              adDetailsResponse?.data.data.contactNumber
                            ).firstPhone
                          } `
                        : "{}"}
                    </Typography>
                    <PhoneInTalkIcon
                      sx={{
                        color: theme.palette.LIGHT_BLUE,
                        marginX: "10px",
                      }}
                    />
                  </Box>
                  {/* second number if exist */}
                  {adDetailsResponse?.data.data.contactNumber != null &&
                    JSON.parse(adDetailsResponse?.data.data.contactNumber)
                      .secondName != null && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {adDetailsResponse?.data.data.contactNumber != null &&
                          JSON.parse(adDetailsResponse?.data.data.contactNumber)
                            .secondName != "" && (
                            <>
                              <Typography variant="h6">
                                {adDetailsResponse?.data.data.contactNumber !=
                                null
                                  ? `${
                                      JSON.parse(
                                        adDetailsResponse?.data.data
                                          .contactNumber
                                      ).secondName
                                    } : ${
                                      JSON.parse(
                                        adDetailsResponse?.data.data
                                          .contactNumber
                                      ).secondPhone
                                    } `
                                  : "{}"}
                              </Typography>
                              <PhoneInTalkIcon
                                sx={{
                                  color: theme.palette.LIGHT_BLUE,
                                  marginX: "10px",
                                }}
                              />
                            </>
                          )}
                      </Box>
                    )}
                </Box>
              </Box>
              <Box
                sx={
                  {
                    // height: "200px",
                  }
                }
              >
                <Typography
                  sx={{
                    color: theme.palette.LIGHT_BLUE,
                  }}
                >
                  {t("advertisementAttributes")} :
                </Typography>
                <AdditionalAdvertisementInfo
                  adCategory={adDetailsResponse?.data.data.category.name_en}
                  additionalInfo={
                    adDetailsResponse?.data.data.additionalAttributes
                  }
                />

                {adDetailsResponse?.data.data.location != null && (
                  <>
                    <Typography sx={{ marginBottom: "20px" }}>
                      {/* {adDetailsResponse?.data.data.location} */}
                      {t("location on map")}
                    </Typography>

                    <DisplayLocationMap
                      location={JSON.parse(
                        adDetailsResponse?.data.data.location
                      )}
                    />
                  </>
                )}
              </Box>
            </Box>

            {/* advertisement comments */}
            <AdDetailsComments
              user_id={adDetailsResponse?.data.data.owner.id}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <img alt="page not found" src="/404.png" width={"100%"} />
        </>
      )}
      {/* </Box> */}
    </>
  );
}

export default UserAdDetails;
