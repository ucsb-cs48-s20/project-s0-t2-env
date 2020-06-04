import React from "react";
import EmissionsPie from "../components/EmissionsPie";
import { number } from "@storybook/addon-knobs";

export default {
  title: "EmissionsPie",
  component: EmissionsPie,
};

export const SimpleEmissionsPie = () => {
  const transport = number("Transport", 12);
  const housing = number("Housing", 16);
  const food = number("Good", 3);
  const goods = number("Goods", 20);
  const services = number("Services", 29);
  const total = number("Total", transport + housing + food + goods + services);
  const energyShare = { transport, housing, food, goods, services, total };
  const data = { energyShare };
  return <EmissionsPie data={data} />;
};
