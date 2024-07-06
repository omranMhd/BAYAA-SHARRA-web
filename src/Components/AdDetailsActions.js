import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../Axios/axiosInstance";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

function AdDetailsActions() {
  const [isAdinMyFavoriteList, setIsAdinMyFavoriteList] = useState(false);
  const [isAdLiked, setIsAdLiked] = useState(false);
  const [open, setOpen] = useState(false);
  const [complaintReason, setComplaintReason] = useState("");
  const { t, i18n } = useTranslation();
  let params = useParams();
  let { adId } = useParams();

  const { isLoading: isAdInFavoriteList, data: isAdExistInFavoriteList } =
    useQuery(
      `is-ad-in-favorite-list-${adId}`,
      () => {
        const user_id = JSON.parse(localStorage.getItem("user")).id;
        const token = localStorage.getItem("token");

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        return axiosInstance.get(
          `/is-ad-in-favorite-list/${user_id}/${params.adId}`
        );
      },
      {
        onSuccess: (response) => {
          // Handle the response data here
          // console.log("onSuccess response", response);
          console.log("test test", response);

          setIsAdinMyFavoriteList(response.data.isExist);
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

  const { data: checkIsAdLiked } = useQuery(
    "is-ad-liked",
    () => {
      const user_id = JSON.parse(localStorage.getItem("user")).id;
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.get(`/is-ad-liked/${user_id}/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        // console.log("onSuccess response", response);
        console.log("test test", response);

        setIsAdLiked(response.data.isExist);
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

  const removeAdvertFromFavoriteList = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(
        `/remove-ad-favorite/${user_id}/${params.adId}`
      );
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setIsAdinMyFavoriteList(false);
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
  const addAdvertToFavoriteList = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/add-ad-favorite/${user_id}/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setIsAdinMyFavoriteList(true);
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

  const addLikeToAdvertisement = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post(`/add-like/${user_id}/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setIsAdLiked(true);
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

  const removeLikeFromAdvertisement = useMutation(
    () => {
      // هون لازم نتحقق اذا كانت هي المعلومات موجودة اولا قبل استخدامها
      const token = localStorage.getItem("token");
      const user_id = JSON.parse(localStorage.getItem("user")).id;

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/remove-like/${user_id}/${params.adId}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        setIsAdLiked(false);
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

  const addComplaint = useMutation(
    (data) => {
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.post("/add-complaint", data);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);
        setOpen(false);
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

  return (
    <Box
      sx={
        {
          // width: "100%",
          // backgroundColor: "blue",
        }
      }
    >
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        fullWidth
        sx={{
          padding: "30px",
        }}
      >
        {/* {isAdExistInFavoriteList?.data.isExist ? ( */}
        {isAdinMyFavoriteList ? (
          <Button
            onClick={() => {
              removeAdvertFromFavoriteList.mutate();
            }}
            endIcon={<FavoriteIcon />}
          >
            {t("favorite")}
          </Button>
        ) : (
          <Button
            onClick={() => {
              addAdvertToFavoriteList.mutate();
            }}
            endIcon={<FavoriteBorderIcon />}
          >
            {t("favorite")}
          </Button>
        )}
        {isAdLiked ? (
          <Button
            onClick={() => {
              removeLikeFromAdvertisement.mutate();
            }}
            endIcon={<ThumbUpIcon />}
          >
            {t("like")}
          </Button>
        ) : (
          <Button
            onClick={() => {
              addLikeToAdvertisement.mutate();
            }}
            endIcon={<ThumbUpOffAltIcon />}
          >
            {t("like")}
          </Button>
        )}

        <Button
          onClick={() => {
            setOpen(true);
          }}
          endIcon={<ReportGmailerrorredIcon />}
        >
          {t("report")}
        </Button>
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          direction: i18n.language === "en" ? "ltr" : "rtl",
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Please write your complaint in the field")}
        </DialogTitle>
        <DialogContent>
          <TextField
            // label={t("description")}
            label={t("message")}
            required
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            margin="normal"
            name="ComplaintReason"
            value={complaintReason}
            onChange={(e) => {
              setComplaintReason(e.target.value);
            }}
            // {...register("description")}
            // error={!!errors.description}
            // helperText={t(errors.description?.message)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            {t("Skip")}
          </Button>
          <Button
            disabled={addComplaint.isLoading || complaintReason === ""}
            variant="contained"
            onClick={() => {
              const data = {};
              const user_id = JSON.parse(localStorage.getItem("user")).id;
              data.user_id = user_id;
              data.advertisement_id = params.adId;
              data.reason = complaintReason;
              // alert(complaintReason);
              addComplaint.mutate(data);
              // setOpen(false);
            }}
            autoFocus
          >
            {addComplaint.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("send")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdDetailsActions;
