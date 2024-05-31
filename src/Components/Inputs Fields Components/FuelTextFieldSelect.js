import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function FuelTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="fuel"
      label={t("fuel")}
      size="small"
      margin="normal"
      {...register("fuel")}
      error={!!errors.fuel}
      helperText={errors.fuel?.message}
    >
      <MenuItem value={"penzen"}>penzen</MenuItem>
      <MenuItem value={"diesel"}>diesel</MenuItem>
      <MenuItem value={"electricity"}>electricity</MenuItem>
    </TextField>
  );
}

export default FuelTextFieldSelect;
