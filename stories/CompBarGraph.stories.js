import React from "react";
import CompBarGraph from "../components/CompBarGraph";
import { select, text, object, array, number } from "@storybook/addon-knobs";
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
  const labels = ["Average", "Chris Gaucho"];
  const data = [3, 3];
  const title = "Hour(s) of Screen Time Per Day";
  return <CompBarGraph labels={labels} data={data} title={title} />;
};
