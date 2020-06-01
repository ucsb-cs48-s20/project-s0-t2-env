import NextLink from "next/link";
import CitiesSearch from "./CitiesSearch";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Chip,
  Link,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

function AppNavbar(props) {
  const user = props.user;
  const onChange = props.onChange;
  const theme = useTheme();

  return (
    <Navbar
      variant="dark"
      style={{ backgroundColor: theme.palette.primary.main }}
      expand="lg"
      data-cy="navbar"
    >
      <Container style={{ padding: "0px" }}>
        <NextLink passHref={true} href="/">
          <Navbar.Brand
            variant="h6"
            style={{
              fontSize: "25px",
              color: theme.palette.primary.contrastText,
            }}
          >
            Environmental Impacts App
          </Navbar.Brand>
        </NextLink>
        <div
          style={{
            marginLeft: theme.spacing(2),
            marginTop: theme.spacing(-2.5),
          }}
        >
          <CitiesSearch names={props.names} onChange={onChange} />
        </div>
        {user && (
          <Link href="/login" passHref={true}>
            <Nav.Link
              href="/login"
              style={{
                fontSize: "15px",
                color: theme.palette.primary.contrastText,
              }}
              href="/login"
              className="mt-2"
              data-cy="personal-input"
            >
              Personal Input
            </Nav.Link>
          </Link>
        )}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
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
                data-cy="greeting"
              >
                <NavDropdown.Item
                  className="text-danger"
                  href="/api/logout"
                  data-cy="logout"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                data-cy="login"
                href="/api/login"
              >
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
