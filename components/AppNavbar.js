import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import CitiesDropdown from "./CitiesDropdown";

function AppNavbar(props) {
  const user = props.user;
  const { names } = useSWR("/api/cities/all", fetch, {
    // By default, useSWR will call the endpoint we specified (in this case, /api/dog) every time we click away from
    // the page. This can be really useful if we want to make sure the web app is always showing the latest data,
    // but in this case, we don't need that behavior. See what happens if you set these options to true or remove them!
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return (
    <Navbar variant="dark" style={{ backgroundColor: "#325d79" }} expand="lg">
      <Container style={{ padding: "0px" }}>
        <Link href="/" passHref={true}>
          <Navbar.Brand style={{ fontSize: "25px" }}>
            Environmental Impacts App
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <CitiesDropdown />
          </Nav>
          <Nav>
            {user ? (
              <NavDropdown
                title={
                  <>
                    Hi, {user.name}
                    <Image
                      className="ml-2"
                      src={user.picture}
                      width={24}
                      height={24}
                    />
                  </>
                }
              >
                <NavDropdown.Item className="text-danger" href="/api/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button data-cy="login" href="/api/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
