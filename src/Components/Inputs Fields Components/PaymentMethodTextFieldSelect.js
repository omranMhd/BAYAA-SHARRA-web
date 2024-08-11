import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function PaymentMethodTextFieldSelect({ register, errors }) {
  const { t, i18n } = useTranslation();
  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="paymentMethodRent"
      label={t("paymentMethodRent")}
      size="small"
      margin="normal"
      {...register("paymentMethodRent")}
      error={!!errors.paymentMethodRent}
      helperText={errors.paymentMethodRent?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      <MenuItem value={"daily"}>daily</MenuItem>
      <MenuItem value={"weekly"}>weekly</MenuItem>
      <MenuItem value={"monthly"}>monthly</MenuItem>
      <MenuItem value={"yearly"}>yearly</MenuItem>
    </TextField>
  );
}

export default PaymentMethodTextFieldSelect;
