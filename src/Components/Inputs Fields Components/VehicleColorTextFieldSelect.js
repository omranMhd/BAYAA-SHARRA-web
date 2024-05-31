import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function VehicleColorTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="vehicleColor"
      label={t("vehicleColor")}
      size="small"
      margin="normal"
      {...register("vehicleColor")}
      error={!!errors.vehicleColor}
      helperText={errors.vehicleColor?.message}
    >
      <MenuItem value={"original"}>original</MenuItem>
      <MenuItem value={"repainted"}>repainted</MenuItem>
    </TextField>
  );
}

export default VehicleColorTextFieldSelect;
