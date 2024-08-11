import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function ComputerCategoryTextFieldSelect({ register, errors, subCategory }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="computerCategory"
      label={t("computerCategory")}
      size="small"
      margin="normal"
      {...register("computerCategory")}
      error={!!errors.computerCategory}
      helperText={errors.computerCategory?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"Victus"}>Victus</MenuItem>
      <MenuItem value={"vivo book"}>vivo book</MenuItem>
      <MenuItem value={"EliteBook"}>EliteBook</MenuItem>
    </TextField>
  );
}

export default ComputerCategoryTextFieldSelect;
