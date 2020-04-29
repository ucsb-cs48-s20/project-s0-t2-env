import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function AppNavbar(props) {
  const user = props.user;

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
            <Link href="/cities/goleta" passHref={true}>
              <Nav.Link>Goleta</Nav.Link>
            </Link>
          </Nav>
          <DropdownButton
            id="dropdown-basic-button"
            title="Cities"
            className="mr-2"
          >
            <Dropdown.Item href="#/action-1">Goleta</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Santa Barbara</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Los Angeles</Dropdown.Item>
            <Dropdown.Item href="#/action-4">San Francisco</Dropdown.Item>
            <Dropdown.Item href="#/action-5">San Diego</Dropdown.Item>
            <Dropdown.Item href="#/action-6">San Jose</Dropdown.Item>
            <Dropdown.Item href="#/action-7">Sacramento</Dropdown.Item>
            <Dropdown.Item href="#/action-8">Oakland</Dropdown.Item>
            <Dropdown.Item href="#/action-9">Anaheim</Dropdown.Item>
            <Dropdown.Item href="#/action-10">Fresno</Dropdown.Item>
          </DropdownButton>
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
