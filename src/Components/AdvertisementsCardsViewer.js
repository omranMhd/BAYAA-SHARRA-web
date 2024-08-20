import React, { useState, useContext, useEffect } from "react";
import config from "../config";
import Box from "@mui/material/Box";
import { Link, json } from "react-router-dom";
import AdvertisementCard from "../Components/AdvertisementCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FilterDialog from "./FilterDialog";
import LoadingDialog from "./LoadingDialog";

function AdvertisementsCardsViewer() {
  const { ads, setAds } = useContext(ShareAdvertisementsContext);

  const isUserLogedin = useUserLogedin();
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const { t, i18n } = useTranslation();

  const {
    isLoading: advertisementsIsLoading,
    data: advertisements,
    refetch: refetchAllAds,
  } = useQuery(
    `get-advertisements-${currentPage}`,
    () => {
      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;
        return axiosInstance.get(
          `/all-advertisements/${user_id}?page=${currentPage}`
        );
      } else {
        return axiosInstance.get(`/all-advertisements?page=${currentPage}`);
      }
    },
    {
      onSuccess: (response) => {
        setAds(null);
      },
      refetchInterval: false, // Disables automatic refetching
      // enabled: false,
    }
  );

  // useEffect(() => {
  //   refetchAllAds();
  // }, []);

  return (
    <>
      <Box
        sx={{
          direction: "rtl",
          mx: "15px",
        }}
      >
        <Button
          variant="outlined"
          sx={{ direction: "ltr" }}
          startIcon={<TuneIcon />}
          onClick={() => {
            setOpenFilterDialog(true);
          }}
        >
          {t("filter")}
        </Button>
      </Box>
      {ads?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "100px",
            mb: "100px",
          }}
        >
          <ReportGmailerrorredIcon sx={{ fontSize: "50px" }} />
          <Typography sx={{ textAlign: "" }} variant="h5">
            {t("There Is No Advertisements")}
          </Typography>
        </Box>
      )}
      {ads != null && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              alignContent: "space-around",
              // padding: "15px",
            }}
          >
            {ads?.map((ad) => {
              return (
                <AdvertisementCard
                  // image={`http://127.0.0.1:8000/storage/${ad.cardPhoto}`}
                  image={`${config.baseUrl}/storage/${ad.cardPhoto}`}
                  // title="200 sqm furnished apartment we  we "
                  // image="slide3.jpg"
                  title={ad.title}
                  price={ad.price}
                  newPrice={ad.newPrice}
                  currency={ad.currency}
                  adderss={ad.address}
                  date={ad.created_at}
                  sellOrRent={ad.sellOrRent}
                  id={ad.id}
                  cardWidth="350px"
                  isAdInFavoriteListProp={ad.isAdInFavoriteList}
                  paymentMethodRent={ad.paymentMethodRent}
                />
              );
            })}
          </Box>
        </>
      )}

      {ads == null && (
        <>
          <Typography sx={{ textAlign: "center" }}>
            {t("all advertisements")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              alignContent: "space-around",
              // padding: "15px",
            }}
          >
            {advertisements?.data.data.data.map((ad) => {
              return (
                <AdvertisementCard
                  // image={`http://127.0.0.1:8000/storage/${ad.cardPhoto}`}
                  image={`${config.baseUrl}/storage/${ad.cardPhoto}`}
                  // title="200 sqm furnished apartment we  we "
                  // image="slide3.jpg"
                  title={ad.title}
                  price={ad.price}
                  newPrice={ad.newPrice}
                  currency={ad.currency}
                  adderss={ad.address}
                  date={ad.created_at}
                  sellOrRent={ad.sellOrRent}
                  id={ad.id}
                  cardWidth="350px"
                  isAdInFavoriteListProp={ad.isAdInFavoriteList}
                  paymentMethodRent={ad.paymentMethodRent}
                />
              );
            })}

            {/* {Array.from({ length: 25 }).map((n) => {
            return (
              <AdvertisementCard
                // image="https://source.unsplash.com/random?wallpapers"
                image="slide3.jpg"
                // title="200 sqm furnished apartment we  we "
                title="200 sqm furnished apartment"
                price="200000000"
                newPrice="175000000"
                currency="SP"
                adderss="Syria - Damascus"
                sellOrRent="Rent"
              />
            );
          })} */}
          </Box>
          <Box
            sx={{
              m: 5,
              // backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={advertisements?.data.data.last_page}
              // count={6}
              page={currentPage}
              onChange={(event, value) => {
                console.log("xxxxxxxxxxxx :", value);
                setCurrentPage(value);
              }}
              color="primary"
            />
          </Box>
        </>
      )}
      {/* filter dialog */}
      <Box
        sx={{
          direction: "rtl",
          mx: "15px",
        }}
      >
        <FilterDialog
          openFilterDialog={openFilterDialog}
          setOpenFilterDialog={setOpenFilterDialog}
        />
      </Box>
      <LoadingDialog openDialog={advertisementsIsLoading} />
    </>
  );
}

export default AdvertisementsCardsViewer;
