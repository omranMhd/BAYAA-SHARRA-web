import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function CladdingTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="cladding"
      label={t("cladding")}
      size="small"
      margin="normal"
      {...register("cladding")}
      error={!!errors.cladding}
      helperText={errors.cladding?.message}
    >
      <MenuItem value={"deluxe"}>
        {i18n.language === "en" ? "deluxe" : "ديلوكس"}
      </MenuItem>
      <MenuItem value={"new"}>
        {i18n.language === "en" ? "new" : "جديد"}
      </MenuItem>
      <MenuItem value={"good"}>
        {i18n.language === "en" ? "good" : "جيدة"}
      </MenuItem>
      <MenuItem value={"old"}>
        {i18n.language === "en" ? "old" : "قديم"}
      </MenuItem>
      <MenuItem value={"chassis"}>
        {i18n.language === "en" ? "chassis" : "هيكل"}
      </MenuItem>
    </TextField>
  );
}

export default CladdingTextFieldSelect;
