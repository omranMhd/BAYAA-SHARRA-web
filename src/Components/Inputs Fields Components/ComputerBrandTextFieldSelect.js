import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ComputerBrandTextFieldSelect({ register, errors, subCategory }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="computerBrand"
      label={t("computerBrand")}
      size="small"
      margin="normal"
      {...register("computerBrand")}
      error={!!errors.computerBrand}
      helperText={errors.computerBrand?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"mac"}>
        {i18n.language === "en" ? "MAC" : "ماك"}
      </MenuItem>
      <MenuItem value={"asus"}>
        {i18n.language === "en" ? "ASUS" : "أزوس"}
      </MenuItem>
      <MenuItem value={"dell"}>
        {i18n.language === "en" ? "DELL" : "ديل"}
      </MenuItem>
      <MenuItem value={"hp"}>
        {i18n.language === "en" ? "HP" : "إتش بي"}
      </MenuItem>
      <MenuItem value={"toshiba"}>
        {i18n.language === "en" ? "TOSHIBA" : "توشيبا"}
      </MenuItem>
      <MenuItem value={"acer"}>
        {i18n.language === "en" ? "ACER" : "ايسر"}
      </MenuItem>
      <MenuItem value={"lenovo"}>
        {i18n.language === "en" ? "LENOVO" : "لينوفو"}
      </MenuItem>
    </TextField>
  );
}

export default ComputerBrandTextFieldSelect;
