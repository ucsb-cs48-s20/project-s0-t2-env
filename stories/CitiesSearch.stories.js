import React from "react";
import CitiesSearch from "../components/CitiesSearch";
import { array } from "@storybook/addon-knobs";
import { AppBar, Toolbar } from "@material-ui/core";

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
      "Irvine",
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
          <CitiesSearch names={names} onChange={(event, newValue) => {}} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
