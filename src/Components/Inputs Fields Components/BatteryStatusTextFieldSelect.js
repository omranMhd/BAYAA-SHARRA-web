import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function BatteryStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="batteryStatus"
      label={t("batteryStatus")}
      size="small"
      margin="normal"
      {...register("batteryStatus")}
      error={!!errors.batteryStatus}
      helperText={errors.batteryStatus?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"original"}>
        {i18n.language === "en" ? "original" : "أساسية"}
      </MenuItem>
      <MenuItem value={"replaced"}>
        {i18n.language === "en" ? "replaced" : "مستبدلة"}
      </MenuItem>
    </TextField>
  );
}

export default BatteryStatusTextFieldSelect;
