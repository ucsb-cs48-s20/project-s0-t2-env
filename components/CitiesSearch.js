import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

export default function CitiesSearch(props) {
  const names = props.names;
  const theme = useTheme();
  const filterOptions = createFilterOptions({
    limit: 5,
  });

  const [value, setValue] = useState(null);

  if (!names) {
    return (
      <div style={{ height: 0 }}>
        Loading Search Bar
        <Spinner animation="border" variant="secondary" size="sm" />
      </div>
    );
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
            label="Cities in California"
            margin="normal"
            data-cy="searchfield"
          />
        )}
      />
    </div>
  );
}
