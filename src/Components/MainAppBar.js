import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputIcon from "@mui/icons-material/Input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import { useMutation } from "react-query";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: /*theme.shape.borderRadius*/ 10,
  backgroundColor: /*alpha(theme.palette.common.white, 0.15)*/ "white",
  border: "1px solid #1f8ccc",
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.50),
    border: "2px solid #153258",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#153258",
  // backgroundColor:"blue",
  // borderRadius:"25px"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

function MainAppBar() {
  const navigate = useNavigate();
  // to control theme state
  const [currentTheme, setCurrentTheme] = useState("light");

  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", user);
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbb :", token);

    if (user != null && token != null) {
      if (user.email_verified_at != null || user.phone_verified_at != null) {
        setIsLogedIn(true);
      }
    }
  }, [setIsLogedIn]);

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
        // navigate("/verevication-code");
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  // this main menu , it appears when user click on photo avatar
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
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
    >
      <MenuItem onClick={handleMenuClose}>
        Profile{" "}
        <AccountCircleIcon
          sx={{
            marginLeft: "20px",
          }}
        />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          postLogoutMutation.mutate();
        }}
      >
        Logout{" "}
        <LogoutIcon
          sx={{
            marginLeft: "20px",
          }}
        />
      </MenuItem>
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
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>Favorites</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LanguageIcon />
        </IconButton>
        <p>Language</p>
      </MenuItem>
      {currentTheme === "light" && (
        <MenuItem
          onClick={() => {
            setCurrentTheme("night");
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <NightlightRoundIcon />
          </IconButton>
          <p>Night</p>
        </MenuItem>
      )}
      {currentTheme === "night" && (
        <MenuItem
          onClick={() => {
            setCurrentTheme("light");
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <LightModeIcon />
          </IconButton>
          <p>Light</p>
        </MenuItem>
      )}

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
        <p>Profile</p>
      </MenuItem>
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
      >
        this{" "}
      </Box>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#e7e7e7", width: "100%" }}
      >
        <Toolbar>
          <img
            src={"BAYAASHARRA.png"}
            alt="Login"
            style={{ width: "55px", height: "50px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, color: "#153258" }}
          >
            BAYYA SHARRA
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Button
            variant="contained"
            sx={{
              margin: "10px",
              backgroundColor: "#153258",
            }}
            endIcon={<AddIcon />}
            onClick={() => {
              navigate("/new-ad");
            }}
          >
            Add Post
          </Button>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Favorites" arrow>
              <IconButton aria-label="translate" size="large">
                <FavoriteIcon
                  sx={{
                    color: "#153258",
                  }}
                />
              </IconButton>
            </Tooltip>
            {currentTheme === "light" && (
              <Tooltip title="Theme" arrow>
                <IconButton
                  aria-label="translate"
                  size="large"
                  onClick={() => {
                    setCurrentTheme("night");
                  }}
                >
                  <LightModeIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {currentTheme === "night" && (
              <Tooltip title="Theme" arrow>
                <IconButton
                  aria-label="translate"
                  size="large"
                  onClick={() => {
                    setCurrentTheme("light");
                  }}
                >
                  <NightlightRoundIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}

            {/* <ThemeSwitch sx={{ mt: "15px" }} /> */}

            <Tooltip title="Language" arrow>
              <IconButton aria-label="translate" color="inherit" size="large">
                <LanguageIcon
                  sx={{
                    color: "#153258",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notification" arrow>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                // color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon
                    sx={{
                      color: "#153258",
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            {isLogedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="/omran.jpg" />
              </IconButton>
            ) : (
              <Tooltip title="Log in" arrow>
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
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default MainAppBar;
