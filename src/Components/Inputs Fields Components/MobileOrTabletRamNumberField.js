import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function MobileOrTabletRamNumberField({ register, errors, subCategory }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="mobOrTabRam"
      // label="mobOrTabRam"
      label={subCategory === "Mobile" ? t("mobileRam") : t("tabletRam")}
      size="small"
      margin="normal"
      {...register("mobOrTabRam")}
      error={!!errors.mobOrTabRam}
      helperText={errors.mobOrTabRam?.message}
    />
  );
}

export default MobileOrTabletRamNumberField;
