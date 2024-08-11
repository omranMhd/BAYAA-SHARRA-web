import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function MobileOrTableteCategoryTextFieldSelect({
  register,
  errors,
  subCategory,
  categoriesList,
}) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="mobOrTabCategory"
      label={
        subCategory === "Mobile" ? t("mobileCategory") : t("tabletCategory")
      }
      size="small"
      margin="normal"
      {...register("mobOrTabCategory")}
      error={!!errors.mobOrTabCategory}
      helperText={errors.mobOrTabCategory?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      {categoriesList?.map((c) => {
        return (
          <MenuItem value={c.en}>
            {i18n.language === "en" ? c.en : c.ar}
          </MenuItem>
        );
      })}
    </TextField>
  );
}

export default MobileOrTableteCategoryTextFieldSelect;
