import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function GearTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="gear"
      label={t("gear")}
      size="small"
      margin="normal"
      {...register("gear")}
      error={!!errors.gear}
      helperText={errors.gear?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"normal"}>
        {i18n.language === "en" ? "Normal" : "عادي"}
      </MenuItem>
      <MenuItem value={"automatic"}>
        {i18n.language === "en" ? "Automatic" : "أوتوماتيك"}
      </MenuItem>
    </TextField>
  );
}

export default GearTextFieldSelect;
