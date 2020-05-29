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

function AppNavbar(props) {
  const user = props.user;
  const onChange = props.onChange;
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar style={{ minWidth: "65%", margin: "auto" }}>
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
              className="mt-2"
            >
              Personal Input
            </Nav.Link>
          </Link>
        )}
        <div style={{ flexGrow: 1 }} />
        {user ? (
          <div>
            <Chip
              avatar={<Avatar src={user.picture} width={24} height={24} />}
              label={user.name}
              style={{ marginRight: "10px" }}
            />
            <Button variant="outlined" color="secondary" href="/api/logout">
              Logout
            </Button>
          </div>
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
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;
