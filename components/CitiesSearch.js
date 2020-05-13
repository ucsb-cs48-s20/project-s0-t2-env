import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Link from "next/link";
//function CitiesDropdown(props) {
//const { data: names } = useSWR("/api/cities/all", fetch, {});
//return (
/*<DropdownButton id="dropdown-basic-button" title="Cities" className="ml-2">
      {names ? (
        names.map((name) => (
          <Dropdown.Item href={"/cities/" + name}>{name}</Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>Cities loading...</Dropdown.Item>
      )}
    </DropdownButton>
  );
}*/

//export default CitiesDropdown;

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
    <div style={{ width: 300 }}>
      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          //window.location.href="/cities/" + newValue
        }}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField {...params} label="Cities" margin="normal" />
        )}
      />
    </div>
  );
}
