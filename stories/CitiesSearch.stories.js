import React from "react";
import CitiesSearch from "../components/CitiesSearch";
import { select, text, object, array } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
import { AppBar, Toolbar } from "@material-ui/core";
import useSWR from "swr";
import { useTheme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

export default {
  title: "CitiesSearch",
  component: CitiesSearch,
};

export const SimpleCitiesSearch = () => {
  const data = object(useSWR("/api/cities/all", fetch, {}));
  const theme = object(useTheme());
  const filter = object(
    createFilterOptions({
      limit: 5,
    })
  );

  const options = array("Options", [1, 2, 3, 4, 5, 6, 7, 8], ",");

  const value = text("Value", "San Francisco");

  const names = { data };
  const filterOptions = { options, filter };
  return (
    <AppBar>
      <Toolbar>
        <div>
          <CitiesSearch names={names} value={value} filterOptions={options} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
