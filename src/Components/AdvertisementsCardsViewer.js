import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AdvertisementCard from "../Components/AdvertisementCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function AdvertisementsCardsViewer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignContent: "space-around",
      }}
    >
      <Link>
        <AdvertisementCard />
      </Link>
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <AdvertisementCard />
      <Stack spacing={2} sx={{ m: 5 }}>
        <Pagination count={10} color="primary" />
      </Stack>
    </Box>
  );
}

export default AdvertisementsCardsViewer;
