import React, { useEffect, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useQuery, useMutation } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import LogoutIcon from "@mui/icons-material/Logout";

function SideMenuProfile() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("user-info");
  // }, []);
  const updateUserPhotoMutation = useMutation(
    (data) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/update-user-info/${user.id}`, data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        localStorage.setItem("user", JSON.stringify(response.data.data));
        setNewProfilePhoto(null);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        // email or phone already been taken
        if (error.response.status === 422) {
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.message);
          console.log("xxxxxxxxxxxxxxxxxxxxxxx :", error.response.data.errors);
          if ("email" in error.response.data.errors) {
            // setEmailExist(error.response.data.errors.email);
          } else if ("phone" in error.response.data.errors) {
            // setPhoneExist(error.response.data.errors.phone);
          }
          // setEmailExist(error.response.data.message);
          // setPhoneExist(error.response.data.message);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const postLogoutMutation = useMutation(
    () => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/logout");
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        // remove (user info and its token ) from local Storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // // after that go to verevication-code page
        navigate("/");
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

  const user = JSON.parse(localStorage.getItem("user"));
  const userFullName = `${user.firstName} ${user.lastName}`;

  const currentProfilePhoto =
    user.image === null
      ? "/uesrPhoto.png"
      : `http://127.0.0.1:8000/storage/${user.image}`;

  console.log("currentProfilePhoto :", currentProfilePhoto);

  const handleFileChange = (event) => {
    setNewProfilePhoto(event.target.files[0]);
  };

  const handleButtonClick = (input_id) => {
    // Trigger the file input click event
    document.getElementById(input_id).click();
  };

  return (
    <Box
      sx={{
        // backgroundColor: "#ededeb",
        backgroundColor: theme.palette.DARK_BLUE_or_LIGHT_BLUE,
        pt: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // position:"fixed"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
        }}
      >
        {userFullName}
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "200px",
          height: "200px",
          borderRadius: "100%",
          backgroundImage:
            newProfilePhoto != null
              ? `url(${URL.createObjectURL(newProfilePhoto)})`
              : `url(${currentProfilePhoto})`,
          //   backgroundImage: currentProfilePhoto,
          //   backgroundImage: `url("http://127.0.0.1:8000/storage/${currentProfilePhoto}")`,
          //   backgroundImage:
          //     profilePhoto != null
          //       ? `url(${URL.createObjectURL(profilePhoto)})`
          //       : "url(/omran.jpg)",
          backgroundSize: "cover", // Cover the entire Box with the image
          backgroundPosition: "center",
          mx: "auto",
          boxShadow: `0px 0px 2px 6px ${theme.palette.LIGHT_BLUE_or_DARK_BLUE}`,
          mt: "10px",
          mb: "10px",
        }}
      ></Box>
      {/* hidden input field */}
      <TextField
        id={"profile_photo"}
        type="file"
        inputProps={{
          accept:
            // "image/jpeg,image/png,image/gif,image/bmp,image/webp", // Specify the accepted image formats here
            "image/jpeg,image/png,image/gif", // Specify the accepted image formats here
        }}
        sx={{ display: "none" }}
        onChange={(event) => handleFileChange(event)}
      />
      {newProfilePhoto == null ? (
        <Button
          sx={{ width: "75%" }}
          size="small"
          variant="contained"
          endIcon={<EditIcon />}
          onClick={() => {
            handleButtonClick("profile_photo");
          }}
        >
          {t("Edit Photo")}
        </Button>
      ) : (
        <Button
          sx={{ width: "75%", color: "white" }}
          size="small"
          variant="outlined"
          endIcon={<SaveIcon />}
          onClick={() => {
            const formData = new FormData();
            formData.append("image", newProfilePhoto);
            updateUserPhotoMutation.mutate(formData);
          }}
          disabled={updateUserPhotoMutation.isLoading}
        >
          {updateUserPhotoMutation.isLoading ? (
            <CircularProgress size={25} style={{ color: "white" }} />
          ) : (
            t("Save Photo")
          )}
        </Button>
      )}

      <List
        sx={{
          width: "100%",
        }}
      >
        <ListItem
          disablePadding
          sx={
            location.pathname === "/profile/user-info"
              ? {
                  backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                  color: "white",
                }
              : {}
          }
        >
          <ListItemButton
            onClick={() => {
              navigate("user-info");
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={t("User Information")} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={
            location.pathname === "/profile/user-advertisements"
              ? {
                  backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
                  color: "white",
                }
              : {}
          }
        >
          <ListItemButton
            onClick={() => {
              navigate("user-advertisements");
            }}
          >
            <ListItemIcon>
              <WallpaperIcon />
            </ListItemIcon>
            <ListItemText primary={t("User Advertisements")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              postLogoutMutation.mutate();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t("Log Out")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default SideMenuProfile;
