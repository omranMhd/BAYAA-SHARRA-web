import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function VehicleModelTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="vehicleModel"
      label={t("vehicleModel")}
      size="small"
      margin="normal"
      {...register("vehicleModel")}
      error={!!errors.vehicleModel}
      helperText={errors.vehicleModel?.message}
    >
      <MenuItem value={"RIO"}>RIO</MenuItem>
      <MenuItem value={"SONATA"}>SONATA</MenuItem>
      <MenuItem value={"AZERA"}>AZERA</MenuItem>
    </TextField>
  );
}

export default VehicleModelTextFieldSelect;
