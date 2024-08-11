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
      <MenuItem value={" "}> - </MenuItem>
      <MenuItem value={"red"}>
        {i18n.language === "en" ? "Red" : "أحمر"}
      </MenuItem>
      <MenuItem value={"blue"}>
        {i18n.language === "en" ? "Blue" : "أزرق"}
      </MenuItem>
      <MenuItem value={"black"}>
        {i18n.language === "en" ? "Black" : "أسود"}
      </MenuItem>
      <MenuItem value={"yallow"}>
        {i18n.language === "en" ? "yallow" : "أصفر"}
      </MenuItem>
      <MenuItem value={"White"}>
        {i18n.language === "en" ? "White" : "أبيض"}
      </MenuItem>
      <MenuItem value={"Selver"}>
        {i18n.language === "en" ? "Selver" : "فضي"}
      </MenuItem>
      <MenuItem value={"Golden"}>
        {i18n.language === "en" ? "Golden" : "ذهبي"}
      </MenuItem>
      <MenuItem value={"Pink"}>
        {i18n.language === "en" ? "Pink" : "زهري"}
      </MenuItem>
      <MenuItem value={"Indigo"}>
        {i18n.language === "en" ? "Indigo" : "نيلي"}
      </MenuItem>
      <MenuItem value={"Green"}>
        {i18n.language === "en" ? "Green" : "أخضر"}
      </MenuItem>
    </TextField>
  );
}

export default VehicleColorTextFieldSelect;
