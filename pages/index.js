import Layout from "../components/Layout";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import {
  MdTrendingUp,
  MdCompareArrows,
  MdFlag,
  MdPlaylistAddCheck,
  MdSearch,
} from "react-icons/md";
import useSWR from "swr";
import { fetch } from "../utils/fetch";
import { optionalAuth } from "../utils/ssr";
import { Container } from "@material-ui/core";
export const getServerSideProps = optionalAuth;

function HomePage(props) {
  const user = props.user;
  const { data: names } = useSWR("/api/cities/all", fetch, {});

  return (
    <Layout
      user={user}
      names={names}
      onChange={(event, newValue) => {
        if (newValue != null) {
          window.location.href = "/cities/" + newValue;
        }
      }}
    >
      <title>Environmental Impacts Dashboard</title>
      <style jsx>
        {`
          img {
            width: 3000px;
            height: 400px;
            object-fit: cover;
          }
        `}
      </style>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.graytvinc.com/images/810*538/Industrial+waste+water.jpg"
            alt="Water"
          />
          <Carousel.Caption style={{ color: "#000000" }}>
            <h3>Water Pollution </h3>
            <p>
              Find local stats regarding contaminant levels in drinking water
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://images.unsplash.com/photo-1536697882102-638b66a6ef20?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
            alt="Air"
          />

          <Carousel.Caption style={{ color: "#000000" }}>
            <h3>Air Pollution</h3>
            <p>Access air pollutant information</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.weforum.org/article/image/large_LiSyr56ECs8p4TINfhoKnM2of_u9kWL2yLapGD5HLX8.png"
            alt="CO2"
          />

          <Carousel.Caption style={{ color: "#000000" }}>
            <h3>CO2 emissions</h3>
            <p>Learn more about local CO2 emissions</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container style={{ marginTop: "40px" }}>
        <CardDeck>
          <Card className="text-center">
            <h1>
              <MdSearch />
            </h1>
            <Card.Title>Search Cities in CA</Card.Title>
          </Card>
          <Card className="text-center">
            <h1>
              <MdCompareArrows />
            </h1>
            <Card.Title>Compare Cities</Card.Title>
          </Card>
          <Card className="text-center">
            <h1>
              <MdPlaylistAddCheck />
            </h1>
            <Card.Title>Receive Personal Feedback</Card.Title>
          </Card>
        </CardDeck>
        <p
          style={{
            fontSize: "20px",
            margin: "10px",
          }}
        >
          This application provides a dashboard of information about
          environmental impact data for a majority of the cities in California.
          Navigating to a city allows you to view information about Carbon
          emissions, air quality, and water quality for the selected city. The
          app also allows for you to login and personally receive feedback about
          your daily consumption.
        </p>
      </Container>
    </Layout>
  );
}

export default HomePage;
