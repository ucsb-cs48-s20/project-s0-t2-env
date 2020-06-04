import React from "react";
import CompBarGraph from "../components/CompBarGraph";
import { array, text } from "@storybook/addon-knobs";

export default {
  title: "CompBarGraph",
  component: CompBarGraph,
};

export const AverageCompBarGraph = () => {
  const labels = array("Categories", ["Average", "Chris Gaucho"], ",");
  const data = array("Data", [3, 3], ",");
  const title = text("Title", "Hour(s) of Screen Time Per Day");
  return <CompBarGraph labels={labels} data={data} title={title} />;
};

export const AboveAverageCompBarGraph = () => {
  const labels = array("Categories", ["Average", "Chris Gaucho"], ",");
  const data = array("Data", [3, 6], ",");
  const title = text("Title", "Hour(s) of Screen Time Per Day");
  return <CompBarGraph labels={labels} data={data} title={title} />;
};

export const BelowAverageCompBarGraph = () => {
  const labels = array("Categories", ["Average", "Chris Gaucho"], ",");
  const data = array("Data", [3, 2], ",");
  const title = text("Title", "Hour(s) of Screen Time Per Day");
  return <CompBarGraph labels={labels} data={data} title={title} />;
};
