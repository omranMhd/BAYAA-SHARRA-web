import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

function MobileOrTableteBrandTextFieldSelect({
  register,
  errors,
  subCategory,
}) {
  const [brands, setBrands] = useState([
    {
      brand: {
        en: "iphone",
        ar: "آيفون",
      },
      category: [
        {
          en: "14",
          ar: "14",
        },
        {
          en: "14 Plus",
          ar: "14 بلاس",
        },
        {
          en: "14 Pro",
          ar: "14 برو",
        },
      ],
    },
    {
      brand: {
        en: "samsung",
        ar: "سامسونغ",
      },
      category: [
        {
          en: "A12",
          ar: "A12",
        },
        {
          en: "J5",
          ar: "J5",
        },
        {
          en: "A13",
          ar: "A13",
        },
        {
          en: "Note5",
          ar: "نوت 5",
        },
      ],
    },
    {
      brand: {
        en: "huawei",
        ar: "هواوي",
      },
      category: [],
    },
    {
      brand: {
        en: "sony",
        ar: "سوني",
      },
      category: [],
    },
    {
      brand: {
        en: "blackberry",
        ar: "بلاك بيري",
      },
      category: [],
    },
    {
      brand: {
        en: "nokia",
        ar: "نوكيا",
      },
      category: [],
    },
    {
      brand: {
        en: "htc",
        ar: "إتش تي سي",
      },
      category: [],
    },
    {
      brand: {
        en: "xiaomi",
        ar: "شاومي",
      },
      category: [],
    },
  ]);
  const { t, i18n } = useTranslation();

  return (
    <TextField
      select
      autoComplete="given-name"
      fullWidth
      id="mobOrTabBrand"
      label={subCategory === "Mobile" ? t("mobileBrand") : t("tabletBrand")}
      size="small"
      margin="normal"
      {...register("mobOrTabBrand")}
      error={!!errors.mobOrTabBrand}
      helperText={errors.mobOrTabBrand?.message}
    >
      <MenuItem value={" "}>-</MenuItem>
      {brands.map((brand) => {
        return (
          <MenuItem key={brand.brand.en} value={brand.brand.en}>
            {i18n.language === "en" ? brand.brand.en : brand.brand.ar}
          </MenuItem>
        );
      })}
      {/*       
      <MenuItem value={"iphone"}>
        {i18n.language === "en" ? "IPHONE" : "آيفون"}
      </MenuItem>
      <MenuItem value={"samsung"}>
        {i18n.language === "en" ? "SAMSUNG" : "سامسونغ"}
      </MenuItem>
      <MenuItem value={"huawei"}>
        {i18n.language === "en" ? "HUAWEI" : "هواوي"}
      </MenuItem>
      <MenuItem value={"sony"}>
        {i18n.language === "en" ? "SONY" : "سوني"}
      </MenuItem>
      <MenuItem value={"blackberry"}>
        {i18n.language === "en" ? "BLACKBERRY" : "بلاك بيري"}
      </MenuItem>
      <MenuItem value={"nokia"}>
        {i18n.language === "en" ? "NOKIA" : "نوكيا"}
      </MenuItem>
      <MenuItem value={"htc"}>
        {i18n.language === "en" ? "HTC" : "إتش تي سي"}
      </MenuItem>
      <MenuItem value={"xiaomi"}>
        {i18n.language === "en" ? "XIAOMI" : "شاومي"}
      </MenuItem> */}
    </TextField>
  );
}

export default MobileOrTableteBrandTextFieldSelect;
