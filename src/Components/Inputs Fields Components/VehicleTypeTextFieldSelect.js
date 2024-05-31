import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function VehicleTypeTextFieldSelect({ register, errors, subCategories }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="vehicleType"
      label={t("vehicleType")}
      size="small"
      margin="normal"
      {...register("vehicleType")}
      error={!!errors.vehicleType}
      helperText={errors.vehicleType?.message}
    >
      {subCategories?.map((category) => {
        if (category.name_en !== "Spare parts") {
          return (
            <MenuItem key={category.id} value={category.name_en}>
              {i18n.language == "en" && category.name_en}
              {i18n.language == "ar" && category.name_ar}
            </MenuItem>
          );
        }
      })}
    </TextField>
  );
}

export default VehicleTypeTextFieldSelect;
