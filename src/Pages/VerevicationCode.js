import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useMutation } from "react-query";
import { MuiOtpInput } from "mui-one-time-password-input";

// TODO remove, this demo shouldn't need to reset the theme.

function VerevicationCode() {
  const [code, setCode] = React.useState("");
  const handleChange = (newValue) => {
    setCode(newValue);
  };

  // const [code, setCode] = useState("")
  const [invalidCode, setInvalidCode] = useState(false);
  const [resendCodeStatus, setResendCodeStatus] = useState("");
  const navigate = useNavigate();
  const checkVerificationCodeMutation = useMutation(
    ({ data, token }) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.post("/verify-account", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        localStorage.setItem("user", JSON.stringify(response.data.data));

        //go to home page after verification is done
        navigate("/");
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);

        if (error.response.status === 400) {
          setInvalidCode(true);
          setTimeout(() => {
            setInvalidCode(false);
          }, 5000);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );
  const resendVerificationCodeMutation = useMutation(
    ({ data, token }) => {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return axiosInstance.post("/resend-code", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setResendCodeStatus("Success");
        setTimeout(() => {
          setResendCodeStatus("");
        }, 5000);
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        if (error.response.status === 500) {
          setResendCodeStatus("Failed");
          setTimeout(() => {
            setResendCodeStatus("");
          }, 5000);
        }
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  let email = user.email != null ? user.email : null;
  let phone = user.phone != null ? user.phone : null;
  let verified_by;

  if (user.email != null) {
    verified_by = "email";
  } else if (user.phone != null) {
    verified_by = "phone";
  }

  const handleCheck = () => {
    const data = {
      code: code,
      user_id: user_id,
    };
    console.log(data);
    checkVerificationCodeMutation.mutate({ data, token });
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
    resendVerificationCodeMutation.mutate({ data, token });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={invalidCode}
        // onClose={handleClose}
        message="The code you entered is invalid, try again"
        // key={vertical + horizontal}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={resendCodeStatus === "Success"}
        // onClose={handleClose}
        message="success sending email"
        // key={vertical + horizontal}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={resendCodeStatus === "Failed"}
        // onClose={handleClose}
        message="Failed sending email"
        // key={vertical + horizontal}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#d8d9e1",
          border: "2px solid", // Set the border style
          borderColor: "primary.main", // Set the border color
          borderRadius: "10px",
          width: "80%",
          margin: "auto",
          marginTop: 20,
          padding: "15px",
          boxShadow: "10px 10px 5px 0px rgba(0, 0, 0, 0.7)",
        }}
      >
        <VerifiedUserOutlinedIcon
          style={{ fontSize: "100px", color: "#153258" }}
        />
        <Typography component="h1" variant="h6">
          Please check your inbox for verification code sent to you.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "35%",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        >
          <Typography component="h1" variant="h6" sx={{ textAlign: "center" }}>
            Enter code
          </Typography>
          <MuiOtpInput
            value={code}
            onChange={handleChange}
            length={4}
            display="flex"
            gap={1}
            margin={2}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "30px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleCheck}
            sx={{ width: "94%", margin: "auto" }}
            disabled={code.length !== 4}
          >
            Check
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "33%",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleResendCode}
            disabled={resendVerificationCodeMutation.isLoading}
          >
            {resendVerificationCodeMutation.isLoading ? (
              <CircularProgress size={25} style={{ color: "gray" }} />
            ) : (
              "Resend Code"
            )}
          </Button>

          <Link to="/" variant="body2">
            <Button variant="outlined">Skip</Button>
          </Link>
        </Box>

        <Box>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
            /> */}
        </Box>
      </Box>
    </>
  );
}

export default VerevicationCode;
