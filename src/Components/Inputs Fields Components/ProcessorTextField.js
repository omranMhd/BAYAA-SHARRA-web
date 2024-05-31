import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function ProcessorTextField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      autoComplete="given-name"
      fullWidth
      id="processor"
      label={t("processor")}
      size="small"
      margin="normal"
      {...register("processor")}
      error={!!errors.processor}
      helperText={errors.processor?.message}
    />
  );
}

export default ProcessorTextField;
