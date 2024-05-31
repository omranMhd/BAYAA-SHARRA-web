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
      <MenuItem value={"pants"}>pants</MenuItem>
      <MenuItem value={"shirt"}>shirt</MenuItem>
      <MenuItem value={"jacket"}>jacket</MenuItem>
      <MenuItem value={"formal suit"}>formal suit</MenuItem>
      <MenuItem value={"shoes"}>shoes</MenuItem>
    </TextField>
  );
}

export default ClothesTypeTextFieldSelect;
