import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function MobileOrTabletHardNumberField({ register, errors, subCategory }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="mobOrTabHard"
      // label="mobOrTabRam"
      label={subCategory === "Mobile" ? t("hard") : t("hard")}
      size="small"
      margin="normal"
      {...register("mobOrTabHard")}
      error={!!errors.mobOrTabHard}
      helperText={errors.mobOrTabHard?.message}
    />
  );
}

export default MobileOrTabletHardNumberField;
