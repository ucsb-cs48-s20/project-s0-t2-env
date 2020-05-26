import Layout from "../components/Layout";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import { MdTrendingUp, MdCompareArrows, MdFlag } from "react-icons/md";

import useSWR from "swr";
import { fetch } from "../utils/fetch";

import { optionalAuth } from "../utils/ssr";
import { Container } from "@material-ui/core";
export const getServerSideProps = optionalAuth;

function HomePage(props) {
  const user = props.user;
  const { data: names } = useSWR("/api/cities/all", fetch, {});

  return (
    <Layout user={user} names={names}>
      <title>Environmental Impacts Dashboard</title>
      <style jsx>
        {`
          img {
            width: 3000px;
            height: 500px;
            object-fit: cover;
          }
        `}
      </style>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/5702eb0222482eac526a6b9d/1459906335363-6R9A12TCR6P1KLNX4UK2/ke17ZwdGBToddI8pDm48kNJzIzhHeIWprLM41ONemAFZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIdas_SVgL8pSVashnXWXNcS5jaGplD4PFZ5hSBE73lPYKMshLAGzx4R3EDFOm1kBS/Sunshine+Coast+Pumps+-+Pump+Filtration+Irrigation+Projects.jpg"
            alt="Water"
          />
          <Carousel.Caption>
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

          <Carousel.Caption>
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

          <Carousel.Caption>
            <h3>CO2 emissions</h3>
            <p>Learn more about local CO2 emissions</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container style={{ marginTop: "40px" }}>
        <CardDeck>
          <Card className="text-center">
            <h1>
              <MdTrendingUp />
            </h1>
            <Card.Title>Track lifestyle changes</Card.Title>
          </Card>
          <Card className="text-center">
            <h1>
              <MdCompareArrows />
            </h1>
            <Card.Title>Compare cities</Card.Title>
          </Card>
          <Card className="text-center">
            <h1>
              <MdFlag />
            </h1>
            <Card.Title>Set goals</Card.Title>
          </Card>
        </CardDeck>
        <p
          style={{
            fontSize: "20px",
            margin: "10px",
          }}
        >
          This application provides a dashboard of information about your city's
          environmental impact. Navigating to a city allows you to view
          information about carbon emissions, air quality, and water quality.
          Eventually, the app will show detailed breakdowns and policy
          recommendations. It will also allow you to compare your individual
          impact to the average person in your city.
        </p>
      </Container>
    </Layout>
  );
}

export default HomePage;
