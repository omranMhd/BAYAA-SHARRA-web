import React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CottageIcon from "@mui/icons-material/Cottage";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useQuery, useMutation } from "react-query";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import axiosInstance from "../Axios/axiosInstance";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AdvertisementCard from "../Components/AdvertisementCard";
import config from "../config";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";


/////////////////////////////////

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

///////////////////////////

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  // backgroundColor: "white",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: "5px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const { t, i18n } = useTranslation();
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const navigate = useNavigate();
  const [openShowSearchedAdsDialog, setOpenShowSearchedAdsDialog] =
    useState(false);
  const [searchedAds, setSearchedAds] = useState(null);

  const getsearchedAdsMutation = useMutation(
    (queryParams) => {
      console.log("queryParams :", queryParams);
      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-search/${user_id}?${queryParams}`
        );
      } else {
        return axiosInstance.get(`/advertisements-search?${queryParams}`);
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
        setSearchedAds(response.data.data);

        setOpenShowSearchedAdsDialog(true);
      },
      onError: (error) => {
        // Handle any errors here
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const { isLoading: mainCategoriesIsLoading, data: mainCategories } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    }
  );

  console.log("openShowSearchedAdsDialog :", openShowSearchedAdsDialog);

  return (
    <>
      <Box
        sx={{
          // direction:"rtl",
          display: "flex",
          flexWrap: "nowrap",
          // border: "2px solid #000",
          padding: "1px",
          borderRadius: "20px",
          mr: "40px",
          boxShadow: "0px 0px 1px 1px #153258",
          "&:hover": {
            // backgroundColor: alpha(theme.palette.common.white, 0.50),
            // border: "3px solid #153258",
            boxShadow: "0px 0px 2px 2px #153258",
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px 0px 0px 20px",
          }}
          disabled={getsearchedAdsMutation.isLoading}
          onClick={() => {
            const queryParams = new URLSearchParams({
              search: searchText,
            }).toString();

            // alert(queryParams);
            if (searchText !== "") {
              getsearchedAdsMutation.mutate(queryParams);
            }
          }}
        >
          {getsearchedAdsMutation.isLoading ? (
            <CircularProgress size={25} style={{ color: "white" }} />
          ) : (
            <SearchIcon />
          )}
        </Button>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "0px 20px 20px 0px",
            display: "flex",
            flexWrap: "nowrap",
            position: "relative",
            // border: "1px solid red",
            // direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          {searchText === "" && (
            <Box
              sx={{
                color: "black",
                position: "absolute",
                zIndex: "0",
                left: "20px",
                pt: "6px",
                // backgroundColor: "red",
                // border: "1px solid red",
                // width: "250px",
                width: "90%",
                //   height: "500px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              {/* <DirectionsCarIcon /> */}
              {/* <CottageIcon /> */}
              {/* <DomainIcon /> */}

              {i18n.language === "en" && (
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    mr: "2px",
                  }}
                >
                  Search in
                </Typography>
              )}

              <Swiper
                modules={[
                  SwiperPagination,
                  Scrollbar,
                  A11y,
                  EffectCoverflow,
                  Autoplay,
                ]}
                //   effect={"coverflow"}
                spaceBetween={25}
                slidesPerView={1}
                loop={true}
                //   direction={"vertical"}
                // onSlideChange={() => console.log("slide change")}
                // onSwiper={(swiper) => console.log(swiper)}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                fadeEffect={{ crossFade: true }} // Additional options for the fade effect
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
              >
                {mainCategories?.data.data.map((category) => {
                  return (
                    <SwiperSlide id={category.id}>
                      <Box
                        sx={{
                          display: "flex",
                          // justifyContent: "space-between",
                          justifyContent: "right",
                          flexWrap: "nowrap",
                          color: "#153258",
                          // backgroundColor: "wheat",
                          // border: "1px solid blue",
                          width: "60%",
                        }}
                      >
                        <Typography
                          sx={{
                            mr: "2px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {i18n.language === "en"
                            ? category.name_en
                            : category.name_ar}
                        </Typography>
                        {/* <CottageIcon /> */}
                        <img
                          width="25px"
                          height="25px"
                          style={{ marginLeft: "5px", marginRight: "5px" }}
                          src={`/icons/${category.name_en}.png`}
                          alt="rr"
                        />
                        {/* <Box
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
                          src={`/icons/${category.name_en}.png`}
                          alt="rr"
                        />
                      </Box> */}
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {i18n.language === "ar" && (
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    mr: "2px",
                  }}
                >
                  البحث في
                </Typography>
              )}
            </Box>
          )}

          <StyledInputBase
            // placeholder={t("search")}
            inputProps={{ "aria-label": "search" }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // alert(e.target.value);

                const queryParams = new URLSearchParams({
                  search: searchText,
                }).toString();

                if (searchText !== "") {
                  getsearchedAdsMutation.mutate(queryParams);
                }
              }
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {searchText !== "" && (
            <IconButton
              size="small"
              onClick={() => {
                setSearchText("");
              }}
              aria-label="clear"
              sx={{
                color: "black",
                mr: "5px",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Dialog
          open={openShowSearchedAdsDialog}
          // open={true}
          onClose={() => {
            setOpenShowSearchedAdsDialog(false);
          }}
          sx={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            {t("search result")}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                alignContent: "space-around",
                // padding: "15px",
              }}
            >
              {searchedAds?.length === 0 && (
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
              {searchedAds?.map((ad) => {
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
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenShowSearchedAdsDialog(false);
              }}
            >
              {t("Skip")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default SearchInput;
