import React from "react";
import CarbonEmissions from "../components/CarbonEmissions";
import { text } from "@storybook/addon-knobs";
import { Card, CardContent } from "@material-ui/core";

export default {
  title: "CarbonEmissions",
  component: CarbonEmissions,
};

export const SimpleCarbonEmissions = () => {
  const CO2 = text("CO2", "123,456,789");
  const trees = text("Trees", "2,057,613,150");
  return (
    <Card style={{ textAlign: "center", margin: "20px" }}>
      <CardContent>
        <CarbonEmissions CO2={CO2} trees={trees} />
      </CardContent>
    </Card>
  );
};
