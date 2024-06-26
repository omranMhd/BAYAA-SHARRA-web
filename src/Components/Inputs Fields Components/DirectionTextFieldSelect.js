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
      <MenuItem value={"north"}>
        {i18n.language === "en" ? "North" : "شمالي"}
      </MenuItem>
      <MenuItem value={"south"}>
        {i18n.language === "en" ? "South" : "جنوبي"}
      </MenuItem>
      <MenuItem value={"west"}>
        {i18n.language === "en" ? "West" : "غربي"}
      </MenuItem>
      <MenuItem value={"east"}>
        {i18n.language === "en" ? "East" : "شرقي"}
      </MenuItem>
      <MenuItem value={"north-east"}>
        {i18n.language === "en" ? "North-East" : "شمالي شرقي"}
      </MenuItem>
      <MenuItem value={"north-west"}>
        {i18n.language === "en" ? "North-West" : "شمالي غربي"}
      </MenuItem>
      <MenuItem value={"south-east"}>
        {i18n.language === "en" ? "South-East" : "جنوبي شرقي"}
      </MenuItem>
      <MenuItem value={"south-west"}>
        {i18n.language === "en" ? "South-West" : "جنوبي غربي"}
      </MenuItem>
    </TextField>
  );
}

export default DirectionTextFieldSelect;
