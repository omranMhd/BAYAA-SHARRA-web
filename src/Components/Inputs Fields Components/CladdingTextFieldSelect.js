import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function CladdingTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="cladding"
      label={t("cladding")}
      size="small"
      margin="normal"
      {...register("cladding")}
      error={!!errors.cladding}
      helperText={errors.cladding?.message}
    >
      <MenuItem value={"deluxe"}>deluxe</MenuItem>
      <MenuItem value={"new"}>new</MenuItem>
      <MenuItem value={"good"}>good</MenuItem>
      <MenuItem value={"old"}>old</MenuItem>
      <MenuItem value={"chassis"}>chassis</MenuItem>
    </TextField>
  );
}

export default CladdingTextFieldSelect;
