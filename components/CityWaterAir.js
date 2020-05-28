import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import { fetch } from "../utils/fetch";
import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";
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

export default function City(props) {
  const data = props.data;

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <div>
      {data.waterpH ? (
        <Typography style={{ fontSize: 20 }} data-cy="waterquality">
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
      ) : (
        <Typography style={{ fontSize: 20 }} data-cy="waterquality">
          Sorry, we're missing water quality information for this city!
        </Typography>
      )}

      <Typography style={{ fontSize: 20 }} data-cy="airquality">
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
    </div>
  );
}
