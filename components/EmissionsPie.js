import { VictoryPie, VictoryLabel } from "victory";
import {
  useTheme,
  Card,
  CardContent,
  Typography,
  Tooltip,
  List,
  Divider,
  Link,
  CircularProgress,
} from "@material-ui/core";

function EmissionsPie(props) {
  const data = props.data;
  const theme = useTheme();
  return (
    <svg viewBox="0 0 500 500" width="500px" height="500px">
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
        origin={{ x: 250, y: 250 }}
        labels={({ datum }) => `${datum.title}`}
        data={[
          { x: 1, y: data.energyShare.transport, title: "Transport" },
          { x: 2, y: data.energyShare.housing, title: "Housing" },
          { x: 3, y: data.energyShare.food, title: "Food" },
          { x: 4, y: data.energyShare.goods, title: "Goods" },
          { x: 5, y: data.energyShare.services, title: "Services" },
        ]}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{
          fontSize: 15,
          backgroundColor: theme.palette.primary.main,
        }}
        x={250}
        y={250}
        text="CO2 Sources"
      />
    </svg>
  );
}

export default EmissionsPie;
