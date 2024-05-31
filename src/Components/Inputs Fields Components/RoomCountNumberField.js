import React from "react";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";

function RoomCountNumberField({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      type="number"
      autoComplete="given-name"
      fullWidth
      id="roomCount"
      label={t("roomCount")}
      size="small"
      margin="normal"
      {...register("roomCount")}
      error={!!errors.roomCount}
      helperText={errors.roomCount?.message}
    />
  );
}

export default RoomCountNumberField;
