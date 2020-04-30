import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";
import Container from "react-bootstrap/Container";

export const getServerSideProps = optionalAuth;

export function Aqi() {
  const { data } = useSWR("/api/airApi", fetch, {
    // By default, useSWR will call the endpoint we specified (in this case, /api/airApi) every time we click away from
    // the page. This can be really useful if we want to make sure the web app is always showing the latest data,
    // but in this case, we don't need that behavior. See what happens if you set these options to true or remove them!
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return <Spinner animation="border" />;
  }

  return (
    // <Layout>
    //   <Container>
    //     <Card>
    //       <Card.Title>Location: {data.name}</Card.Title>
    //       <Card.Subtitle>Air Quality Index (AQI): {data.aqi}</Card.Subtitle>
    //     </Card>
    //   </Container>
    // </Layout>
    <span>
      {data.aqi}
      <br />
      (Specific Location: {data.name})
    </span>
  );
}
