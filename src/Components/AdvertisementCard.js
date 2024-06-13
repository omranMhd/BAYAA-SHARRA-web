import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import { useTranslation } from "react-i18next";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import moment from "moment";

export default function AdvertisementCard({
  image,
  title,
  price,
  newPrice,
  currency,
  adderss,
  sellOrRent,
  date,
  paymentMethodRent,
  id,
  cardWidth,
  isAdInFavoriteListProp,
}) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [isAdinMyFavoriteList, setIsAdinMyFavoriteList] = useState(
    isAdInFavoriteListProp
  );

  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();

  const removeAdvertFromFavoriteList = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/remove-ad-favorite/${user_id}/${id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setIsAdinMyFavoriteList(false);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const addAdvertToFavoriteList = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/add-ad-favorite/${user_id}/${id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setIsAdinMyFavoriteList(true);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );
  const adjustDateToTranslate = (datePhrase) => {
    if (
      [
        "a few seconds ago",
        "a minute ago",
        "an hour ago",
        "a day ago",
        "a month ago",
        "a year ago",
      ].includes(datePhrase)
    ) {
      return t(datePhrase);
    } else {
      const digitRegex = /\d+/g;
      const number = Number(datePhrase.match(digitRegex)[0]);
      let phraseWithoutNumbers = datePhrase.replace(/\d/g, "").trim();
      let phraseWithoutAgo = phraseWithoutNumbers.replace("ago", "").trim();

      if (phraseWithoutAgo === "minutes") {
        return t("minutes ago", { count: number });
      } else if (phraseWithoutAgo === "hours") {
        return t("hours ago", { count: number });
      } else if (phraseWithoutAgo === "days") {
        return t("days ago", { count: number });
      } else if (phraseWithoutAgo === "months") {
        return t("months ago", { count: number });
      } else if (phraseWithoutAgo === "years") {
        return t("years ago", { count: number });
      }

      // console.log("number :", number);
      // console.log("phraseWithoutNumbers :", phraseWithoutNumbers);
      // // console.log("phraseWithoutAgo :", phraseWithoutAgo);
      // return datePhrase;
    }
  };

  return (
    <Card
      sx={{
        direction: i18n.language === "en" ? "ltr" : "rtl",

        width: cardWidth === "auto" ? null : cardWidth,
        // height: "350px",
        borderRadius: "25px",
        margin: 1,
        // backgroundColor: theme.palette.WHITE,
        // boxShadow: "10px 10px 5px 0px rgba(0, 0, 0, 0.50)",
        "&:hover": {
          boxShadow: "0px 10px 10px 0px rgba(0, 0, 100, 0.50)", // Add a shadow on hover
          scale: "1.01",
        },
        position: "relative",
        // cursor: "pointer",
      }}
    >
      <CardMedia component="img" height="200" image={image} alt="Paella dish" />
      <CardContent
        sx={{
          cursor: "pointer",
          padding: "10px",
        }}
        onClick={() => {
          // هون خدعة لحل مشكلة التنقل من اعلان لاعلان لاجبار الصفحة على التحديث
          // عن طريق التوجه الى صفحة أخرى بديلة ومن ثم داخل هذه الصفحة اقوم بالرجوع الى صفحة تفاصيل اعلان

          navigate(`/ad-details/${id}`);
          // navigate(`/test-nav/${id}`);
        }}
      >
        <Typography
          variant="h6"
          // sx={{ whiteSpace: "nowrap" }}
          color={theme.palette.LIGHT_BLUE}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: "5px",
            color: theme.palette.BLACK_or_WHITE,
          }}
        >
          {/* {newPrice != null && (
            <>
              <del style={{ color: "red" }}>{`${newPrice
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `}</del>{" "}
              {` ${currency} - `}
            </>
          )}

          {`${price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`} */}

          {/* price and newPrice if exist */}
          {price != null &&
            (newPrice == null ? (
              // اذا ماكان في سعر جديد
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // border: "1px solid red",
                }}
              >
                {/* price */}
                <Box
                  sx={
                    {
                      // border: "1px solid blue",
                    }
                  }
                >
                  <Typography variant="h6">
                    {`${price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`}
                  </Typography>
                </Box>
                {/* طريقة الدفع في حال كان اجار */}
                <Typography>
                  {sellOrRent === "rent" &&
                    `${
                      i18n.language === "en" ? "/" : "\\"
                    } ${paymentMethodRent}`}
                </Typography>
              </Box>
            ) : (
              // اذا كان في سعر جديد
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // border: "1px solid red",
                }}
              >
                {/* old price */}
                <Box
                  sx={
                    {
                      // border: "1px solid blue",
                    }
                  }
                >
                  <Typography variant="h6">
                    <>
                      <del style={{ color: "red" }}>{`${price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `}</del>{" "}
                      {` ${currency}`}
                    </>
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    color: theme.palette.LIGHT_BLUE,
                  }}
                >
                  -
                </Typography>
                {/* new price */}
                <Box
                  sx={
                    {
                      // border: "1px solid blue",
                    }
                  }
                >
                  <Typography variant="h6">
                    {`${newPrice
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                 ${currency}`}
                  </Typography>
                </Box>
                {/* طريقة الدفع في حال كان اجار */}
                <Typography>
                  {sellOrRent === "rent" &&
                    `${
                      i18n.language === "en" ? "/" : "\\"
                    } ${paymentMethodRent}`}
                </Typography>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            color: theme.palette.BLACK_or_WHITE,
            marginTop: "5px",
          }}
        >
          <LocationOnOutlinedIcon
            sx={{
              color: theme.palette.LIGHT_BLUE,
            }}
          />
          <Typography>
            {i18n.language == "en" ? adderss.country_en : adderss.country_ar}
          </Typography>
          {" - "}
          <Typography>
            {i18n.language == "en" ? adderss.city_en : adderss.city_ar}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1px",
        }}
      >
        {
          isUserLogedin &&
            (isAdinMyFavoriteList ? (
              <IconButton
                onClick={() => {
                  removeAdvertFromFavoriteList.mutate();
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: theme.palette.LIGHT_BLUE,
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  addAdvertToFavoriteList.mutate();
                }}
              >
                <FavoriteBorderIcon
                  sx={{
                    color: theme.palette.LIGHT_BLUE,
                  }}
                />
              </IconButton>
            ))

          // <Checkbox
          //   icon={<FavoriteBorder />}
          //   checkedIcon={<Favorite />}
          //   sx={{ color: theme.palette.LIGHT_BLUE_or_DARK_BLUE }}
          //   onClick={() => {
          //     addAdvertToFavoriteList.mutate();
          //   }}
          //   checked={favoriteChecked}
          // />
        }

        <Typography sx={{ margin: "5px", color: theme.palette.BLACK_or_WHITE }}>
          {adjustDateToTranslate(moment(date).fromNow())}
        </Typography>
      </CardActions>
      {sellOrRent != null && (
        <Box
          sx={{
            color: "white",
            backgroundColor:
              sellOrRent === "rent" ? "orange" : theme.palette.DARK_BLUE,
            position: "absolute",
            borderRadius: "15px",
            padding: "5px",
            top: "10px",
            left: "10px",
          }}
        >
          {t(sellOrRent)}
        </Box>
      )}
    </Card>
  );
}
