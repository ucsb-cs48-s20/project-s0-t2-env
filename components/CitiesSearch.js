import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

export default function CitiesSearch(props) {
  const names = props.names;
  // const { data: names } = useSWR("/api/cities/all", fetch, {});
  const theme = useTheme();
  const filterOptions = createFilterOptions({
    limit: 5,
  });

  const [value, setValue] = useState(null);
  // useEffect(() => {
  //   if (value != null) {
  //     window.location.href = "/cities/" + value;
  //   }
  // });
  if (!names) {
    return <div></div>;
  }
  return (
    <div style={{ width: 300 }} data-cy="search">
      <Autocomplete
        filterOptions={filterOptions}
        options={names}
        value={value}
        onChange={props.onChange}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cities"
            margin="normal"
            data-cy="searchfield"
          />
        )}
      />
    </div>
  );
}
