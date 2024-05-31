import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function CurrencyTextFieldSelect({ register, errors, currencies }) {
  const { t, i18n } = useTranslation();
  console.log("xxxxxxxxxxxxxxxxxxxx :", currencies);
  return (
    <>
      <TextField
        select
        autoComplete="given-name"
        fullWidth
        id="currency"
        label={t("currency")}
        size="small"
        margin="normal"
        {...register("currency")}
        error={!!errors.currency}
        helperText={errors.currency?.message}
      >
        {currencies.map((currency) => {
          return (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          );
        })}
      </TextField>
    </>
  );
}

export default CurrencyTextFieldSelect;
