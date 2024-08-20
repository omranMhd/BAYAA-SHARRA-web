import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingDialog({ openDialog }) {
  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        console.log("sdf");
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      //   fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <CircularProgress size={75} color="inherit" />
        {/* <img alt="e" src="/BayaaSharra.gif" width="100px" height="150px"/> */}
      </DialogContent>
    </Dialog>
  );
}

export default LoadingDialog;
