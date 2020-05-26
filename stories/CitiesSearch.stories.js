import React from "react";
import CitiesSearch from "../components/CitiesSearch";
import { select, text, object, array, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { AppBar, Toolbar } from "@material-ui/core";
import useSWR from "swr";
import { useTheme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default {
  title: "CitiesSearch",
  component: CitiesSearch,
};

export const SimpleCitiesSearch = () => {
  const names = array(
    "Names",
    [
      "Los Angeles",
      "Goleta",
      "Isla Vista",
      "San Jose",
      "Fremont",
      "Newport Beach",
      "",
      "Cupertino",
      "Santa Barbara",
      "San Diego",
      "Sunnyvale",
    ],
    ","
  );
  return (
    <AppBar>
      <Toolbar>
        <div>
          <CitiesSearch names={names} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
