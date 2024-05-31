import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function MobileOrTableteCategoryTextFieldSelect({
  register,
  errors,
  subCategory,
}) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="mobOrTabCategory"
      label={subCategory === "Mobile" ? t("mobileCategory") : t("tabletCategory")}
      size="small"
      margin="normal"
      {...register("mobOrTabCategory")}
      error={!!errors.mobOrTabCategory}
      helperText={errors.mobOrTabCategory?.message}
    >
      <MenuItem value={"J5"}>J5</MenuItem>
      <MenuItem value={"Note 11 pro"}>Note 11 pro</MenuItem>
      <MenuItem value={"S23 ultra"}>S23 ultra</MenuItem>
    </TextField>
  );
}

export default MobileOrTableteCategoryTextFieldSelect;
