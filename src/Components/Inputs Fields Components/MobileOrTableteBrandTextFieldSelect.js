import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function MobileOrTableteBrandTextFieldSelect({
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
      id="mobOrTabBrand"
      label={subCategory === "Mobile" ? t("mobileBrand") : t("tabletBrand")}
      size="small"
      margin="normal"
      {...register("mobOrTabBrand")}
      error={!!errors.mobOrTabBrand}
      helperText={errors.mobOrTabBrand?.message}
    >
      <MenuItem value={"Samsung"}>Samsung</MenuItem>
      <MenuItem value={"Apple"}>Apple</MenuItem>
      <MenuItem value={"Huawei"}>Huawei</MenuItem>
      <MenuItem value={"Xiaomi"}>Xiaomi</MenuItem>
    </TextField>
  );
}

export default MobileOrTableteBrandTextFieldSelect;
