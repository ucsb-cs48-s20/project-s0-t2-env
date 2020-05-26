import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

function Layout(props) {
  const user = props.user;
  const names = props.names;
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#8ebd7b",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#758E9D",
      },
    },
    typography: {
      fontFamily: ["Lato"],
    },
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap"
        rel="stylesheet"
      ></link>
      <style global jsx>{`
        body {
          font-family: Lato;
          letter-spacing: 1px;
          word-spacing: 2px;
          color: ${"#000000"};
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <AppNavbar user={user} names={names} />
        {props.children}
      </ThemeProvider>
      <AppFooter />
    </>
  );
}

export default Layout;
