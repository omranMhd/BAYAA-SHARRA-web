import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ClothesStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="clothesStatus"
      label={t("clothesStatus")}
      size="small"
      margin="normal"
      {...register("clothesStatus")}
      error={!!errors.clothesStatus}
      helperText={errors.clothesStatus?.message}
    >
      <MenuItem value={"old"}>Old</MenuItem>
      <MenuItem value={"new"}>New</MenuItem>
    </TextField>
  );
}

export default ClothesStatusTextFieldSelect;
