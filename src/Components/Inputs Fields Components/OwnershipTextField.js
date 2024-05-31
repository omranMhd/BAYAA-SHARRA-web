import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function OwnershipTextField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      autoComplete="given-name"
      fullWidth
      id="ownership"
      label={t("ownership")}
      size="small"
      margin="normal"
      {...register("ownership")}
      error={!!errors.ownership}
      helperText={errors.ownership?.message}
    />
  );
}

export default OwnershipTextField;
