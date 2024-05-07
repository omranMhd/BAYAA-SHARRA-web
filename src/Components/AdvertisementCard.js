import * as React from "react";
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

export default function AdvertisementCard({
  image,
  title,
  price,
  newPrice,
  currency,
  adderss,
  sellOrRent,
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        // direction:"rtl",
        // maxWidth: 300,
        margin: 1,
        backgroundColor: theme.palette.WHITE,
        // boxShadow: "10px 10px 5px 0px rgba(0, 0, 0, 0.50)",
        "&:hover": {
          boxShadow: "0px 10px 10px 0px rgba(0, 0, 100, 0.50)", // Add a shadow on hover
          scale: "1.01",
        },
        position: "relative",
        // cursor: "pointer",
      }}
    >
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          alert("card");
        }}
      >
        <Typography variant="h6" color={theme.palette.DARK_BLUE_or_LIGHT_BLUE}>
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: "10px",
            color: theme.palette.BLACK,
          }}
        >{`${price} ${currency} - ${newPrice} ${currency}`}</Box>
        <Box
          sx={{
            display: "flex",
            color: theme.palette.BLACK,
            marginTop: "5px",
          }}
        >
          <LocationOnOutlinedIcon /> {adderss}
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
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          sx={{ color: theme.palette.DARK_BLUE_or_LIGHT_BLUE }}
        />
        <Typography sx={{ margin: "5px", color: theme.palette.BLACK }}>
          10 minute ago
        </Typography>
      </CardActions>
      <Box
        sx={{
          color: "white",
          backgroundColor: "orange",
          position: "absolute",
          borderRadius: "50%",
          padding: "5px",
          top: "10px",
          left: "10px",
        }}
      >
        {sellOrRent}
      </Box>
    </Card>
  );
}
