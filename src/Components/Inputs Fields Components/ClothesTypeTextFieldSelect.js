import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ClothesTypeTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="clothesType"
      label={t("clothesType")}
      size="small"
      margin="normal"
      {...register("clothesType")}
      error={!!errors.clothesType}
      helperText={errors.clothesType?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"pants"}>
        {i18n.language === "en" ? "pants" : "بنطال"}
      </MenuItem>
      <MenuItem value={"shirt"}>
        {i18n.language === "en" ? "metal" : "قميس"}
      </MenuItem>
      <MenuItem value={"jacket"}>
        {i18n.language === "en" ? "metal" : "سترة"}
      </MenuItem>
      <MenuItem value={"formal suit"}>
        {i18n.language === "en" ? "metal" : "لباس رسمي"}
      </MenuItem>
      <MenuItem value={"shoes"}>
        {i18n.language === "en" ? "metal" : "حذاء"}
      </MenuItem>
    </TextField>
  );
}

export default ClothesTypeTextFieldSelect;
