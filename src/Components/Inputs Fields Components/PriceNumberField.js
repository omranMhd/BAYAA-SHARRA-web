import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function PriceNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="price"
      label={t("price")}
      size="small"
      margin="normal"
      {...register("price")}
      error={!!errors.price}
      helperText={errors.price?.message}
    />
  );
}

export default PriceNumberField;
