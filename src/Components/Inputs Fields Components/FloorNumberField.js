import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function FloorNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="floor"
      label={t("floor")}
      size="small"
      margin="normal"
      {...register("floor")}
      error={!!errors.floor}
      helperText={errors.floor?.message}
    />
  );
}

export default FloorNumberField;
