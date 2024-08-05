import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PhotoSlide from "./PhotoSlide";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import Skeleton from "@mui/material/Skeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

function MainSlider() {
  const [images, setImages] = useState([]);
  const {
    data: silderImagesData,
    refetch: refetchSilderImages,
    isLoading,
  } = useQuery(
    "silder-images",
    () => {
      return axiosInstance.get("/silder-images");
    },
    {
      onSuccess: (response) => {
        // console.log("aaaaaaaaaaaaa :", response.data);
        setImages(response.data.data);
      },
      // enabled: false,
    }
  );

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={"98%"}
          height={"460px"}
          sx={{
            borderRadius: "10px",
            margin: "10px",
          }}
        />
      ) : (
        <Box>
          <Swiper
            modules={[
              SwiperPagination,
              Scrollbar,
              A11y,
              EffectCoverflow,
              Autoplay,
            ]}
            effect={"coverflow"}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 5000,
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
            {images.map((img) => {
              return (
                <SwiperSlide>
                  <PhotoSlide
                    img={`http://127.0.0.1:8000/storage/${img.url}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      )}
    </>
  );
}

export default MainSlider;
