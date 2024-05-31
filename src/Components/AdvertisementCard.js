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
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../Axios/axiosInstance";

import useUserLogedin from "../Custom Hooks/useUserLogedin";

export default function AdvertisementCard({
  image,
  title,
  price,
  newPrice,
  currency,
  adderss,
  sellOrRent,
  id,
  cardWidth,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [favoriteChecked, setFavoriteChecked] = useState(false);
  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();

  console.log("fffffffff", isUserLogedin);

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
        if (response.status == 201) {
          setFavoriteChecked(true);
        } else if (response.status == 200) {
          setFavoriteChecked(false);
        }
        // setFavoriteChecked
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

  return (
    <Card
      sx={{
        // direction:"rtl",
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
          // alert(id);
          navigate(`/ad-details/${id}`);
        }}
      >
        <Typography variant="h6" color={theme.palette.LIGHT_BLUE_or_DARK_BLUE}>
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: "5px",
            color: theme.palette.BLACK_or_WHITE,
          }}
        >
          {newPrice != null && (
            <>
              <del style={{ color: "red" }}>{`${newPrice
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} `}</del>{" "}
              {` ${currency} - `}
            </>
          )}

          {`${price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency}`}
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
              color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
            }}
          />{" "}
          {adderss}
        </Box>
      </CardContent>
      {/* <Checkbox
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        sx={{ color: theme.palette.DARK_BLUE_or_LIGHT_BLUE }}
      /> */}
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1px",
        }}
      >
        {isUserLogedin && (
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            sx={{ color: theme.palette.LIGHT_BLUE_or_DARK_BLUE }}
            onClick={() => {
              addAdvertToFavoriteList.mutate();
            }}
            checked={favoriteChecked}
          />
        )}

        <Typography sx={{ margin: "5px", color: theme.palette.BLACK_or_WHITE }}>
          10 minute ago
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
          {sellOrRent}
        </Box>
      )}
    </Card>
  );
}
