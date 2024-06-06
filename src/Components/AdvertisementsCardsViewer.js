import React from "react";
import Box from "@mui/material/Box";
import { Link, json } from "react-router-dom";
import AdvertisementCard from "../Components/AdvertisementCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useQuery } from "react-query";
import axiosInstance from "../Axios/axiosInstance";

function AdvertisementsCardsViewer() {
  const { isLoading: mainCategoriesIsLoading, data: advertisements } = useQuery(
    "get-advertisements",
    () => {
      const user_id = JSON.parse(localStorage.getItem("user")).id;
      if (user_id != null || user_id != undefined) {
        return axiosInstance.get(`/all-advertisements/${user_id}`);
      } else {
        return axiosInstance.get("/all-advertisements");
      }
    }
  );

  console.log("adadadadad :", advertisements?.data.data);
  return (
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
        {advertisements?.data.data.map((ad) => {
          return (
            <AdvertisementCard
              image={`http://127.0.0.1:8000/storage/${ad.cardPhoto}`}
              // title="200 sqm furnished apartment we  we "
              // image="slide3.jpg"
              title={ad.title}
              price={ad.price}
              newPrice={ad.newPrice}
              currency={ad.currency}
              adderss={`${JSON.parse(ad.address).country} - ${
                JSON.parse(ad.address).city
              }`}
              sellOrRent={ad.sellOrRent}
              id={ad.id}
              cardWidth="350px"
              isAdInFavoriteListProp={ad.isAdInFavoriteList}
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
        <Pagination count={10} color="primary" />
      </Box>
    </>
  );
}

export default AdvertisementsCardsViewer;
