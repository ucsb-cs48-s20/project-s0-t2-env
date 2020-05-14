import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import useSWR from "swr";
import { fetch } from "../utils/fetch";

function CitiesDropdown(props) {
  const { data: names } = useSWR("/api/cities/all", fetch, {});
  return (
    <DropdownButton id="dropdown-basic-button" title="Cities" className="ml-2">
      {names ? (
        names.map((name) => (
          <Dropdown.Item href={"/cities/" + name}>{name}</Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>Cities loading...</Dropdown.Item>
      )}
    </DropdownButton>
  );
}

export default CitiesDropdown;
