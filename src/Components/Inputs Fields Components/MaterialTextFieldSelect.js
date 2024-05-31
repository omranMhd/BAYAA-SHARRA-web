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
      <MenuItem value={"wood"}>wood</MenuItem>
      <MenuItem value={"metal"}>metal</MenuItem>
      <MenuItem value={"leather"}>leather</MenuItem>
      <MenuItem value={"plastic"}>plastic</MenuItem>
    </TextField>
  );
}

export default MaterialTextFieldSelect;
