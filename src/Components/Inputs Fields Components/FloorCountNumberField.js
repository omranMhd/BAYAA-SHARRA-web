import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function FloorCountNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="floorsCount"
      label={t("floorsCount")}
      size="small"
      margin="normal"
      {...register("floorsCount")}
      error={!!errors.floorsCount}
      helperText={errors.floorsCount?.message}
    />
  );
}

export default FloorCountNumberField;
