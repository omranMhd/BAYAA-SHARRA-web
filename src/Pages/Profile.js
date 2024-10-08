import React from "react";
import { Outlet, Link } from "react-router-dom";
import MainAppBar from "../Components/MainAppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Footer from "../Components/Footer";
import SideMenuProfile from "../Components/SideMenuProfile";

function Profile() {
  return (
    <>
      <MainAppBar />
      <Grid container spacing={1} /*sx={{direction: "rtl"}}*/>
        <Grid item xs={12} md={3}>
          <SideMenuProfile />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={
              {
                // backgroundColor: "red",
              }
            }
          >
            <Outlet />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Profile;
