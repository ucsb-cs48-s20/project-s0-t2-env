import React from "react";
import CompBarGraph from "../components/CompBarGraph";
import { array, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { AppBar, Toolbar } from "@material-ui/core";
import useSWR from "swr";
import { useTheme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
