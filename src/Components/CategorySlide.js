import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function CategorySlide(props) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  let icon = "";
  switch (props.categoryName) {
    case "RealEstates":
      icon = (
        <ApartmentIcon
          fontSize="large"
          // style={{ fontSize: "50px", margin: "auto" }}
          style={{ fontSize: "50px", margin: "auto" }}
        />
      );
      break;
    case "vehicles":
      icon = (
        <DirectionsCarIcon
          fontSize="large"
          style={{ fontSize: "50px", margin: "auto" }}
        />
      );
      break;
    default:
      icon = (
        <ReportGmailerrorredIcon
          fontSize="large"
          style={{ fontSize: "50px", margin: "auto" }}
        />
      );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          cursor: "pointer",
          // backgroundColor: "#7717b3",
          borderRadius: "20px",
          padding: "5px",
          border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
        }}
        onClick={() => {
          alert(props.categoryName);
        }}
      >
        {icon}{" "}
        <Typography
          style={{ fontSize: "20px", margin: "auto", textAlign: "center" }}
          // style={{ fontSize: "20px", margin: "auto" }}
        >
          {i18n.language === "en" && props.categoryName}
          {i18n.language === "ar" && props.categoryName_ar}
        </Typography>
      </Box>
    </>
  );
}

export default CategorySlide;
