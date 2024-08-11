import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function SparePartStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="SparePartStatus"
      label={t("sparePartStatus")}
      size="small"
      margin="normal"
      {...register("SparePartStatus")}
      error={!!errors.SparePartStatus}
      helperText={errors.SparePartStatus?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"old"}>
        {i18n.language === "en" ? "Old" : "مستعمل"}
      </MenuItem>
      <MenuItem value={"new"}>
        {i18n.language === "en" ? "New" : "جديد"}
      </MenuItem>
    </TextField>
  );
}

export default SparePartStatusTextFieldSelect;
