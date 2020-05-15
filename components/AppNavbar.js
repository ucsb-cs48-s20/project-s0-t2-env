import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import CitiesSearch from "./CitiesSearch";

function AppNavbar(props) {
  const user = props.user;

  return (
    <Navbar variant="dark" style={{ backgroundColor: "#edf4f8" }} expand="lg">
      <Container style={{ padding: "0px" }}>
        <Link href="/" passHref={true}>
          <Navbar.Brand style={{ fontSize: "25px", color: "#325d79" }}>
            Environmental Impacts App
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <CitiesSearch />
            {user && (
              <Link href="/login" passHref={true}>
                <Nav.Link
                  style={{ fontSize: "15px", color: "#325d79" }}
                  className="mt-4"
                >
                  Personal Input
                </Nav.Link>
              </Link>
            )}
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
