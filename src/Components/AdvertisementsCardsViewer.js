import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AdvertisementCard from "../Components/AdvertisementCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AdvertisementsCardsViewer() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignContent: "space-around",
          padding: "15px",
        }}
      >
        
        {Array.from({ length: 2 }).map((n) => {
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
              sellOrRent="Sell"
            />
          );
        })}
        {Array.from({ length: 25 }).map((n) => {
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
        })}
      </Box>
      <Stack spacing={2} sx={{ m: 5 }}>
        <Pagination count={10} color="primary" />
      </Stack>
    </>
  );
}

export default AdvertisementsCardsViewer;
