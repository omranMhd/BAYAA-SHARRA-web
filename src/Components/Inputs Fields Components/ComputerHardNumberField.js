import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";

function ComputerHardNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="computerHard"
      label={t("computerHard")}
      size="small"
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {i18n.language === "en" ? "(GB)" : "(غيغابايت)"}
          </InputAdornment>
        ),
      }}
      {...register("computerHard")}
      error={!!errors.computerHard}
      helperText={errors.computerHard?.message}
    />
  );
}

export default ComputerHardNumberField;
