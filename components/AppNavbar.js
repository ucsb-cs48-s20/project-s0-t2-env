import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import CitiesDropdown from "./CitiesDropdown";

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
            <CitiesDropdown />
            {user && (
              <Link href="/login" passHref={true}>
                <Nav.Link>Personal Input</Nav.Link>
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
