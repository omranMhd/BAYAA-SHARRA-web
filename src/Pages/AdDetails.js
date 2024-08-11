import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MainAppBar from "../Components/MainAppBar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import AdvertisementPhotoesSlider from "../Components/AdvertisementPhotoesSlider";
import AdditionalAdvertisementInfo from "../Components/AdditionalAdvertisementInfo";
import DisplayLocationMap from "../Components/DisplayLocationMap";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AdvertisementCard from "../Components/AdvertisementCard";
import Footer from "../Components/Footer";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { useTranslation } from "react-i18next";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import AdDetailsActions from "../Components/AdDetailsActions";
import AdDetailsComments from "../Components/AdDetailsComments";

function AdDetails() {
  const { t, i18n } = useTranslation();
  let params = useParams();
  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();
  let { adId } = useParams();
  const theme = useTheme();

  const [pageNotFound, setPageNotFound] = useState(false);

  const {
    isError,
    isLoading: adDetailsIsLoading,
    data: adDetailsResponse,
  } = useQuery(
    `ad-details-${adId}`,
    () => {
      // const token = localStorage.getItem("token");

      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${token}`;
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
    let user_id = null;
    if (isUserLogedin) {
      user_id = JSON.parse(localStorage.getItem("user")).id;
    }

    // axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosInstance.get(`/similar-ads/${params.adId}/${user_id}`);
  });

  console.log("similarAds", similarAds);

  const {
    isLoading: advertisementCommentsIsLoading,
    data: advertisementComments,
  } = useQuery(
    "advertisement-comments",
    () => {
      // const token = localStorage.getItem("token");

      // axiosInstance.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${token}`;

      return axiosInstance.get(`/advertisement-comments/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response);
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

  console.log("advertisementComments :", advertisementComments?.data.data);

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
      <Box sx={{ backgroundColor: theme.palette.BLACK_or_BLUED_WHITE }}>
        <MainAppBar />
        {adDetailsIsLoading ? (
          <Box>...</Box>
        ) : adDetailsResponse?.data.data != undefined ? (
          <Grid container spacing={1}>
            <Grid
              item
              xs={9}
              sx={
                {
                  // backgroundColor: "red",
                  // padding: "20px",
                }
              }
            >
              <Box
                sx={
                  {
                    // height: "90vh",
                    // overflowY: "auto",
                  }
                }
              >
                {/* advertisement owner */}
                <Box
                  sx={{
                    display: "flex",
                    // alignContent:"center",
                    alignItems: "center",
                    backgroundColor: theme.palette.WHITE_or_DARK_BLUE,
                    padding: "5px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    margin: "15px",
                    borderRadius: "50px",
                    direction: i18n.language == "en" ? "ltr" : "rtl",
                    // border:"1px solid red"
                  }}
                >
                  {/* http://127.0.0.1:8000/storage/advertisements_photoes/2XTCAve1PTBk9iPUrMGwplhB94ItQ82TPo2tgvhI.jpg */}
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      adDetailsResponse?.data.data.owner.photo != null
                        ? `http://127.0.0.1:8000/storage/${adDetailsResponse?.data.data.owner.photo}`
                        : "/uesrPhoto.png"
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "5px",
                    }}
                  >
                    {adDetailsResponse?.data.data.owner.fullName}
                    <Rating name="read-only" value={3} readOnly size="small" />
                  </Box>
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
                      {adDetailsResponse?.data.data.additionalAttributes !=
                        null &&
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
                                  adDetailsResponse?.data.data
                                    .additionalAttributes.currency
                                }`}
                              </Typography>
                            </Box>
                            {/* طريقة الدفع في حال كان اجار */}
                            <Typography>
                              {adDetailsResponse?.data.data.additionalAttributes
                                .sellOrRent === "rent" &&
                                `${i18n.language === "en" ? "/" : "\\"} ${t(
                                  adDetailsResponse?.data.data
                                    .additionalAttributes.paymentMethodRent
                                )}`}
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
                            {adDetailsResponse?.data.data.contactNumber !=
                              null &&
                              JSON.parse(
                                adDetailsResponse?.data.data.contactNumber
                              ).secondName != "" && (
                                <>
                                  <Typography variant="h6">
                                    {adDetailsResponse?.data.data
                                      .contactNumber != null
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
                {/* advertisement actions */}
                {isUserLogedin && <AdDetailsActions />}
                {/* advertisement comments */}
                <AdDetailsComments
                  user_id={adDetailsResponse?.data.data.owner.id}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={
                {
                  // backgroundColor: "blue",
                  // direction:"rtl"
                }
              }
            >
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  mt: "15px",
                  // border:"1px solid red"
                }}
              >
                {t("showMore")}
              </Typography>
              <Box
                sx={{
                  // backgroundColor: "blue",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  // flexWrap: "wrap",
                  alignContent: "space-around",
                  padding: "20px",
                }}
              >
                {similarAds?.data.data.map((ad) => {
                  return (
                    <AdvertisementCard
                      image={`http://127.0.0.1:8000/storage/${ad.cardPhoto}`}
                      // image="/slide3.jpg"
                      // title="200 sqm furnished apartment we  we "
                      title={ad.title}
                      price={ad.price}
                      newPrice={ad.newPrice}
                      currency={ad.currency}
                      adderss={ad.address}
                      sellOrRent={ad.sellOrRent}
                      date={ad.created_at}
                      cardWidth="auto"
                      id={ad.id}
                      isAdInFavoriteListProp={ad.isAdInFavoriteList}
                      paymentMethodRent={ad.paymentMethodRent}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <>
            <img alt="page not found" src="/404.png" width={"100%"} />
          </>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default AdDetails;
