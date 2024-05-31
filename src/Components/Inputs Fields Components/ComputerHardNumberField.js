import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function ComputerHardNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="computerHard"
      label={t("computerHard")}
      size="small"
      margin="normal"
      {...register("computerHard")}
      error={!!errors.computerHard}
      helperText={errors.computerHard?.message}
    />
  );
}

export default ComputerHardNumberField;
