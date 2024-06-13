import React, { useState } from "react";
import MainAppBar from "../Components/MainAppBar";
import Footer from "../Components/Footer";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { Box, Typography } from "@mui/material";
import AdvertisementCard from "../Components/AdvertisementCard";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function FavoriteAds() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [isActive, setIsActive] = useState(null);

  const activeStyle = {
    backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
    color: theme.palette.WHITE,
  };
  const notActiveStyle = {
    border: "1px solid blue",
  };
  const { data: favoriteAds } = useQuery(`/favorite-ads`, () => {
    const token = localStorage.getItem("token");
    const user_id = JSON.parse(localStorage.getItem("user")).id;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axiosInstance.get(`/favorite-ads/${user_id}`);
  });

  const { isLoading: mainCategoriesIsLoading, data: mainCategories } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response.data.data.length);
        setIsActive(
          Array.from({ length: response.data.data.length }).fill(false)
        );
      },
    }
  );

  return (
    <>
      <MainAppBar />
      {/* <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x",
          // justifyContent: "space-around",
          // flexWrap: "wrap",
          // alignContent: "space-around",
          // margin: "25px",
        }}
      > */}
      <Box
        sx={{
          mt: "20px",
          width: "95%",
          mx: "auto",
          // border: "1px solid red",
          display: "flex",
          // flexWrap:"nowrap",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            width: 1,
          },
          scrollSnapType: "x mandatory", // Enables horizontal scroll snapping
          direction: i18n.language === "en" ? "ltr" : "rtl",
        }}
      >
        {mainCategories?.data.data.map((category, index) => {
          return (
            <Box>
              <Typography
                sx={{
                  // width:"200px",
                  minWidth: "110px",
                  // height: "50px",
                  // lineHeight:"110px",
                  textAlign: "center",
                  backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                  color: theme.palette.WHITE_or_BLACK,
                  mr: "5px",
                  mb: "5px",
                  whiteSpace: "nowrap",
                  fontSize: "25px",
                  p: "10px",
                  borderRadius: "15px",
                }}
                onClick={() => {
                  // const newArray = [...isActive]; // Make a copy of the current state
                  // newArray[index] = !newArray[index]; // Toggle the value at the given index
                  // setIsActive(newArray); // Update the state with the new array
                }}
              >
                {i18n.language === "en" ? category.name_en : category.name_ar}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignContent: "space-around",
          margin: "25px",
        }}
      >
        {favoriteAds?.data.data.map((ad) => {
          return (
            <AdvertisementCard
              image={`http://127.0.0.1:8000/storage/${ad.cardPhoto}`}
              // title="200 sqm furnished apartment we  we "
              // image="slide3.jpg"
              title={ad.title}
              price={ad.price}
              newPrice={ad.newPrice}
              currency={ad.currency}
              adderss={ad.address}
              sellOrRent={ad.sellOrRent}
              id={ad.id}
              cardWidth="350px"
              isAdInFavoriteListProp={ad.isAdInFavoriteList}
              paymentMethodRent={ad.paymentMethodRent}
            />
          );
        })}
      </Box>
      <Footer />
    </>
  );
}

export default FavoriteAds;
