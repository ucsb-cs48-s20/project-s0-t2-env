import { FaTree } from "react-icons/fa";
import { useTheme, Typography, Tooltip, Link } from "@material-ui/core";
import { numberWithCommas } from "../utils/numbers";
function CarbonEmissions(props) {
  const data = props.data;
  const theme = useTheme();
  return (
    <>
      <div style={{ margin: "20px" }} data-cy="carbon">
        <Typography variant="h5">Emits</Typography>
        <Typography variant="h4">
          <Tooltip
            title="Learn more about this calculation"
            placement="right"
            arrow
          >
            <Link
              style={{ margin: "5px", fontWeight: "bold" }}
              href="https://coolclimate.org/maps"
            >
              {numberWithCommas(data.CO2)}
            </Link>
          </Tooltip>
        </Typography>
        <Typography variant="h5">tons of CO2 per year</Typography>
      </div>
      <div style={{ margin: "20px" }}>
        <Typography variant="h5">You would need to plant </Typography>
        <Typography
          variant="h4"
          style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          <FaTree />
          <Tooltip
            title="Learn more about this calculation"
            placement="bottom"
            arrow
          >
            <Link href="https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator-calculations-and-references#seedlings">
              {numberWithCommas(Math.floor(data.CO2 / 0.06))}
            </Link>
          </Tooltip>{" "}
        </Typography>
        <Typography variant="h5">trees to sequester that carbon.</Typography>
      </div>
    </>
  );
}

export default CarbonEmissions;
