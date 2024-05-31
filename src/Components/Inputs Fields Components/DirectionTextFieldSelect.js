import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function DirectionTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="direction"
      label={t("direction")}
      size="small"
      margin="normal"
      {...register("direction")}
      error={!!errors.direction}
      helperText={errors.direction?.message}
    >
      <MenuItem value={"north"}>North</MenuItem>
      <MenuItem value={"south"}>South</MenuItem>
      <MenuItem value={"west"}>West</MenuItem>
      <MenuItem value={"east"}>East</MenuItem>
      <MenuItem value={"north-east"}>North-East</MenuItem>
      <MenuItem value={"north-west"}>North-West</MenuItem>
      <MenuItem value={"south-east"}>South-East</MenuItem>
      <MenuItem value={"south-west"}>South-West</MenuItem>
    </TextField>
  );
}

export default DirectionTextFieldSelect;
