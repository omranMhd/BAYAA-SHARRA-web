import React, { useRef } from "react";
import Box from "@mui/material/Box";
import axiosInstance from "../Axios/axiosInstance";
import { useQuery } from "react-query";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Link } from "react-router-dom";
import CategorySlide from "../Components/CategorySlide";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { IconButton } from "@mui/material";

function CategoriesSlider() {
  const swiperRef = useRef(null);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { isLoading: mainCategoriesIsLoading, data: mainCategories } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    }
  );
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb :", mainCategories?.data.data);
  return (
    <Box
      sx={{
        // backgroundColor: "#d7d7f1",
        padding: "10px",
      }}
    >
      {/* <Box
        sx={{
          fontSize: "30px",
          backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
          color: "white",
          textAlign: "center",
          marginBottom: "5px",
          // direction: "rtl"
          width: "200px",
          borderRadius: "50px",
          margin:"auto"

          // borderRadius: "50px",
        }}
      >
        <Typography
          variant="string"
          // align="center"
          sx={{
            // ml: "20px",
            mb: "5px",
            // backgroundColor: "#111111",
          }}
        >
          {/* CATEGORIES */}
      {/* {t("categories")} */}
      {/* </Typography> */}
      {/* </Box> */}
      {mainCategoriesIsLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {[...Array(7)].map(() => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                <Skeleton variant="circular" width={60} height={60} />
                <Skeleton variant="text" sx={{ fontSize: "30px" }} />
              </Box>
            );
          })}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
              direction: i18n.language === "en" ? "ltr" : "rtl",
            }}
          >
            <Typography variant="h4">{t("categories")}</Typography>
            <Box
              sx={{
                height: "4px",
                width: "10%",
                backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
                borderRadius: "4px",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              // backgroundColor:
              //   theme.palette.mode === "light"
              //     ? "#f4f4f4"
              //     : theme.palette.DARK_BLUE,
              borderRadius: "15px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => {
                if (swiperRef.current && swiperRef.current.swiper) {
                  swiperRef.current.swiper.slidePrev();
                }
              }}
            >
              <ArrowBackIosNewRoundedIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </IconButton>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
              spaceBetween={10}
              // navigation={true} // Enable navigation
              // slidesPerView={7}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <CategorySlide
                  categoryName="All"
                  categoryName_ar="الكل"
                  category_id={"all"}
                />
              </SwiperSlide>
              {mainCategories?.data.data.map((category) => {
                return (
                  <SwiperSlide>
                    <CategorySlide
                      categoryName={category.name_en}
                      categoryName_ar={category.name_ar}
                      category_id={category.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <IconButton
              onClick={() => {
                if (swiperRef.current && swiperRef.current.swiper) {
                  swiperRef.current.swiper.slideNext();
                }
              }}
            >
              <ArrowForwardIosRoundedIcon
                sx={{
                  fontSize: "40px",
                }}
              />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}

export default CategoriesSlider;
