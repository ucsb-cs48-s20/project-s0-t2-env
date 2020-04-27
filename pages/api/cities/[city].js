import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const city = req.query.city.replace("-", " ");
  console.log(city);
  const query = { name: city };
  const doc = await req.db.collection("cities").findOne(query);
  console.log(doc);
  const { name, state, population, CO2, latitude, longitude } = doc;
  // TODO: get air quality
  const aqi = 31;
  // const response = await fetch("AIR-API");
  // do something with it

  // TODO: get water quality
  const waterQuality = 100;
  // const response = await fetch("WATER-API");
  // do something with it
  res.json({
    name,
    state,
    population,
    CO2,
    latitude,
    longitude,
    aqi,
    waterQuality,
  });
});

export default handler;
