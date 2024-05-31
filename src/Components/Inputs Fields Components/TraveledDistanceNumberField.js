import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function TraveledDistanceNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="traveledDistance"
      label={t("traveledDistance")}
      size="small"
      margin="normal"
      {...register("traveledDistance")}
      error={!!errors.traveledDistance}
      helperText={errors.traveledDistance?.message}
    />
  );
}

export default TraveledDistanceNumberField;
