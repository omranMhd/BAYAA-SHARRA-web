import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

function CategorySlide(props) {
  let icon = "";
  switch (props.iconName) {
    case "ApartmentIcon":
      icon = (
        <>
          <ApartmentIcon
            fontSize="large"
            style={{ fontSize: "50px", margin: "auto" }}
          />
          <Typography style={{ fontSize: "20px", margin: "auto" }}>
            {props.typography}
          </Typography>
        </>
      );
      break;
    case "DirectionsCarIcon":
      icon = (
        <>
          <DirectionsCarIcon
            fontSize="large"
            style={{ fontSize: "50px", margin: "auto" }}
          />
          <Typography style={{ fontSize: "20px", margin: "auto" }}>
            {props.typography}
          </Typography>
        </>
      );
      break;
    default:
      icon = (
        <>
          <ReportGmailerrorredIcon
            fontSize="large"
            style={{ fontSize: "50px", margin: "auto" }}
          />
          <Typography style={{ fontSize: "20px", margin: "auto" ,textAlign:"center"}}>
            {props.typography}
          </Typography>
        </>
      );
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
    </>
  );
}

export default CategorySlide;
