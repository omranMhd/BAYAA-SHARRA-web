import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";

function AreaNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="area"
      label={t("area")}
      size="small"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {i18n.language === "en" ? "(m²)" : "(م²)"}
          </InputAdornment>
        ),
      }}
      {...register("area")}
      error={!!errors.area}
      helperText={errors.area?.message}
    />
  );
}

export default AreaNumberField;
