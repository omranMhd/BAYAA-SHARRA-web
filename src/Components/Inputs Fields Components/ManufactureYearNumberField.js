import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function ManufactureYearNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="manufactureYear"
      label={t("manufactureYear")}
      size="small"
      margin="normal"
      {...register("manufactureYear")}
      error={!!errors.manufactureYear}
      helperText={errors.manufactureYear?.message}
    />
  );
}

export default ManufactureYearNumberField;
