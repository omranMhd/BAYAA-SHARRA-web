import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from '@mui/material/InputAdornment';


function MobileOrTabletRamNumberField({ register, errors, subCategory }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="mobOrTabRam"
      // label="mobOrTabRam"
      label={subCategory === "Mobile" ? t("ram") : t("ram")}
      size="small"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {i18n.language === "en" ? "(GB)" : "(غيغابايت)"}
          </InputAdornment>
        ),
      }}
      {...register("mobOrTabRam")}
      error={!!errors.mobOrTabRam}
      helperText={errors.mobOrTabRam?.message}
    />
  );
}

export default MobileOrTabletRamNumberField;
