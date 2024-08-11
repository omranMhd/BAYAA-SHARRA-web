import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function MaterialTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="material"
      label={t("material")}
      size="small"
      margin="normal"
      {...register("material")}
      error={!!errors.material}
      helperText={errors.material?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"wood"}>
        {i18n.language === "en" ? "wood" : "خشب"}
      </MenuItem>
      <MenuItem value={"metal"}>
        {i18n.language === "en" ? "metal" : "معدن"}
      </MenuItem>
      <MenuItem value={"leather"}>
        {i18n.language === "en" ? "leather" : "جلد"}
      </MenuItem>
      <MenuItem value={"plastic"}>
        {i18n.language === "en" ? "plastic" : "بلاستك"}
      </MenuItem>
    </TextField>
  );
}

export default MaterialTextFieldSelect;
