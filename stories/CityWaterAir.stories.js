import React from "react";
import CityWaterAir from "../components/CityWaterAir";
import { text, number } from "@storybook/addon-knobs";

export default {
  title: "CityWaterAir",
  component: CityWaterAir,
};

export const SimpleCityWaterAir = () => {
  const name = text("Name", "Goleta");
  const state = text("State", "CA");
  const population = number("Population", 123344);
  const C02 = number("C02", 123345654);
  const waterpH = number("WaterPH", 6.8);
  const totalDissolvedSolids = number("TotalDissolvedSolids", 124);
  const specificConductance = number("SpecificConductance", 1030);
  const url = text("URL", "/");
  const aqi = number("AQI", 60);

  const data = {
    name,
    state,
    population,
    C02,
    waterpH,
    totalDissolvedSolids,
    specificConductance,
    url,
    aqi,
  };
  return <CityWaterAir data={data} />;
};
