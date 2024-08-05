import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from '@mui/material/InputAdornment';


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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {i18n.language === "en" ? "(GB)" : "(غيغابايت)"}
          </InputAdornment>
        ),
      }}
      {...register("mobOrTabHard")}
      error={!!errors.mobOrTabHard}
      helperText={errors.mobOrTabHard?.message}
    />
  );
}

export default MobileOrTabletHardNumberField;
