import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function OwnershipTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    // <TextField
    //   autoComplete="given-name"
    //   fullWidth
    //   id="ownership"
    //   label={t("ownership")}
    //   size="small"
    //   margin="normal"
    //   {...register("ownership")}
    //   error={!!errors.ownership}
    //   helperText={errors.ownership?.message}
    // />
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="ownership"
      label={t("ownership")}
      size="small"
      margin="normal"
      {...register("ownership")}
      error={!!errors.ownership}
      helperText={errors.ownership?.message}
    >
      <MenuItem value={"north"}>
        {i18n.language === "en" ? "Separated Green Title Deed" : "طابو أخضر"}
      </MenuItem>
      <MenuItem value={"south"}>
        {i18n.language === "en" ? "Outright Sale Contract" : "عقد بيع قطعي"}
      </MenuItem>
      <MenuItem value={"west"}>
        {i18n.language === "en" ? "Court Judgment" : "حكم محكمة"}
      </MenuItem>
      <MenuItem value={"east"}>
        {i18n.language === "en" ? "Notary Public Agency" : "وكالة كاتب عدل"}
      </MenuItem>
      <MenuItem value={"north-east"}>
        {i18n.language === "en" ? "Shares Title Deed" : "طابو أسهم"}
      </MenuItem>
      <MenuItem value={"north-west"}>
        {i18n.language === "en" ? "Agricultural Title Deed" : "طابو زراعي"}
      </MenuItem>
      <MenuItem value={"south-east"}>
        {i18n.language === "en" ? "Housing Title Deed" : "طابو إسكان"}
      </MenuItem>
      <MenuItem value={"south-west"}>
        {i18n.language === "en" ? "Right of Use" : "فروغ"}
      </MenuItem>
    </TextField>
  );
}

export default OwnershipTextFieldSelect;
