import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function VehicleBrandTextFieldSelect({ register, errors, brands }) {
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="vehicleBrand"
      label={t("vehicleBrand")}
      size="small"
      margin="normal"
      {...register("vehicleBrand")}
      error={!!errors.vehicleBrand}
      helperText={errors.vehicleBrand?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      {brands?.map((brand) => {
        return (
          <MenuItem value={brand.brand.en}>
            {i18n.language === "en" ? brand.brand.en : brand.brand.ar}
          </MenuItem>
        );
      })}
    </TextField>
  );
}

export default VehicleBrandTextFieldSelect;
