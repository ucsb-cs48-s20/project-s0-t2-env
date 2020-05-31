import useSWR from "swr";
import { fetch } from "../../utils/fetch";
import Layout from "../../components/Layout";
import { optionalAuth } from "../../utils/ssr";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import CityWaterAir from "../../components/CityWaterAir";
import CarbonEmissions from "../../components/CarbonEmissions";
import EmissionsPie from "../../components/EmissionsPie";
import {
  useTheme,
  Card,
  CardContent,
  Typography,
  List,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { numberWithCommas } from "../../utils/numbers";

function City() {
  const theme = useTheme();
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
    return <CircularProgress />;
  }

  return (
    <div>
      <title>
        {data.name}, {data.state} | Environmental Impacts Dashboard
      </title>
      <Typography variant="h3">
        {data.name}, {data.state}
      </Typography>
      <Typography>Population: {numberWithCommas(data.population)}</Typography>
      <CardContent>
        <List>
          <Divider />
          <CarbonEmissions data={data} />
          <Divider />
          <EmissionsPie data={data} />
          <Divider />
          <CityWaterAir data={data} />
          {/* <Typography style={{ fontSize: 20 }}>
            Water pH Level:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ margin: "5px" }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.waterpH}
              </Link>
            </Tooltip>
            <br />
            Total Dissolved Solids:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ margin: "5px" }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.totalDissolvedSolids} mg/L
              </Link>
            </Tooltip>
            <br />
            Specific Conductance:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ margin: "5px" }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.specificConductance} μS/cm
              </Link>
            </Tooltip>
          </Typography>
          <Typography style={{ fontSize: 20 }}>
            Today's Air Quality Index (AQI):&nbsp;
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link style={{ margin: "1px" }} href={data.url}>
                {data.aqi}
              </Link>
            </Tooltip>
          </Typography> */}
        </List>
      </CardContent>
    </div>
  );
}

export const getServerSideProps = optionalAuth;

export default function CityPage(props) {
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
      <Container>
        <Card style={{ textAlign: "center", margin: "20px" }}>
          <City />
        </Card>
      </Container>
    </Layout>
  );
}
