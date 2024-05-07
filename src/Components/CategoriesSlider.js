import React from "react";
import Box from "@mui/material/Box";
import axiosInstance from "../Axios/axiosInstance";
import { useQuery } from "react-query";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
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

function CategoriesSlider() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { isLoading: mainCategoriesIsLoading, data: mainCategories } = useQuery(
    "main-categories",
    () => {
      return axiosInstance.get("/main-categories");
    }
  );
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb :", mainCategories?.data);
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
        <Box
          sx={{
            // backgroundColor:
            //   theme.palette.mode === "light"
            //     ? "#f4f4f4"
            //     : theme.palette.DARK_BLUE,
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <Swiper
            modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
            spaceBetween={50}
            navigation={true} // Enable navigation
            // slidesPerView={7}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {mainCategories?.data.map((category) => {
              return (
                <SwiperSlide>
                  <CategorySlide
                    iconName="ApartmentIcon"
                    typography={t(category)}
                    categoryName={category}
                  />
                </SwiperSlide>
              );
            })}
            {/* <SwiperSlide>
            <CategorySlide iconName="ApartmentIcon" typography="RealEstate" />
          </SwiperSlide>
          <SwiperSlide>
            <CategorySlide iconName="DirectionsCarIcon" typography="vehicles" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide
              iconName="!"
              typography="Electrical & Electronic Devices"
            />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Furniture" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Animals" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Personal collections" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Clothing and fashion" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Food and drinks" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Services" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Jobs" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Books and hobbies" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide
              iconName="!"
              typography="Toys Children's equipment"
            />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Sports and clubs" />
          </SwiperSlide>

          <SwiperSlide>
            <CategorySlide iconName="!" typography="Industrial equipment " />
          </SwiperSlide> */}
          </Swiper>
        </Box>
      )}
    </Box>
  );
}

export default CategoriesSlider;
