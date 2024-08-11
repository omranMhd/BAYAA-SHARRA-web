import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function DeviceTypeTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="deviceType"
      label={t("deviceType")}
      size="small"
      margin="normal"
      {...register("deviceType")}
      error={!!errors.deviceType}
      helperText={errors.deviceType?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"Tablet"}>
        {i18n.language === "en" ? "Tablet" : "تابليت"}
      </MenuItem>
      <MenuItem value={"Mobile"}>
        {i18n.language === "en" ? "Mobile" : "موبايل"}
      </MenuItem>
      <MenuItem value={"Computer"}>
        {i18n.language === "en" ? "Computer" : "كومبيوتر"}
      </MenuItem>
    </TextField>
  );
}

export default DeviceTypeTextFieldSelect;
