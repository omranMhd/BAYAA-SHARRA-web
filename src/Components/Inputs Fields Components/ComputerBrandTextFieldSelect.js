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
      <MenuItem value={"Samsung"}>Samsung</MenuItem>
      <MenuItem value={"HP"}>HP</MenuItem>
      <MenuItem value={"ASUS"}>ASUS</MenuItem>
      <MenuItem value={"Toshiba"}>Toshiba</MenuItem>
    </TextField>
  );
}

export default ComputerBrandTextFieldSelect;
