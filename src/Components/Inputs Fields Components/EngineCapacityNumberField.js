import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function EngineCapacityNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="engineCapacity"
      label={t("engineCapacity")}
      size="small"
      margin="normal"
      {...register("engineCapacity")}
      error={!!errors.engineCapacity}
      helperText={errors.engineCapacity?.message}
    />
  );
}

export default EngineCapacityNumberField;
