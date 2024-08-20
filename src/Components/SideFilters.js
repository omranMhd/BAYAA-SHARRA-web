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
import LoadingDialog from "./LoadingDialog";

function RealestateItem({ category_name, category_id, image }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const { t, i18n } = useTranslation();
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
    <>
      <Tooltip title={t(category_name)} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            },
            backgroundImage: `url(/realestateCategoriesPhoto/${image})`,
            backgroundSize: "cover", // Cover the entire Box with the image
            backgroundPosition: "center",
            borderRadius: "10px",
            width: "75px",
            height: "75px",
            margin: "5px",
            // boxSizing: "content-box"
          }}
          onClick={() => {
            refetchRealEstate();
          }}
        ></Box>
      </Tooltip>
      <LoadingDialog openDialog={realestatesdAdsIsLoading} />
    </>
  );
}
function VehicleBrand({ brandPhoto, brandName, brandNameAr }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const { t, i18n } = useTranslation();
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
    <>
      <Tooltip title={i18n.language === "en" ? brandName : brandNameAr} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
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
      <LoadingDialog openDialog={brandAdsIsLoading} />
    </>
  );
}

function FurnitureItem({ image, categoryEn, categoryAr }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: furnitureAdsIsLoading,
    data: furnitureAds,
    refetch: refetchFurniture,
  } = useQuery(
    `furniture-ads-${categoryEn}`,
    () => {
      const queryParams = new URLSearchParams({
        category: categoryEn,
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
    <>
      <Tooltip title={i18n.language === "en" ? categoryEn : categoryAr} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
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
      </Tooltip>
      <LoadingDialog openDialog={furnitureAdsIsLoading} />
    </>
  );
}

function AnimalsItem({ image, categoryEn, categoryAr }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: animalAdsIsLoading,
    data: animalAds,
    refetch: refetchAnimal,
  } = useQuery(
    `animals-ads-${categoryEn}`,
    () => {
      const queryParams = new URLSearchParams({
        category: categoryEn,
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
    <>
      <Tooltip title={i18n.language === "en" ? categoryEn : categoryAr} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
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
      </Tooltip>
      <LoadingDialog openDialog={animalAdsIsLoading} />
    </>
  );
}

function MobileBrands({ image, brandEn, brandAr }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: mobileBrandsAdsIsLoading,
    data: mobileBrandsAds,
    refetch: refetchMobileBrands,
  } = useQuery(
    `mobile-ads-${brandEn}`,
    () => {
      const queryParams = new URLSearchParams({
        category: "Mobile",
        mobOrTabBrand: brandEn,
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
    <>
      <Tooltip title={i18n.language === "en" ? brandEn : brandAr} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
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
            refetchMobileBrands();
          }}
        ></Box>
      </Tooltip>
      <LoadingDialog openDialog={mobileBrandsAdsIsLoading} />
    </>
  );
}
function ComputerBrands({ image, brandEn, brandAr }) {
  const isUserLogedin = useUserLogedin();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { ads, setAds } = useContext(ShareAdvertisementsContext);
  const {
    isLoading: computerBrandsAdsIsLoading,
    data: computerBrandsAds,
    refetch: refetchComputerBrands,
  } = useQuery(
    `computer-ads-${brandEn}`,
    () => {
      const queryParams = new URLSearchParams({
        category: "Computer",
        computerBrand: brandEn,
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
    <>
      <Tooltip title={i18n.language === "en" ? brandEn : brandAr} arrow>
        <Box
          sx={{
            cursor: "pointer",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            ":hover": {
              border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
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
            refetchComputerBrands();
          }}
        ></Box>
      </Tooltip>
      <LoadingDialog openDialog={computerBrandsAdsIsLoading} />
    </>
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
        position: "sticky",
        top: "70px",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
        <RealestateItem
          category_name={"Apartment"}
          category_id={15}
          image={"apartment.png"}
        />
        <RealestateItem
          category_name={"Farm"}
          category_id={16}
          image={"farm.png"}
        />
        <RealestateItem
          category_name={"Land"}
          category_id={17}
          image={"land.png"}
        />
        <RealestateItem
          category_name={"Store"}
          category_id={18}
          image={"store.png"}
        />
        <RealestateItem
          category_name={"Office"}
          category_id={19}
          image={"office.png"}
        />
        <RealestateItem
          category_name={"Chalet"}
          category_id={20}
          image={"shaleh.png"}
        />
        <RealestateItem
          category_name={"Villa"}
          category_id={21}
          image={"villa.png"}
        />
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
                  brandNameAr={brand.brand.ar}
                />
              </>
            );
          })}
      </Box>

      {showedVehicleBrands !== vehiclesBrandsResponse?.data.length ? (
        <Button
          variant="outlined"
          sx={{
            // color: "#fff",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            // ":hover": {
            //   border: `2px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            // },
            width: "75%",
            marginX: "auto",
            mt: "10px",
            mb: "10px",
          }}
          onClick={() => {
            setShowedVehicleBrands(vehiclesBrandsResponse?.data.length);
          }}
          startIcon={<KeyboardArrowDownIcon />}
        >
          {t("Show More")}
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{
            // color: "#fff",
            border: `1px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            // ":hover": {
            //   border: `3px solid ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
            // },
            width: "75%",
            marginX: "auto",
            mt: "10px",
            mb: "10px",
            // ":hover": {
            //   borderColor: "#000", // Change border color on hover
            // },
          }}
          onClick={() => {
            setShowedVehicleBrands(12);
          }}
          startIcon={<KeyboardArrowUpIcon />}
        >
          {t("Show Less")}
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
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
        <MobileBrands
          image={"mobileBrands/iphone.png"}
          brandEn={"IPHONE"}
          brandAr={"آيفون"}
        />
        <MobileBrands
          image={"mobileBrands/samsung.png"}
          brandEn={"SAMSUNG"}
          brandAr={"سامسونغ"}
        />
        <MobileBrands
          image={"mobileBrands/huawei.png"}
          brandEn={"HUAWEI"}
          brandAr={"هواوي"}
        />
        <MobileBrands
          image={"mobileBrands/sony.png"}
          brandEn={"SONY"}
          brandAr={"سوني"}
        />
        <MobileBrands
          image={"mobileBrands/blackberry.png"}
          brandEn={"BLACKBERRY"}
          brandAr={"بلاك بيري"}
        />
        <MobileBrands
          image={"mobileBrands/nokia.png"}
          brandEn={"NOKIA"}
          brandAr={"نوكيا"}
        />
        <MobileBrands
          image={"mobileBrands/htc.png"}
          brandEn={"HTC"}
          brandAr={"إتش تي سي"}
        />
        <MobileBrands
          image={"mobileBrands/xiaomi.png"}
          brandEn={"XIAOMI"}
          brandAr={"شاومي"}
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
        <ComputerBrands
          image={"computerBrands/iphone.png"}
          brandEn={"IPHONE"}
          brandAr={"ماك"}
        />
        <ComputerBrands
          image={"computerBrands/asus.png"}
          brandEn={"ASUS"}
          brandAr={"أزوس"}
        />
        <ComputerBrands
          image={"computerBrands/dell.png"}
          brandEn={"DELL"}
          brandAr={"ديل"}
        />
        <ComputerBrands
          image={"computerBrands/hp.png"}
          brandEn={"HP"}
          brandAr={"إتش بي"}
        />
        <ComputerBrands
          image={"computerBrands/toshiba.png"}
          brandEn={"TOSHIBA"}
          brandAr={"توشيبا"}
        />
        <ComputerBrands
          image={"computerBrands/acer.png"}
          brandEn={"ACER"}
          brandAr={"أيسر"}
        />
        <ComputerBrands
          image={"computerBrands/lenovo.png"}
          brandEn={"LENOVO"}
          brandAr={"لينوفو"}
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/bedroom.png"}
          categoryEn={"Bedroom"}
          categoryAr={"غرفة نوم"}
        />
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/bed.png"}
          categoryEn={"Bed"}
          categoryAr={"سرير"}
        />
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/capinet.png"}
          categoryEn={"Cabinet"}
          categoryAr={"خزانة"}
        />
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/chair.png"}
          categoryEn={"Chair"}
          categoryAr={"كرسي"}
        />
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/kanab.png"}
          categoryEn={"Sofa"}
          categoryAr={"كنبات"}
        />
        <FurnitureItem
          image={"furnitrueCategoriesPhoto/table.png"}
          categoryEn={"Table"}
          categoryAr={"طاولة"}
        />
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
        }}
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
        <AnimalsItem
          image={"animalsCategoriesPhoto/birds.png"}
          categoryEn={"Birds"}
          categoryAr={"طيور"}
        />
        <AnimalsItem
          image={"animalsCategoriesPhoto/cats.png"}
          categoryEn={"Cat"}
          categoryAr={"قطط"}
        />
        <AnimalsItem
          image={"animalsCategoriesPhoto/dogs.png"}
          categoryEn={"Dog"}
          categoryAr={"كلاب"}
        />
        <AnimalsItem
          image={"animalsCategoriesPhoto/fish.png"}
          categoryEn={"Fish"}
          categoryAr={"أسماك"}
        />
        <AnimalsItem
          image={"animalsCategoriesPhoto/maoashi.png"}
          categoryEn={"Livestock"}
          categoryAr={"مواشي"}
        />
      </Box>
    </Box>
  );
}

export default SideFilters;
