import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";

// import { styled } from '@mui/system';

// const StyledGridItem = styled(Grid)({
//     backgroundColor: 'blue',
//     color: 'white',
//     '&:hover': {
//       backgroundColor: 'darkblue',
//     },
//   });
function GridItem({ label, value }) {
  const theme = useTheme();
  return (
    <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <HomeIcon
            sx={{
              color: theme.palette.LIGHT_BLUE,
              marginX:"10px"
            }}
          />{" "}
          <Typography>{label} :</Typography>
        </Box>
        <Box>{value}</Box>
      </Box>
      <Divider
        sx={{ width: "100%", backgroundColor: theme.palette.LIGHT_BLUE }}
      />
    </Grid>
  );
}

function AdditionalAdvertisementInfo({ adCategory, additionalInfo }) {
  return (
    <Box>
      <Typography>{adCategory}</Typography>
      {adCategory === "Apartment" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Room Count"} value={additionalInfo.roomCount} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Farm" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor Count"} value={additionalInfo.floorCount} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Room Count"} value={additionalInfo.roomCount} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Ownership"} value={additionalInfo.ownership} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Land" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Commercial store" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Office" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Room Count"} value={additionalInfo.roomCount} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {adCategory === "Chalet" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor"} value={additionalInfo.floor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Room Count"} value={additionalInfo.roomCount} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Villa" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Area"} value={additionalInfo.area} />
            <GridItem label={"Floor Count"} value={additionalInfo.floorCount} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Room Count"} value={additionalInfo.roomCount} />
            <GridItem label={"Cladding"} value={additionalInfo.cladding} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"ownership"} value={additionalInfo.ownership} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Direction"} value={additionalInfo.direction} />
          </Grid>
        </Box>
      )}
      {[
        "Car",
        "Motorcycle",
        "Truck",
        "Bus",
        "Jabala",
        "Crane",
        "Bulldozer",
      ].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Model"}
              value={`${additionalInfo.brand} ${additionalInfo.model}`}
            />
            <GridItem label={"Color"} value={additionalInfo.color} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Gear"} value={additionalInfo.gear} />
            <GridItem
              label={"Manufacture Year"}
              value={additionalInfo.manufactureYear}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Traveled Distance"}
              value={additionalInfo.traveledDistance}
            />
            <GridItem
              label={"Engine Capacity"}
              value={additionalInfo.engineCapacity}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Fuel"} value={additionalInfo.fuel} />
            <GridItem
              label={"Sell Or Rent"}
              value={additionalInfo.sellOrRent}
            />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Paint Status"}
              value={additionalInfo.paintStatus}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Spare parts" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Vehicle Type"}
              value={additionalInfo.vehicleType}
            />
            <GridItem label={"Status"} value={additionalInfo.status} />
          </Grid>
        </Box>
      )}
      {["Mobile", "Tablet"].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Model"}
              value={`${additionalInfo.brand} ${additionalInfo.category}`}
            />
            <GridItem label={"Status"} value={additionalInfo.status} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Ram"} value={additionalInfo.ram} />
            <GridItem label={"Hard"} value={additionalInfo.hard} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Battery Status"}
              value={additionalInfo.batteryStatus}
            />
          </Grid>
        </Box>
      )}
      {adCategory === "Computer" && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Model"}
              value={`${additionalInfo.brand} ${additionalInfo.category}`}
            />
            <GridItem label={"Status"} value={additionalInfo.status} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Ram"} value={additionalInfo.ram} />
            <GridItem label={"Hard"} value={additionalInfo.hard} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Battery Status"}
              value={additionalInfo.batteryStatus}
            />
            <GridItem label={"Processor"} value={additionalInfo.processor} />
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"Screen Type"} value={additionalInfo.screenType} />
            <GridItem label={"Screen Size"} value={additionalInfo.screenSize} />
          </Grid>
        </Box>
      )}
      {[
        "Refrigerator",
        "Washing Machine",
        "Fan",
        "Heater",
        "Blenders juicers",
        "Oven Microwave",
        "Screen",
        "Receiver",
        "Solar Energy",
      ].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem
              label={"Device Status"}
              value={additionalInfo.deviceStatus}
            />
          </Grid>
        </Box>
      )}
      {["Bedroom", "Table", "Chair", "Bed", "Cabinet", "Sofa"].includes(
        adCategory
      ) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"status"} value={additionalInfo.status} />
            <GridItem label={"material"} value={additionalInfo.material} />
          </Grid>
        </Box>
      )}
      {["Men", "Women", "children"].includes(adCategory) && (
        <Box>
          <Grid
            container
            spacing={3}
            sx={{
              marginBottom: "10px",
            }}
          >
            <GridItem label={"status"} value={additionalInfo.status} />
            <GridItem label={"Type"} value={additionalInfo.type} />
          </Grid>
        </Box>
      )}
      {[
        "Livestock",
        "Birds",
        "Cat",
        "Dog",
        "Fish",
        "gift",
        "Perfume",
        "Makeup",
        "Watch",
        "Glass",
        "Restaurant",
        "Cafe",
        "Park",
        "Bakery",
        "Book",
        "Stationery",
        "Musical Instrument",
        "Children equipment",
        "Sports and clubs",
        "Industrial equipment",
      ].includes(adCategory) && (
        <Box>
          {/* <Grid container spacing={3} sx={{
            marginBottom:"10px"
          }}>
            <GridItem label={"status"} value={additionalInfo.status} />
            <GridItem label={"Type"} value={additionalInfo.type} />
          </Grid> */}
        </Box>
      )}
    </Box>
  );
}

export default AdditionalAdvertisementInfo;
