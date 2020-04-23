import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { fetch } from "../../utils/fetch";
import Layout from "../../components/Layout";
import { optionalAuth } from "../../utils/ssr";
import { useRouter } from "next/router";
import { FaMapPin } from "react-icons/fa";

function City() {
  const router = useRouter();
  const { city } = router.query;
  const { data } = useSWR("/api/cities/" + city, fetch, {
    // By default, useSWR will call the endpoint we specified (in this case, /api/dog) every time we click away from
    // the page. This can be really useful if we want to make sure the web app is always showing the latest data,
    // but in this case, we don't need that behavior. See what happens if you set these options to true or remove them!
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            {data.name}, {data.state}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <FaMapPin /> {data.latitude}, {data.longitude}
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>Population: {data.population}</ListGroup.Item>
            <ListGroup.Item>CO2 Emissions Per Year: {data.co2}</ListGroup.Item>
            <ListGroup.Item>
              Water Quality: {data.waterQuality}
              <br />
              Learn more about this calculation:{" "}
              <a
                target="blank"
                href="https://www.mae.gov.nl.ca/waterres/reports/hydrogeology_westernnl/appendix_v.pdf"
              >
                https://www.mae.gov.nl.ca/waterres/reports/hydrogeology_westernnl/appendix_v.pdf
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export const getServerSideProps = optionalAuth;

export default function CityPage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <City />
    </Layout>
  );
}
