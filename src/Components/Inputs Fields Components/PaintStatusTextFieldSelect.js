import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function PaintStatusTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="paintStatus"
      label={t("paintStatus")}
      size="small"
      margin="normal"
      {...register("paintStatus")}
      error={!!errors.paintStatus}
      helperText={errors.paintStatus?.message}
    >
      <MenuItem value={"original"}>
        {i18n.language === "en" ? "original" : "أساسي"}
      </MenuItem>
      <MenuItem value={"repainted"}>
        {i18n.language === "en" ? "repainted" : "معاد طلائها"}
      </MenuItem>
    </TextField>
  );
}

export default PaintStatusTextFieldSelect;
