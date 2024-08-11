import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function FurnitureStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="furnitureStatus"
      label={t("furnitureStatus")}
      size="small"
      margin="normal"
      {...register("furnitureStatus")}
      error={!!errors.furnitureStatus}
      helperText={errors.furnitureStatus?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"old"}>
        {i18n.language === "en" ? "old" : "قديم"}
      </MenuItem>
      <MenuItem value={"new"}>
        {i18n.language === "en" ? "new" : "جديد"}
      </MenuItem>
    </TextField>
  );
}

export default FurnitureStatusTextFieldSelect;
