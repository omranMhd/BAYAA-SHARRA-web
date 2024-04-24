import React from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../Components/NavBar";
import PrimarySearchAppBar from "../Components/PrimarySearchAppBar";
import { useNavigate, Link } from "react-router-dom";

/////////////////////////////////////// 1
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Grid from "@mui/material/Grid";
import AdvertisementCard from "../Components/AdvertisementCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import CategorySlide from "../Components/CategorySlide";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
///////////////////////////////////////////////// 2
function Home() {
  //////////////////////////////////////1
  const [t, i18n] = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  /////////////////////////////////////////////////2
  const navigate = useNavigate();
  function onClickHandler() {
    navigate("/profile");
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box
        sx={{
          height: "630px",
          // backgroundImage: "url(omran.jpg)", // Replace with your image path
          // // backgroundSize: "cover", // Adjust the size of the background image
          // backgroundPosition: "center", // Position the background image
          // backgroundRepeat: "no-repeat", // Prevent the background image from repeating
        }}
      >
        <video
          id="background-video"
          src="/testVideo.mp4"
          loop
          muted
          autoPlay
          style={{
            width: "100%",
            height: "630px",
          }}
        />
      </Box>
      <Box
        sx={{
          // height: "60px",
          // backgroundColor: "#d7d7f1",
          padding: "5px",
          // position:"fixed"
          // // backgroundSize: "cover", // Adjust the size of the background image
          // backgroundPosition: "center", // Position the background image
          // backgroundRepeat: "no-repeat", // Prevent the background image from repeating
        }}
      >
        <Box
          sx={{
            fontSize: "40px",
            // width: "300px",
            // backgroundColor: "red",
            // margin:"auto",
            textAlign: "center",
          }}
        >
          Categories
        </Box>
        <Swiper
          modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
          spaceBetween={50}
          navigation={true} // Enable navigation
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="RealEstate" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="DirectionsCarIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="DirectionsCarIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="DirectionsCarIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="DirectionsCarIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="vehicles" />
          </SwiperSlide>
        </Swiper>
        {/* {t("categories")}
        <Button
          onClick={() => {
            i18n.changeLanguage("ar");
          }}
        >
          AR
        </Button>
        <Button
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          EN
        </Button> */}
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={9} sx={{ backgroundColor: "#f0f2f5" }}>
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
        </Grid>
        <Grid item xs={3} sx={{ backgroundColor: "#ebab34" }}>
          Filters
        </Grid>
      </Grid>
      <Box
        sx={{
          height: "300px",
          backgroundColor: "red",
        }}
      >
        Fotter
      </Box>
      {/* <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar> */}
      {/* <NavBar /> */}
    </>
  );
}

export default Home;
