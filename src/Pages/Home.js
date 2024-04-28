import React from "react";

import MainAppBar from "../Components/MainAppBar";
import AdvertisementsCardsViewer from "../Components/AdvertisementsCardsViewer";
import CategoriesSlider from "../Components/CategoriesSlider";

import MainSlider from "../Components/MainSlider";
import Footer from "../Components/Footer";
import SideFilters from "../Components/SideFilters";

import Grid from "@mui/material/Grid";

function Home() {
  return (
    <>
      <MainAppBar />
      <MainSlider />
      <CategoriesSlider />

      <Grid container spacing={1}>
        <Grid item xs={9} sx={{ backgroundColor: "#f0f2f5" }}>
          <AdvertisementsCardsViewer />
        </Grid>
        <Grid item xs={3}>
          <SideFilters />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Home;
