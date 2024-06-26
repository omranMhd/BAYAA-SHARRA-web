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
      {brands?.map((brand) => {
        return (
          <MenuItem value={brand.brand.en}>
            {i18n.language === "en" ? brand.brand.en : brand.brand.ar}
          </MenuItem>
        );
      })}
      {/* <MenuItem value={"TOYOTA"}>TOYOTA</MenuItem>
      <MenuItem value={"FORD"}>FORD</MenuItem>
      <MenuItem value={"CHEVROLET"}>CHEVROLET</MenuItem>
      <MenuItem value={"NISSAN"}>NISSAN</MenuItem>
      <MenuItem value={"HYUNDAI"}>HYUNDAI</MenuItem>
      <MenuItem value={"GENESIS"}>GENESIS</MenuItem>
      <MenuItem value={"LEXUS"}>LEXUS</MenuItem>
      <MenuItem value={"GMC"}>GMC</MenuItem>
      <MenuItem value={"MERCEDES"}>MERCEDES</MenuItem>
      <MenuItem value={"HONDA"}>HONDA</MenuItem>
      <MenuItem value={"BMW"}>BMW</MenuItem>
      <MenuItem value={"KIA"}>KIA</MenuItem>
      <MenuItem value={"DODGE"}>DODGE</MenuItem>
      <MenuItem value={"CHRYSLER"}>CHRYSLER</MenuItem>
      <MenuItem value={"JEEP"}>JEEP</MenuItem>
      <MenuItem value={"MITSUBISHI"}>MITSUBISHI</MenuItem>
      <MenuItem value={"MAZDA"}>MAZDA</MenuItem>
      <MenuItem value={"LAND ROVER"}>LAND ROVER</MenuItem>
      <MenuItem value={"ISUZU"}>ISUZU</MenuItem>
      <MenuItem value={"CADILLAC"}>CADILLAC</MenuItem>
      <MenuItem value={"PORSCHE"}>PORSCHE</MenuItem>
      <MenuItem value={"AUDI"}>AUDI</MenuItem>
      <MenuItem value={"SUZUKI"}>SUZUKI</MenuItem>
      <MenuItem value={"INFINITY"}>INFINITY</MenuItem>
      <MenuItem value={"HUMMER"}>HUMMER</MenuItem>
      <MenuItem value={"LINCOLIN"}>LINCOLIN</MenuItem>
      <MenuItem value={"VOLKSWAGEN"}>VOLKSWAGEN</MenuItem>
      <MenuItem value={"DIAHATSU"}>DIAHATSU</MenuItem>
      <MenuItem value={"GEELY"}>GEELY</MenuItem>
      <MenuItem value={"MERCURY"}>MERCURY</MenuItem>
      <MenuItem value={"VOLVO"}>VOLVO</MenuItem>
      <MenuItem value={"PEUGEOT"}>PEUGEOT</MenuItem>
      <MenuItem value={"BENTLEY"}>BENTLEY</MenuItem>
      <MenuItem value={"JAGUAR"}>JAGUAR</MenuItem>
      <MenuItem value={"SUBARU"}>SUBARU</MenuItem>
      <MenuItem value={"MG"}>MG</MenuItem>
      <MenuItem value={"CHANGAN"}>CHANGAN</MenuItem>
      <MenuItem value={"BUICK"}>BUICK</MenuItem>
      <MenuItem value={"MASERATI"}>MASERATI</MenuItem>
      <MenuItem value={"ROLLSROYCE"}>ROLLSROYCE</MenuItem>
      <MenuItem value={"LAMBORGHINI"}>LAMBORGHINI</MenuItem>
      <MenuItem value={"OPEL"}>OPEL</MenuItem>
      <MenuItem value={"SKODA"}>SKODA</MenuItem>
      <MenuItem value={"FERRARI"}>FERRARI</MenuItem>
      <MenuItem value={"CITEROEN"}>CITEROEN</MenuItem>
      <MenuItem value={"CHERY"}>CHERY</MenuItem>
      <MenuItem value={"SEAT"}>SEAT</MenuItem>
      <MenuItem value={"DAEWOO"}>DAEWOO</MenuItem>
      <MenuItem value={"SABB"}>SABB</MenuItem>
      <MenuItem value={"FIAT"}>FIAT</MenuItem>
      <MenuItem value={"SANGYONG"}>SANGYONG</MenuItem>
      <MenuItem value={"ASTONMARTIN"}>ASTONMARTIN</MenuItem>
      <MenuItem value={"PROTON"}>PROTON</MenuItem>
      <MenuItem value={"HAVAL"}>HAVAL</MenuItem>
      <MenuItem value={"GAC"}>GAC</MenuItem>
      <MenuItem value={"GREAT WALL"}>GREAT WALL</MenuItem>
      <MenuItem value={"FAW"}>FAW</MenuItem>
      <MenuItem value={"BYD"}>BYD</MenuItem>
      <MenuItem value={"ALFA ROMEO"}>ALFA ROMEO</MenuItem>
      <MenuItem value={"TATA"}>TATA</MenuItem>
      <MenuItem value={"JMC"}>JMC</MenuItem>
      <MenuItem value={"JETOUR"}>JETOUR</MenuItem>
      <MenuItem value={"CMC"}>CMC</MenuItem>
      <MenuItem value={"FOTON"}>FOTON</MenuItem>
      <MenuItem value={"LIFAN"}>LIFAN</MenuItem>
      <MenuItem value={"MAXUS"}>MAXUS</MenuItem>
      <MenuItem value={"JAC"}>JAC</MenuItem>
      <MenuItem value={"BAIC"}>BAIC</MenuItem>
      <MenuItem value={"DONGFENG"}>DONGFENG</MenuItem>
      <MenuItem value={"TESLA"}>TESLA</MenuItem>
      <MenuItem value={"SOUEASTE"}>SOUEASTE</MenuItem>
      <MenuItem value={"MAHINDRE"}>MAHINDRE</MenuItem>
      <MenuItem value={"ZOTYE"}>ZOTYE</MenuItem>
      <MenuItem value={"HONGQI"}>HONGQI</MenuItem> */}
    </TextField>
  );
}

export default VehicleBrandTextFieldSelect;
