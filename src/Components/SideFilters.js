import React, { useState } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShareAdvertisementsContext from "../Contexts/ShareAdvertisementsContext";
import { useQuery } from "react-query";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import axiosInstance from "../Axios/axiosInstance";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function RealestateItem({ category_name, category_id }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: realestatesdAdsIsLoading,
    data: realestatesAds,
    refetch: refetchRealEstate,
  } = useQuery(
    `realestates-ads-${category_id}`,
    () => {
      const queryParams = new URLSearchParams({
        category: category_name,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Box
      sx={{
        borderRadius: "10px",
        backgroundColor: "whitesmoke",
        color: "black",
        width: "75px",
        height: "75px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        ":hover": {
          border: "2px solid black",
        },
      }}
      onClick={() => {
        refetchRealEstate();
      }}
    >
      {category_name}
    </Box>
  );
}
function VehicleBrand({ brandPhoto, brandName }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: brandAdsIsLoading,
    data: brandAds,
    refetch: refetchBrand,
  } = useQuery(
    `brand-ads-${brandName}`,
    () => {
      const queryParams = new URLSearchParams({
        category: "Car",
        vehicleBrand: brandName,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Tooltip title={brandName} arrow>
      <Box
        sx={{
          cursor: "pointer",
          ":hover": {
            border: "2px solid black",
          },
          backgroundImage: `url(/vehiclesBrands/${brandPhoto}.png)`,
          backgroundSize: "cover", // Cover the entire Box with the image
          backgroundPosition: "center",
          borderRadius: "10px",
          width: "75px",
          height: "75px",
          margin: "5px",
          // boxSizing: "content-box"
        }}
        onClick={() => {
          refetchBrand();
        }}
      ></Box>
    </Tooltip>
  );
}

function FurnitureItem({ image, category }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: furnitureAdsIsLoading,
    data: furnitureAds,
    refetch: refetchFurniture,
  } = useQuery(
    `furniture-ads-${category}`,
    () => {
      const queryParams = new URLSearchParams({
        category,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Box
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "2px solid black",
        },
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        width: "75px",
        height: "75px",
        margin: "5px",
        // boxSizing: "content-box"
      }}
      onClick={() => {
        refetchFurniture();
      }}
    ></Box>
  );
}

function AnimalsItem({ image, category }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: animalAdsIsLoading,
    data: animalAds,
    refetch: refetchAnimal,
  } = useQuery(
    `animals-ads-${category}`,
    () => {
      const queryParams = new URLSearchParams({
        category,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Box
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "2px solid black",
        },
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        width: "75px",
        height: "75px",
        margin: "5px",
        // boxSizing: "content-box"
      }}
      onClick={() => {
        refetchAnimal();
      }}
    ></Box>
  );
}

function MobileBrands({ image, brand }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: animalAdsIsLoading,
    data: animalAds,
    refetch: refetchAnimal,
  } = useQuery(
    `mobile-ads-${brand}`,
    () => {
      const queryParams = new URLSearchParams({
        category: "Mobile",
        mobOrTabBrand: brand,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Box
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "2px solid black",
        },
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        width: "75px",
        height: "75px",
        margin: "5px",
        // boxSizing: "content-box"
      }}
      onClick={() => {
        refetchAnimal();
      }}
    ></Box>
  );
}
function ComputerBrands({ image, brand }) {
  const isUserLogedin = useUserLogedin();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: animalAdsIsLoading,
    data: animalAds,
    refetch: refetchAnimal,
  } = useQuery(
    `computer-ads-${brand}`,
    () => {
      const queryParams = new URLSearchParams({
        category: "Computer",
        computerBrand: brand,
      });

      if (isUserLogedin) {
        const user_id = JSON.parse(localStorage.getItem("user")).id;

        return axiosInstance.get(
          `/advertisements-filter/${user_id}?${queryParams.toString()}`
        );
      } else {
        return axiosInstance.get(
          `/advertisements-filter?${queryParams.toString()}`
        );
      }
    },
    {
      onSuccess: (response) => {
        console.log("rrr :", response.data.data);
        setAds(response.data.data);
      },
      refetchInterval: false, // Disables automatic refetching
      enabled: false,
    }
  );
  return (
    <Box
      sx={{
        cursor: "pointer",
        ":hover": {
          border: "2px solid black",
        },
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // Cover the entire Box with the image
        backgroundPosition: "center",
        borderRadius: "10px",
        width: "75px",
        height: "75px",
        margin: "5px",
        // boxSizing: "content-box"
      }}
      onClick={() => {
        refetchAnimal();
      }}
    ></Box>
  );
}
function SideFilters() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [showedVehicleBrands, setShowedVehicleBrands] = useState(12);
  const { data: vehiclesBrandsResponse } = useQuery(
    "vehicles-brands",
    () => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.get("/vehicles-brands");
    },
    {
      select: (data) => {
        return data.data;
      },
    }
  );
  return (
    <Box
      sx={{
        // backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("RealEstates")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <RealestateItem category_name={"Apartment"} category_id={15} />
        <RealestateItem category_name={"Farm"} category_id={16} />
        <RealestateItem category_name={"Land"} category_id={17} />
        <RealestateItem category_name={"Store"} category_id={18} />
        <RealestateItem category_name={"Office"} category_id={19} />
        <RealestateItem category_name={"Chalet"} category_id={20} />
        <RealestateItem category_name={"Villa"} category_id={21} />
      </Box>

      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("vehicles")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        {vehiclesBrandsResponse?.data
          .slice(0, showedVehicleBrands)
          .map((brand, index) => {
            return (
              <>
                {/* {index} */}
                <VehicleBrand
                  brandPhoto={brand.brand.en}
                  brandName={brand.brand.en}
                />
              </>
            );
          })}
      </Box>

      {showedVehicleBrands !== vehiclesBrandsResponse?.data.length ? (
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            border: "1px solid #fff ",
            width: "75%",
            marginX: "auto",
            mt: "10px",
            mb: "10px",
            ":hover": {
              borderColor: "#000", // Change border color on hover
            },
          }}
          onClick={() => {
            setShowedVehicleBrands(vehiclesBrandsResponse?.data.length);
          }}
          startIcon={<KeyboardArrowDownIcon />}
        >
          Show More
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{
            color: "#fff",
            border: "1px solid #fff ",
            width: "75%",
            marginX: "auto",
            mt: "10px",
            mb: "10px",
            ":hover": {
              borderColor: "#000", // Change border color on hover
            },
          }}
          onClick={() => {
            setShowedVehicleBrands(12);
          }}
          startIcon={<KeyboardArrowUpIcon />}
        >
          Show Less
        </Button>
      )}

      {/* <Button
        variant="outlined"
        style={{ backgroundColor: "#fff", color: "#000", width: "75%" }}
        startIcon={<KeyboardArrowUpIcon />}
      >
        Show Less
      </Button> */}
      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("mobile")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <MobileBrands image={"/iphone.png"} brand={"IPHONE"} />
        <MobileBrands image={"/samsung.png"} brand={"SAMSUNG"} />
        <MobileBrands image={"/huawei.png"} brand={"HUAWEI"} />
        <MobileBrands image={"/sony.png"} brand={"SONY"} />
        <MobileBrands image={"/blackberry.png"} brand={"BLACKBERRY"} />
        <MobileBrands image={"/nokia.png"} brand={"NOKIA"} />
        <MobileBrands image={"/htc.png"} brand={"HTC"} />
        <MobileBrands image={"/xiaomi.png"} brand={"XIAOMI"} />
      </Box>
      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("computer")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <ComputerBrands image={"/iphone.png"} brand={"IPHONE"} />
        <ComputerBrands image={"/asus.png"} brand={"ASUS"} />
        <ComputerBrands image={"/dell.png"} brand={"DELL"} />
        <ComputerBrands image={"/hp.png"} brand={"HP"} />
        <ComputerBrands image={"/toshiba.png"} brand={"TOSHIBA"} />
        <ComputerBrands image={"/acer.png"} brand={"ACER"} />
        <ComputerBrands image={"/lenovo.png"} brand={"LENOVO"} />
      </Box>
      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("Furniture")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <FurnitureItem image={"/bedroom.png"} category={"Bedroom"} />
        <FurnitureItem image={"/bed.png"} category={"Bed"} />
        <FurnitureItem image={"/capinet.png"} category={"Cabinet"} />
        <FurnitureItem image={"/chair.png"} category={"Chair"} />
        <FurnitureItem image={"/kanab.png"} category={"Sofa"} />
        <FurnitureItem image={"/table.png"} category={"Table"} />
      </Box>
      <Typography
        sx={{ textAlign: "center", backgroundColor: "black", color: "wheat" }}
      >
        {t("Animals")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <AnimalsItem image={"/birds.png"} category={"Birds"} />
        <AnimalsItem image={"/cats.png"} category={"Cat"} />
        <AnimalsItem image={"/dogs.png"} category={"Dog"} />
        <AnimalsItem image={"/fish.png"} category={"Fish"} />
        <AnimalsItem image={"/maoashi.png"} category={"Livestock"} />
      </Box>
    </Box>
  );
}

export default SideFilters;
