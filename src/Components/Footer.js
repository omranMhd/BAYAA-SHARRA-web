import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Divider, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import FeeCalculationDialog from "./FeeCalculationDialog";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [openFeeCalculationDialog, setOpenFeeCalculationDialog] =
    useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* // background image */}
      <Box
        sx={{
          backgroundImage: `url(/footer2.jpg)`, // Set the background image
          backgroundSize: "cover", // Cover the entire Box with the image
          backgroundPosition: "center",
          // height: "500px",
          borderRadius: "0px 0px 100px 100px",
          // marginTop: "50px",
        }}
      >
        {/* image mask */}
        <Box
          sx={{
            backgroundColor: "#153258",
            // height: "500px",
            opacity: 0.9,
            // opacity: 0.9,
            // borderRadius: "0px 0px 100px 100px",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Box sx={{ opacity: 1 }}>
            <Grid
              container
              spacing={1}
              sx={
                {
                  // height: "330px",
                }
              }
            >
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <Box
                  sx={{
                    // height: "400px",
                    // border: "1px solid white",
                    marginLeft: "75px",
                    marginRight: "75px",
                    paddingTop: "25px",
                  }}
                >
                  <img
                    src={"/BAYAASHARRA.png"}
                    alt="Login"
                    style={{
                      width: "125px",
                      height: "100px",
                      display: "block",
                      // border: "1px solid red",
                    }}
                  />

                  <img
                    src={"/bs2.png"}
                    alt="Login"
                    style={{ width: "200px", height: "40px", display: "block" }}
                  />
                  <Typography sx={{ marginTop: "15px", color: "white" }}>
                    An electronic platform that connects the seller and the
                    buyer and brings them together in an easy, effective and
                    safe way so that each party achieves its goal
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "75px",
                    // direction: "rtl",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        cursor: "pointer",
                        color: "white",
                      }}
                      onClick={() => {
                        alert(23);
                      }}
                    >
                      {t("Register")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Annual Store Subscription")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Membership Verification")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Discount System")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("FAQ")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "75px",
                    // direction: "rtl",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        marginBottom: "5px",
                        color: "white",
                      }}
                      onClick={() => {
                        setOpenFeeCalculationDialog(true);
                      }}
                    >
                      {t("Site Fee Calculation")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Increase Offer Views")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Security Center")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Suspend Accounts")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/privacy-policy");
                      }}
                    >
                      {t("Privacy Policy")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={3} lg={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "75px",
                    // direction: "rtl",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Featured Ads")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Term of Use")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Evaluation System")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Prohibited Goods and Ads")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* <HomeIcon /> */}
                    <Box
                      sx={{
                        width: "7px",
                        height: "7px",
                        backgroundColor: theme.palette.LIGHT_BLUE,
                        borderRadius: "100%",
                        mx: "10px",
                      }}
                    ></Box>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        color: "white",
                      }}
                    >
                      {t("Contact Us")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={12} md={3} lg={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "75px",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "5px",
                      color: "white",
                    }}
                  >
                    {t("Get Our App On")}
                  </Typography>
                  <img
                    src={"/googlePlay.png"}
                    alt="Login"
                    style={{
                      width: "200px",
                      // height: "100px",
                      // display: "block",
                      // border: "1px solid red",
                    }}
                  />
                  <img
                    src={"/appStore.png"}
                    alt="Login"
                    style={{
                      width: "175px",
                      // height: "100px",
                      // display: "block",
                      // border: "1px solid red",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                marginBottom: "25px",
                marginTop: "25px",
              }}
            >
              {/* phone */}
              <Box sx={{ display: "flex" }}>
                <PhoneInTalkIcon sx={{ color: "white" }} />{" "}
                <Typography
                  sx={{
                    mx: "10px",
                    color: "white",
                  }}
                >
                  00963-988322674
                </Typography>
              </Box>
              {/* email */}
              <Box sx={{ display: "flex" }}>
                <EmailIcon sx={{ color: "white" }} />
                <Typography
                  sx={{
                    mx: "10px",
                    color: "white",
                  }}
                >
                  bayaa.sharra@gmail.com
                </Typography>
              </Box>
              {/* follow us */}
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    mx: "10px",
                    color: "white",
                  }}
                >
                  {t("follow us")}
                </Typography>
                <FacebookIcon sx={{ mx: "5px", color: "white" }} />
                <InstagramIcon sx={{ mx: "5px", color: "white" }} />
                <WhatsAppIcon sx={{ mx: "5px", color: "white" }} />
                <YouTubeIcon sx={{ mx: "5px", color: "white" }} />
                <GoogleIcon sx={{ mx: "5px", color: "white" }} />
              </Box>
            </Box>
            <Divider
              sx={{ backgroundColor: "white", width: "90%", mx: "auto" }}
            />
            <Box
              sx={{
                paddingBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  color: "white",
                  mt: "10px",
                }}
                variant="h6"
              >
                &copy; {new Date().getFullYear()}{" "}
                {t("Bayaa Sharra . All Rights Reserved")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <FeeCalculationDialog
        openDialog={openFeeCalculationDialog}
        setOpenDialog={setOpenFeeCalculationDialog}
      />
    </>
  );
}

export default Footer;
