import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";

function ComputerRamNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="computerRam"
      label={t("computerRam")}
      size="small"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {i18n.language === "en" ? "(GB)" : "(غيغابايت)"}
          </InputAdornment>
        ),
      }}
      {...register("computerRam")}
      error={!!errors.computerRam}
      helperText={errors.computerRam?.message}
    />
  );
}

export default ComputerRamNumberField;
