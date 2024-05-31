import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function DeviceStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="deviceStatus"
      label={t("deviceStatus")}
      size="small"
      margin="normal"
      {...register("deviceStatus")}
      error={!!errors.deviceStatus}
      helperText={errors.deviceStatus?.message}
    >
      <MenuItem value={"old"}>Old</MenuItem>
      <MenuItem value={"new"}>New</MenuItem>
    </TextField>
  );
}

export default DeviceStatusTextFieldSelect;
