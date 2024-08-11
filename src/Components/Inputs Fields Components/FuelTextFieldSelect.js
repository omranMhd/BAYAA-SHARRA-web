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
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"penzen"}>
        {i18n.language === "en" ? "penzen" : "بنزين"}
      </MenuItem>
      <MenuItem value={"diesel"}>
        {i18n.language === "en" ? "diesel" : "مازوت"}
      </MenuItem>
      <MenuItem value={"electricity"}>
        {i18n.language === "en" ? "electricity" : "كهرباء"}
      </MenuItem>
    </TextField>
  );
}

export default FuelTextFieldSelect;
