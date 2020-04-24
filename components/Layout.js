import Container from "react-bootstrap/Container";
import AppNavbar from "./AppNavbar";
import AppFooter from "./AppFooter";

function Layout(props) {
  const user = props.user;

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
        }
      `}</style>
      <AppNavbar user={user} />
      {props.children}
      <AppFooter />
    </>
  );
}

export default Layout;
