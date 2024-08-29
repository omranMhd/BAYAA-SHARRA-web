import { useState, useEffect, useContext } from "react";
import config from "../config";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useMutation, useQuery } from "react-query";
import ThemeContext from "../Contexts/ThemeContext";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import SearchInput from "./SearchInput";
import useUserLogedin from "../Custom Hooks/useUserLogedin";
import moment from "moment";

function MainAppBar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  // this custom hook to check if user loged in or not
  const isUserLogedin = useUserLogedin();

  const { mode, setMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const token = localStorage.getItem("token");

  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", user);
  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", token);

  //   if (user != null && token != null) {
  //     if (user.email_verified_at != null || user.phone_verified_at != null) {
  //       setIsLogedIn(true);
  //     }
  //   }
  // }, [setIsLogedIn]);

  const user = JSON.parse(localStorage.getItem("user"));

  //////////////////////////////////////////////////

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

        setIsLogedIn(false);
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
  const postMakeNotificationReadMutation = useMutation(
    (notification_id) => {
      const token = localStorage.getItem("token");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/make-notification-read/${notification_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        refetchAllNotification();
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

  const {
    isLoading: allNotificationsIsLoading,
    data: allNotifications,
    refetch: refetchAllNotification,
  } = useQuery(
    "all-notifications",
    () => {
      const token = localStorage.getItem("token");
      // alert(token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      if (token !== null) {
        return axiosInstance.get("/all-notifications");
      }
    },
    {
      onSuccess: (response) => {
        // alert("df", JSON.stringify(response));
        if (response != undefined) {
          setNotifications(response.data);
        }
      },
    }
  );

  // console.log("allNotifications :", allNotifications?.data);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNotification, setAnchorNotification] = useState(null);
  const [anchorLangMenu, setAnchorLangMenu] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLangMenuOpen = Boolean(anchorLangMenu);
  const isNotificationMenuOpen = Boolean(anchorNotification);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationMenuOpen = (event) => {
    setAnchorNotification(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setAnchorLangMenu(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // navigate("/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNotificationMenuClose = () => {
    // navigate("/profile");
    setAnchorNotification(null);
    // handleMobileMenuClose();
  };

  const handleLangMenuClose = () => {
    setAnchorLangMenu(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const langMenuId = "primary-search-account-menu";
  const languageMenu = (
    <Menu
      anchorEl={anchorLangMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={langMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLangMenuOpen}
      onClose={handleLangMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleLangMenuClose();
          i18n.changeLanguage("en");
          localStorage.setItem("currrentLanguage", "en");
        }}
      >
        EN
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangMenuClose();
          i18n.changeLanguage("ar");
          localStorage.setItem("currrentLanguage", "ar");
        }}
      >
        AR
      </MenuItem>
    </Menu>
  );
  const menuId = "primary-search-account-menu";
  // this main menu , it appears when user click on photo avatar
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={
        {
          // direction:"rtl"
        }
      }
    >
      {/* <MenuItem onClick={handleMenuClose}> */}
      <MenuItem
        onClick={() => {
          navigate("/profile");
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Typography>{t("Profile")}</Typography>
          <AccountCircleIcon
            sx={
              {
                // marginLeft: "20px",
              }
            }
          />
        </Box>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          postLogoutMutation.mutate();
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Typography>{t("Log Out")}</Typography>
          <LogoutIcon
            sx={
              {
                // marginLeft: "20px",
              }
            }
          />
        </Box>
      </MenuItem>
    </Menu>
  );
  const menuNotificationId = "primary-notification-menu";
  // this main menu , it appears when user click on photo avatar
  const renderNotificationMenu = (
    <Menu
      anchorEl={anchorNotification}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuNotificationId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
      sx={{}}
    >
      <Box
        sx={{
          maxHeight: "250px",
          //  height:"300px"
        }}
      >
        {allNotifications?.data.data.length === 0 && (
          <Typography>{t("You have no new notifications")}</Typography>
        )}
        {allNotifications?.data.data.map((notif) => {
          return (
            <MenuItem
              sx={{
                // backgroundColor: "#e9eff7",

                direction: i18n.language === "en" ? "ltr" : "rtl",
              }}
              onClick={() => {
                handleNotificationMenuClose();
                if (notif.read_at === null) {
                  postMakeNotificationReadMutation.mutate(notif.id);
                }
                if (
                  notif.type ===
                  "App\\Notifications\\AcceptancePublishingAdvertisementNotification"
                ) {
                  navigate(`/ad-details/${notif.data.ad_id}`);
                  // navigate(`/profile/user-ad-details/${notif.data.ad_id}}`);
                }
                if (
                  notif.type ===
                  "App\\Notifications\\RejectAdvertisementNotification"
                ) {
                  navigate(`/profile/user-ad-details/${notif.data.ad_id}`);
                }
                if (
                  notif.type ===
                  "App\\Notifications\\AddNewCommentOnAdvertisementNotification"
                ) {
                  navigate(`/ad-details/${notif.data.ad_id}`);
                }
                if (
                  notif.type ===
                  "App\\Notifications\\ReplyOnCommentNotification"
                ) {
                  navigate(`/ad-details/${notif.data.ad_id}`);
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  // alignItems: "right",
                  width: "100%",
                  // width: "100%",
                  // backgroundColor: "lightblue",
                  // border: "1px solid red",
                  // m: "1px",
                  p: "2px",
                  direction: i18n.language === "en" ? "ltr" : "rtl",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {notif.read_at === null && (
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "5px",
                      }}
                    ></Box>
                  )}
                  {notif.type ===
                    "App\\Notifications\\AddNewCommentOnAdvertisementNotification" && (
                    <Avatar
                      alt="Remy Sharp"
                      // src={`http://127.0.0.1:8000/storage/${notif.data.comment_owner?.image}`}
                      src={`${config.baseUrl}/storage/${notif.data.comment_owner?.image}`}
                      sx={{
                        mx: "5px",
                      }}
                    />
                  )}
                  {notif.type ===
                    "App\\Notifications\\ReplyOnCommentNotification" && (
                    <Avatar
                      alt="Remy Sharp"
                      // src={`http://127.0.0.1:8000/storage/${notif.data.reply_owner?.image}`}
                      src={`${config.baseUrl}/storage/${notif.data.reply_owner?.image}`}
                      sx={{
                        mx: "5px",
                      }}
                    />
                  )}
                  {notif.type ===
                    "App\\Notifications\\AcceptancePublishingAdvertisementNotification" && (
                    <Avatar
                      alt="Remy Sharp"
                      // src={`http://127.0.0.1:8000/storage/${notif.data.ad_image?.url}`}
                      src={`${config.baseUrl}/storage/${notif.data.ad_image?.url}`}
                      sx={{
                        mx: "5px",
                      }}
                    />
                  )}
                  {notif.type ===
                    "App\\Notifications\\RejectAdvertisementNotification" && (
                    <Avatar
                      alt="Remy Sharp"
                      // src={`http://127.0.0.1:8000/storage/${notif.data.ad_image?.url}`}
                      src={`${config.baseUrl}/storage/${notif.data.ad_image?.url}`}
                      sx={{
                        mx: "5px",
                      }}
                    />
                  )}

                  <Typography fontWeight={notif.read_at === null && "bold"}>
                    {i18n.language === "en"
                      ? notif.data.message.en
                      : notif.data.message.ar}{" "}
                    {notif.data.ad_id}
                  </Typography>
                </Box>
                <Typography fontSize={13}>
                  {adjustDateToTranslate(moment(notif.created_at).fromNow())}
                </Typography>
                <Divider></Divider>
              </Box>
            </MenuItem>
          );
        })}
      </Box>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  //this menu appears when user click on tree dots when screen is small
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={(event) => {
          if (isUserLogedin) {
            handleNotificationMenuOpen(event);
          } else {
            navigate("/login");
          }
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            badgeContent={allNotifications?.data.unReadCount}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>{t("notifications")}</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/favorite-ads");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>{t("favorites")}</p>
      </MenuItem>
      <MenuItem onClick={handleLanguageMenuOpen}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LanguageIcon />
        </IconButton>
        <p>{t("language")}</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          if (theme.palette.mode === "dark") {
            setMode("light");
          } else if (theme.palette.mode === "light") {
            setMode("dark");
          }
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          {theme.palette.mode === "dark" && <LightModeIcon />}
          {theme.palette.mode === "light" && <DarkModeIcon />}
        </IconButton>
        <p>{t("theme")}</p>
      </MenuItem>

      {isUserLogedin ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>{t("Profile")}</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            navigate("/login");
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <InputIcon />
          </IconButton>
          <p>{t("login")}</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box>
      {/*هذا البوكس يقع اسفل الناف البار وهو من اجل تعويض المسافة الناقصة في حال النافبار ثابت في الصفحة*/}
      <Box
        sx={{
          height: "68px",
          backgroundColor: "#1f8ccc",
        }}
      ></Box>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#e7e7e7", width: "100%" }}
      >
        <Toolbar>
          <Link to="/" variant="body2">
            <img
              src={"/BAYAASHARRA.png"}
              alt="Login"
              style={{ width: "55px", height: "50px", marginRight: "10px" }}
            />
          </Link>
          <Box
            sx={{
              display: { sm: "inline", xs: "none" },
              // display: { sm: "none" },
            }}
          >
            {i18n.language === "en" && (
              <img
                src={"/bs.png"}
                alt="Login"
                style={{ width: "120px", height: "25px", marginBottom: "10px" }}
              />
            )}
            {i18n.language === "ar" && (
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" }, color: "#153258" }}
              >
                {t("bayaa sharra")}
              </Typography>
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          {/* Search input component */}
          <SearchInput />

          <Button
            variant="contained"
            // color={theme.palette.DARK_BLUE}
            sx={{
              margin: "10px",
              backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
              whiteSpace: "nowrap",
              display: { xs: "none", lg: "flex" },
            }}
            endIcon={<AddIcon />}
            onClick={() => {
              navigate("/new-ad");
            }}
          >
            {t("add post")}
          </Button>
          <Button
            variant="contained"
            // color={theme.palette.DARK_BLUE}
            sx={{
              margin: "10px",
              backgroundColor: theme.palette.LIGHT_BLUE_or_DARK_BLUE,
              whiteSpace: "nowrap",
              display: { sm: "flex", lg: "none" },
            }}
            onClick={() => {
              navigate("/new-ad");
            }}
          >
            <AddIcon />
          </Button>
          {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <Tooltip title={t("favorites")} arrow>
              <IconButton
                aria-label="translate"
                size="large"
                onClick={() => {
                  navigate("/favorite-ads");
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: "#153258",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title={t("theme")} arrow>
              <IconButton
                aria-label="translate"
                size="large"
                onClick={() => {
                  if (theme.palette.mode === "dark") {
                    setMode("light");
                    localStorage.setItem("themeMode", "light");
                  } else if (theme.palette.mode === "light") {
                    setMode("dark");
                    localStorage.setItem("themeMode", "dark");
                  }
                }}
              >
                {theme.palette.mode === "dark" && (
                  <LightModeIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                )}
                {theme.palette.mode === "light" && (
                  <DarkModeIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t("language")} arrow>
              <IconButton
                aria-label="translate"
                color="inherit"
                size="large"
                onClick={handleLanguageMenuOpen}
              >
                <LanguageIcon
                  sx={{
                    color: "#153258",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("notifications")} arrow>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                // color="inherit"
                // onClick={handleProfileMenuOpen}
                onClick={(event) => {
                  if (isUserLogedin) {
                    handleNotificationMenuOpen(event);
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <Badge
                  badgeContent={allNotifications?.data.unReadCount}
                  color="error"
                >
                  <NotificationsIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {isUserLogedin ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt="Remy Sharp"
                  // src={`http://127.0.0.1:8000/storage/${user.image}`}
                  src={`${config.baseUrl}/storage/${user.image}`}
                />
              </IconButton>
            ) : (
              <Tooltip title={t("login")} arrow>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{
                    color: "#153258",
                  }}
                >
                  <InputIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}> */}
          <Box sx={{ display: { sm: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: theme.palette.LIGHT_BLUE }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {languageMenu}
      {renderNotificationMenu}
    </Box>
  );
}

export default MainAppBar;
