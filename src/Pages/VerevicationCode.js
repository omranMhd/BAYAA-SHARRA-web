import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import * as types from "../Redux/actionTypes";
// import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function VerevicationCode() {
  const [code, setCode] = useState("");
  const [invalidCode, setInvalidCode] = useState(false);
  const [resendCodeStatus, setResendCodeStatus] = useState("");

  // const token = useSelector((state) => {
  //   return state.token;
  // });
  const token = localStorage.getItem("token");

  // const user_id = useSelector((state) => {
  //   return state.user.id;
  // });

  const user = localStorage.getItem("user");
  const user_id = user.id;
  let email = user.email != null ? user.email : null;
  let phone = user.phone != null ? user.phone : null;
  let verified_by;

  if (user.email != null) {
    verified_by = "email";
  } else if (user.phone != null) {
    verified_by = "phone";
  }
  // const email = useSelector((state) => {
  //   if (state.user.email != null) {
  //     return state.user.email;
  //   }
  // });

  // const phone = useSelector((state) => {
  //   if (state.user.phone != null) {
  //     return "phone";
  //   }
  // });

  // const verified_by = useSelector((state) => {});

  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const handleCheck = () => {
    const data = {
      code: code,
      user_id: user_id,
    };
    console.log(data);

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axiosInstance
      .post("/verify-account", data)
      .then((res) => {
        console.log("success api '/verify-account '", res.data.data);

        // // update user info in global state after verify account
        // dispatch({
        //   type: types.UPDATE_USER_INFO,
        //   payload: res.data.data,
        // });

        //update user info in local Storage
        localStorage.removeItem("user");
        localStorage.setItem("user", res.data.data.user);

        //go to home page
        navigate("/");
      })
      .catch((e) => {
        console.log("error in api '/verify-account' :", e);

        if (e.response.status === 400) {
          setInvalidCode(true);
          setTimeout(() => {
            setInvalidCode(false);
          }, 5000);
        }
      });
  };

  const handleResendCode = () => {
    const data = {
      user_id: user_id,
      verified_by: verified_by,
    };

    if (verified_by === "email") {
      data.email = email;
    } else if (verified_by === "phone") {
      data.phone = phone;
    }

    console.log("dddddddddddddddddddddddddd :", data);

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axiosInstance
      .post("/resend-code", data)
      .then((res) => {
        setResendCodeStatus("Success");
        setTimeout(() => {
          setResendCodeStatus("");
        }, 5000);
      })
      .catch((e) => {
        if (e.response.status === 500) {
          setResendCodeStatus("Failed");
          setTimeout(() => {
            setResendCodeStatus("");
          }, 5000);
        }
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
      {invalidCode && (
        <Alert severity="warning">
          The code you entered is invalid, try again
        </Alert>
      )}
      {resendCodeStatus === "Success" && (
        <Alert severity="success">
          success sending email .................
        </Alert>
      )}
      {resendCodeStatus === "Failed" && (
        <Alert severity="error">Failed sending email .................</Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#d8d9e1",
            border: "4px solid", // Set the border style
            borderColor: "primary.main", // Set the border color
            borderRadius: "16px",
          }}
        >
          <Typography component="h1" variant="h6">
            Enter The code to verify your account
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheck}
                  // sx={{ mt: 3, mb: 2 }}
                  disabled={code.length !== 6}
                >
                  Check
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleResendCode}
                  // sx={{ mt: 3, mb: 2 }}
                >
                  Resend code
                </Button>
              </Grid>
            </Grid>

            <Link to="/" variant="body2">
              {"Skip"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default VerevicationCode;
