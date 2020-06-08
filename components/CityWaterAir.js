import Image from "react-bootstrap/Image";
import { Typography, Tooltip, Link, CircularProgress } from "@material-ui/core";

export default function CityWaterAir(props) {
  const data = props.data;

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <div>
      {data.waterpH ? (
        <Typography style={{ fontSize: 25 }} data-cy="waterquality">
          <br />
          <p>
            Water pH Level:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ fontWeight: "bold", margin: "5px", fontSize: 30 }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.waterpH}
              </Link>
            </Tooltip>
            <br />
            <Image
              src="https://cdn-prod.medicalnewstoday.com/content/images/articles/327/327185/a-table-showing-the-ph-of-common-drinks.jpg"
              align="center"
              width="450"
              height="300"
            />
          </p>
          <p>
            Total Dissolved Solids:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ fontWeight: "bold", margin: "5px", fontSize: 30 }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.totalDissolvedSolids} mg/L
              </Link>
            </Tooltip>
            <br />
            <Image
              src="https://www.fondriest.com/environmental-measurements/wp-content/uploads/2014/02/tds_range1.jpg"
              align="center"
              width="550"
              height="350"
            />
          </p>
          <p>
            Specific Conductance:
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ fontWeight: "bold", margin: "5px", fontSize: 30 }}
                href="https://www.michiganseagrant.org/lessons/lessons/by-broad-concept/earth-science/water-quality/"
              >
                {data.specificConductance} μS/cm
              </Link>
            </Tooltip>
            <br />
            <Image
              src="https://www.fondriest.com/environmental-measurements/wp-content/uploads/2014/02/conductivity_averages.jpg"
              align="center"
              width="450"
              height="300"
            />
          </p>
        </Typography>
      ) : (
        <Typography style={{ fontSize: 25 }} data-cy="waterquality">
          Sorry, we're missing water quality information for this city!
        </Typography>
      )}
      <Typography style={{ fontSize: 25 }} data-cy="airquality">
        <p>
          <p>
            Today's Air Quality Index (AQI):&nbsp;
            <Tooltip
              title="Learn more about this calculation"
              placement="right"
              arrow
            >
              <Link
                style={{ fontWeight: "bold", margin: "5px", fontSize: 30 }}
                href={data.url}
              >
                {data.aqi}
              </Link>
            </Tooltip>
          </p>
          <Image
            src="https://d2v9ipibika81v.cloudfront.net/uploads/sites/190/AQI-Table.png"
            align="center"
            width="450"
            height="300"
          />
        </p>
      </Typography>
    </div>
  );
}
