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
      <MenuItem value={"iphone"}>
        {i18n.language === "en" ? "IPHONE" : "آيفون"}
      </MenuItem>
      <MenuItem value={"samsung"}>
        {i18n.language === "en" ? "SAMSUNG" : "سامسونغ"}
      </MenuItem>
      <MenuItem value={"huawei"}>
        {i18n.language === "en" ? "HUAWEI" : "هواوي"}
      </MenuItem>
      <MenuItem value={"sony"}>
        {i18n.language === "en" ? "SONY" : "سوني"}
      </MenuItem>
      <MenuItem value={"blackberry"}>
        {i18n.language === "en" ? "BLACKBERRY" : "بلاك بيري"}
      </MenuItem>
      <MenuItem value={"nokia"}>
        {i18n.language === "en" ? "NOKIA" : "نوكيا"}
      </MenuItem>
      <MenuItem value={"htc"}>
        {i18n.language === "en" ? "HTC" : "إتش تي سي"}
      </MenuItem>
      <MenuItem value={"xiaomi"}>
        {i18n.language === "en" ? "XIAOMI" : "شاومي"}
      </MenuItem>
    </TextField>
  );
}

export default MobileOrTableteBrandTextFieldSelect;
