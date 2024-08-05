import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import axiosInstance from "../Axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { tableCellClasses } from "@mui/material/TableCell";
import LinearProgress from "@mui/material/LinearProgress";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

function UserAdvertisements() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletedAdId, setdeletedAdId] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: userAdvertisements, refetch: refetchUserAdvertisements } =
    useQuery(
      "user-ads",
      () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        return axiosInstance.get(`/user-advertisements/${user.id}`);
      },
      {
        onSuccess: (response) => {
          console.log("aaaaaaaaaaaaa :", response.data);
        },
        select: (data) => {
          return data.data;
        },
      }
    );

  const deleteAdvertisementMutation = useMutation(
    (ad_id) => {
      // const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return axiosInstance.delete(`/delete-advertisement/${ad_id}`);
    },
    {
      onSuccess: (response) => {
        // Handle the response data here
        console.log("onSuccess response", response);

        refetchUserAdvertisements();
      },
      onError: (error) => {
        // Handle any errors here
        console.error("onError", error);
        setdeletedAdId(null);
        setOpenDeleteDialog(false);

        // email or phone already been taken
      },
      onSettled: () => {
        // This will run after the mutation is either successful or fails
        console.log("Mutation has completed");
      },
    }
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.DARK_BLUE,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    // <TableContainer component={Paper} sx={{
    //   margin: "25px"
    // }}>
    <>
      {deleteAdvertisementMutation.isLoading && (
        <LinearProgress
          sx={{
            mt: "5px",
          }}
        />
      )}

      {userAdvertisements?.data.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: "100px",
            mb: "100px",
          }}
        >
          <ReportGmailerrorredIcon sx={{ fontSize: "50px" }} />
          <Typography sx={{ textAlign: "" }} variant="h5">
            {t("There Is No Advertisements")}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            margin: "10px",
            border: `1px solid ${theme.palette.DARK_BLUE}`,
            borderRadius: "15px",
            height: "450px",
            overflowY: "auto",
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "red",
              }}
            >
              <TableRow>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Title")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Category")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Address")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Status")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("Paid for")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("price")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                >
                  {t("new price")}
                </StyledTableCell>
                <StyledTableCell
                  align={i18n.language === "en" ? "left" : "right"}
                ></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userAdvertisements?.data.map((ad) => (
                <TableRow
                  key={ad.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align={i18n.language === "en" ? "left" : "right"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/profile/user-ad-details/${ad.id}`);
                    }}
                  >
                    {ad.title}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {i18n.language === "en"
                      ? ad.category.name_en
                      : ad.category.name_ar}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {i18n.language === "en"
                      ? `${ad.address.country_en} - ${ad.address.city_en}`
                      : `${ad.address.country_ar} - ${ad.address.city_ar}`}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {t(ad.status)}
                  </TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {t(ad.paidFor ? "YES" : "NO")}
                  </TableCell>
                  <TableCell
                    align={i18n.language === "en" ? "left" : "right"}
                  >{`${ad.price} - ${ad.currency}`}</TableCell>
                  <TableCell align={i18n.language === "en" ? "left" : "right"}>
                    {" "}
                    {ad.newPrice != null
                      ? `${ad.newPrice} - ${ad.currency}`
                      : "-"}
                  </TableCell>
                  <TableCell align="">
                    <IconButton
                      id={ad.id}
                      onClick={() => {
                        // deleteAdvertisementMutation.mutate(ad.id);
                        setdeletedAdId(ad.id);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          color: theme.palette.LIGHT_BLUE,
                        }}
                      />
                    </IconButton>
                    {/* <IconButton onClick={() => {}}>
                  <EditIcon
                    sx={{
                      color: theme.palette.LIGHT_BLUE,
                    }}
                  />
                </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      {/* تأكيد حذف اعلان */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
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
          {t("Are you sure you want to delete this Ad")}
        </DialogTitle>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDeleteDialog(false);
              setdeletedAdId(null);
            }}
          >
            {t("Skip")}
          </Button>
          <Button
            disabled={deleteAdvertisementMutation.isLoading}
            variant="contained"
            onClick={() => {
              deleteAdvertisementMutation.mutate(deletedAdId);
            }}
            autoFocus
          >
            {deleteAdvertisementMutation.isLoading ? (
              <CircularProgress size={25} style={{ color: "white" }} />
            ) : (
              t("delete")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // </TableContainer>
  );
}

export default UserAdvertisements;
