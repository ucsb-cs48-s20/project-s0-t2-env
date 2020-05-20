import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Link from "next/link";

export default function CitiesSearch() {
  const { data: names } = useSWR("/api/cities/all", fetch, {});

  const defaultProps = {
    options: names,
  };

  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value != null) {
      window.location.href = "/cities/" + value;
    }
  });
  return (
    <div style={{ width: 300 }} data-cy="search">
      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField
            {...params}
            label="Cities"
            margin="normal"
            data-cy="search-input"
            id="searchfield"
            class="myfield"
          />
        )}
      />
    </div>
  );
}
