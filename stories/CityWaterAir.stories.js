import React from "react";
import CityWaterAir from "../components/CityWaterAir";
import { text, number } from "@storybook/addon-knobs";

export default {
  title: "CityWaterAir",
  component: CityWaterAir,
};

export const HasAllDataCityWaterAir = () => {
  const waterpH = number("WaterPH", 6.8);
  const totalDissolvedSolids = number("TotalDissolvedSolids", 124);
  const specificConductance = number("SpecificConductance", 1030);
  const url = text("URL", "/");
  const aqi = number("AQI", 60);

  const data = {
    waterpH,
    totalDissolvedSolids,
    specificConductance,
    url,
    aqi,
  };
  return <CityWaterAir data={data} />;
};

export const HasMissingDataCityWaterAir = () => {
  const waterpH = number("WaterPH");
  const totalDissolvedSolids = number("TotalDissolvedSolids");
  const specificConductance = number("SpecificConductance");
  const url = text("URL", "/");
  const aqi = number("AQI", 54);

  const data = {
    waterpH,
    totalDissolvedSolids,
    specificConductance,
    url,
    aqi,
  };
  return <CityWaterAir data={data} />;
};
