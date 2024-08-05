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
import SvgIcon from "@mui/material/SvgIcon";
// import Car from "../icons/Electrical devices.svg";
import { Box } from "@mui/material";

function Home() {
  const theme = useTheme();
  const [ads, setAds] = useState(null);
  
  return (
    <>
      <ShareAdvertisementsContext.Provider value={{ ads, setAds }}>
        <MainAppBar />
        <MainSlider />
        <CategoriesSlider />

        <SvgIcon
          sx={{
            fontSize: "50px",
            color: "blue",
            // backgroundColor:"red",
            // padding:"2px"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            // width="200"
            // height="200"
          >
            <path d="M20.92,10.23l-.01-.016-4.383-6.288c-.841-1.206-2.221-1.926-3.691-1.926h-4.836c-1.858,0-3.55,1.167-4.208,2.905L1.662,10.523c-.997,.618-1.662,1.721-1.662,2.977v2.5c0,1.103,.897,2,2,2v1c0,1.654,1.346,3,3,3s3-1.346,3-3v-1h8v1c0,1.654,1.346,3,3,3s3-1.346,3-3v-1c1.103,0,2-.897,2-2v-1.5c0-1.985-1.292-3.674-3.08-4.27Zm-5.213-5.731l3.835,5.502H11V3h1.836c1.144,0,2.217,.56,2.871,1.499Zm-10.979,.761c.512-1.352,1.827-2.259,3.272-2.259h2v7H3.5c-.201,0-.397,.017-.589,.05l1.816-4.79Zm2.272,13.741c0,1.103-.897,2-2,2s-2-.897-2-2v-1H7v1Zm14,0c0,1.103-.897,2-2,2s-2-.897-2-2v-1h4v1Zm2-3c0,.551-.448,1-1,1H2c-.552,0-1-.449-1-1v-2.5c0-1.378,1.121-2.5,2.5-2.5H19.5c1.93,0,3.5,1.57,3.5,3.5v1.5Z" />
          </svg>
        </SvgIcon>

        <Grid container spacing={1} /*sx={{direction: "rtl"}}*/>
          <Grid item xs={9}>
            <AdvertisementsCardsViewer />
          </Grid>
          <Grid
            item
            xs={3}
            sx={
              {
                // backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
                // height: "1000px",
                // overflowY: "auto",
              }
            }
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
