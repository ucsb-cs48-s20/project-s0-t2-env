import React from "react";
import CitiesSearch from "../components/CitiesSearch";
import { select, text, object, array, number } from "@storybook/addon-knobs";
// import { action } from "@storybook/addon-actions";
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
  const data = object(useSWR("/api/cities/all", fetch, {}));

  //   const data = object(useSWR("/api/shortJSON.json", fetch, {}));
  //   const data = object("Data", ["A", "B", "C", "D"]);
  const theme = object(useTheme());
  const filterOptions = object(
    createFilterOptions({
      limit: 5,
    })
  );
  /*
  const filName = text("FilName", "FilterOptions");
  const limit = number("Limit", 5);
  const filterOptions = object(filName, limit);

  const opts = array("Options", [1, 2, 3, 4, 5, 6, 7, 8], ",");
  */

  /*
  const value = text("Value", "San Francisco");

  const names = { data, filterOptions }; */
  //   const filterOptions = { options, filter };
  return (
    <AppBar>
      <Toolbar>
        <div>
          <CitiesSearch
            names={data}
            /*value={value}*/
            filterOptions={filterOptions}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
