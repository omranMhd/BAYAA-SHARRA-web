import React, { useState } from "react";

import MainAppBar from "../Components/MainAppBar";
import AdvertisementsCardsViewer from "../Components/AdvertisementsCardsViewer";
import CategoriesSlider from "../Components/CategoriesSlider";

import MainSlider from "../Components/MainSlider";
import Footer from "../Components/Footer";
import SideFilters from "../Components/SideFilters";

import Grid from "@mui/material/Grid";

import { useTheme } from "@mui/material/styles";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";

function Home() {
  const theme = useTheme();
  const [ads, setAds] = useState([]);
  console.log("aaaaaaaaaaaaaaaaaaaa :", theme.palette.mode);
  return (
    <>
      <ShareAdvertisementsContext.Provider value={{ ads, setAds }}>
        <MainAppBar />
        <MainSlider />
        <CategoriesSlider />

        <Grid container spacing={1} /*sx={{direction: "rtl"}}*/>
          <Grid item xs={9}>
            <AdvertisementsCardsViewer />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
              height:"1000px",
              overflowY:"auto"
            }}
          >
            <SideFilters />
          </Grid>
        </Grid>
        <Footer />
      </ShareAdvertisementsContext.Provider>
    </>
  );
}

export default Home;
