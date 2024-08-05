import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

function FeeCalculationDialog({ openDialog, setOpenDialog }) {
  const { t, i18n } = useTranslation();
  const [fullPrice, setFullPrice] = useState("");
  //   const [fullPrice, setFullPrice] = useState(null);

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        setOpenDialog(false);
      }}
      sx={{
        direction: i18n.language === "en" ? "ltr" : "rtl",
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      //   fullWidth
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {/* {t("Write Your Reply")} */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>{t("Fee Calculation")}</Typography>
          <IconButton
            aria-label="delete"
            color="primary"
            size="small"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{t("The fee due is 1% of the total amount")}</Typography>
        <Grid container spacing={2}>
          {/*price from  */}
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              autoComplete="given-name"
              fullWidth
              id="area"
              label={t("full price")}
              size="small"
              margin="normal"
              value={fullPrice}
              onChange={(e) => {
                if (Number(e.target.value) == 0) {
                  setFullPrice("");
                } else {
                  setFullPrice(Number(e.target.value));
                }
                //   console.log("ff :", e.target.value);
              }}
            />
          </Grid>
          {/* price to */}
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              autoComplete="given-name"
              fullWidth
              id="area"
              label={t("required fees")}
              size="small"
              margin="normal"
              value={fullPrice * (1 / 100)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FeeCalculationDialog;
