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
import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import * as types from "../Redux/actionTypes";
import { useDispatch } from "react-redux";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function VerevicationCode() {
  const [code, setCode] = useState("");

  const token = useSelector((state) => {
    return state.token;
  });
  const user_id = useSelector((state) => {
    return state.user.id;
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCheck = () => {
    const data = {
      code: code,
      user_id: user_id,
    };

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log(
      "axiossssssssssss headersssssssssssss :",
      axiosInstance.defaults.headers
    );
    axiosInstance
      .post("/verify-account", data)
      .then((res) => {
        console.log("success api '/verify-account '", res.data.data);

        // update user info in global state after verify account
        dispatch({
          type: types.UPDATE_USER_INFO,
          payload: res.data.data,
        });

        //go to home page
        navigate("/");
      })
      .catch((e) => {
        console.log("error in api '/verify-account' :", e);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
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
          <Typography component="h1" variant="h6">
            {token}
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
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheck}
              sx={{ mt: 3, mb: 2 }}
            >
              Check
            </Button>

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
