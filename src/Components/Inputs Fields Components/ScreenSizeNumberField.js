import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function ScreenSizeNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="screenSize"
      label={t("screenSize")}
      size="small"
      margin="normal"
      {...register("screenSize")}
      error={!!errors.screenSize}
      helperText={errors.screenSize?.message}
    />
  );
}

export default ScreenSizeNumberField;
