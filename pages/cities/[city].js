import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import { fetch } from "../../utils/fetch";
import Layout from "../../components/Layout";
import { optionalAuth } from "../../utils/ssr";
import { useRouter } from "next/router";
import { FaMapPin, FaTree } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import { VictoryPie, VictoryLabel, VictoryTooltip } from "victory";
import {
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Tooltip,
  List,
  ListItem,
  Divider,
  Link,
  CircularProgress,
} from "@material-ui/core";

function numberWithCommas(x) {
  return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

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
          <Typography style={{ fontSize: 20 }}>
            Emits
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ margin: "5px" }}
                href="https://coolclimate.org/maps"
              >
                {numberWithCommas(data.CO2)} tons of CO2 per year
              </Link>
            </Tooltip>
          </Typography>

          <Typography style={{ fontSize: 20 }}>
            You would need to plant{" "}
            <FaTree
              style={{ margin: "15px", color: theme.palette.primary.main }}
            />
            <Tooltip
              title="Learn more about this calculation"
              placement="bottom"
              arrow
            >
              <Link
                style={{ fontWeight: "bold", fontSize: 30, margin: "5px" }}
                href="https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references#seedlings"
              >
                {numberWithCommas(Math.floor(data.CO2 / 0.06))}
              </Link>
            </Tooltip>{" "}
            trees to sequester that carbon .
          </Typography>
          <Divider />
          <svg viewBox="0 0 400 400" width="400px" height="400px">
            <VictoryPie
              style={{
                labels: { fill: "black", fontSize: 12, fontFamily: "lato" },
              }}
              colorScale={[
                theme.palette.primary.main,
                theme.palette.secondary.main,
                theme.palette.primary.dark,
                theme.palette.secondary.dark,
                theme.palette.primary.light,
                theme.palette.secondary.light,
              ]}
              innerRadius={75}
              standalone={false}
              animate={{ duration: 1000 }}
              width={400}
              height={400}
              labels={({ datum }) => `${datum.title}`}
              data={[
                { x: 1, y: 5, title: "Food" },
                { x: 2, y: 4, title: "Housing" },
                { x: 3, y: 2, title: "Goods" },
                { x: 4, y: 3, title: "Transport" },
                { x: 5, y: 1, title: "Services" },
              ]}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{
                fontSize: 15,
                backgroundColor: theme.palette.primary.main,
              }}
              x={200}
              y={200}
              text="CO2 Sources"
            />
          </svg>
          <Divider />
          <Typography style={{ fontSize: 20 }}>
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
          </Typography>
        </List>
      </CardContent>
    </div>
  );
}

export const getServerSideProps = optionalAuth;

export default function CityPage(props) {
  const user = props.user;
  const { data: names } = useSWR("/api/cities/all", fetch, {});
  const onChange = props.onChange;

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
