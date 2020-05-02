import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { fetch } from "../../utils/fetch";
import Layout from "../../components/Layout";
import { optionalAuth } from "../../utils/ssr";
import { useRouter } from "next/router";
import { FaMapPin, FaExternalLinkAlt } from "react-icons/fa";
import Container from "react-bootstrap/Container";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            {data.name}, {data.state}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <FaMapPin /> {data.latitude}, {data.longitude}
          </Card.Subtitle>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Population: {numberWithCommas(data.population)}
            </ListGroup.Item>
            <ListGroup.Item>
              <span>
                Carbon Emissions:
                <OverlayTrigger
                  key="CO2"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-CO2`}>
                      Click to learn more about this calculation.
                    </Tooltip>
                  }
                >
                  <a
                    style={{ margin: "5px" }}
                    href="https://coolclimate.org/maps"
                  >
                    {numberWithCommas(data.CO2)} tons of CO2 per year
                  </a>
                </OverlayTrigger>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span>
                Drinking Water Quality Index:
                <OverlayTrigger
                  key="water"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-water`}>
                      Click to learn more about this calculation.
                    </Tooltip>
                  }
                >
                  <a
                    style={{ margin: "5px" }}
                    href="https://www.mae.gov.nl.ca/waterres/reports/hydrogeology_westernnl/appendix_v.pdf"
                  >
                    {data.waterQuality}
                  </a>
                </OverlayTrigger>
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span>
                Today's Air Quality Index (AQI):&nbsp;
                <OverlayTrigger
                  key="air"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-air`}>
                      Click to learn more about this calculation.
                    </Tooltip>
                  }
                >
                  <a
                    style={{ margin: "1px" }}
                    href="https://www.airnow.gov/aqi/aqi-basics/"
                  >
                    {data.aqi}
                  </a>
                </OverlayTrigger>
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
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
