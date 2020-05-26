import React from "react";
import CitiesSearch from "../components/CitiesSearch";
import { select, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { AppBar, Toolbar } from "@material-ui/core";

export default {
  title: "CitiesSearch",
  component: CitiesSearch,
};

export const SimpleCitiesSearch = () => {
  return (
    <AppBar>
      <Toolbar>
        <div>
          <CitiesSearch />
        </div>
      </Toolbar>
    </AppBar>
  );
};
