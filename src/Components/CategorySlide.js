import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import { useQuery } from "react-query";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import axiosInstance from "../Axios/axiosInstance";
import LoadingDialog from "./LoadingDialog";

function CategorySlide({
  categoryName,
  categoryName_ar,
  category_id,
  categoriyClicked,
  setCategoriyClicked,
}) {
  const isUserLogedin = useUserLogedin();
  const { t, i18n } = useTranslation();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const theme = useTheme();

  const {
    isLoading: filteredAdsIsLoading,
    data: filteredAds,
    refetch,
  } = useQuery(
    `filtered-ads-${category_id}`,
    () => {
      const queryParams = new URLSearchParams({
        category: categoryName,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );

  return (
    <>
      <Box
        sx={{
          // height:"50px",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: "20px",
          padding: "5px",
          border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,

          backgroundColor:
            categoriyClicked === categoryName
              ? theme.palette.LIGHT_BLUE_or_DARK_BLUE
              : "",

          color: categoriyClicked === categoryName ? "white" : "",
        }}
        onClick={() => {
          // alert(category_id);
          setCategoriyClicked(categoryName);
          if (categoryName === "All") {
            setAds(null);
          } else {
            refetch();
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            margin: "auto",
            backgroundColor: "white",
            // padding:"5"
            borderRadius: "100px",
            width: "45px",
            height: "45px",
          }}
        >
          <img
            width="30px"
            height="30px"
            style={{ margin: "auto" }}
            src={`/icons/${categoryName}.png`}
            alt="rr"
          />
        </Box>

        <Typography
          style={{ fontSize: "20px", margin: "auto", textAlign: "center" }}
          // style={{ fontSize: "20px", margin: "auto" }}
        >
          {i18n.language === "en" && categoryName}
          {i18n.language === "ar" && categoryName_ar}
        </Typography>
      </Box>
      <LoadingDialog openDialog={filteredAdsIsLoading} />
    </>
  );
}

export default CategorySlide;
