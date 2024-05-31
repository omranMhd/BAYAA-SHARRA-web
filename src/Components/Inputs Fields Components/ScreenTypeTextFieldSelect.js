import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ScreenTypeTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="screenType"
      label={t("screenType")}
      size="small"
      margin="normal"
      {...register("screenType")}
      error={!!errors.screenType}
      helperText={errors.screenType?.message}
    >
      <MenuItem value={"touch"}>touch</MenuItem>
      <MenuItem value={"normal"}>normal</MenuItem>
    </TextField>
  );
}

export default ScreenTypeTextFieldSelect;
