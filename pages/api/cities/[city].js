import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { fetch } from "../../../utils/fetch";

const handler = nextConnect();

// let the middleware process the request first, so that it can add the "db" field to req
handler.use(middleware);

handler.get(async (req, res) => {
  // The city name is held in req.query.city, but we want to convert santa-barbara to "santa barbara"
  const city = req.query.city.replace("-", " ");
  // construct a query object for the database. we want to filter only results where the name = city
  const query = { name: city };
  console.log(query);
  // look for at most one city in the collection 'cities' using the query. By setting collation strength to 1, we are ignoring case
  // https://mongodb.github.io/node-mongodb-native/2.2/tutorials/collations/#find-and-sort
  const doc = await req.db
    .collection("cities")
    .findOne(query, { collation: { locale: "en_US", strength: 1 } });
  // MongoDB returns a document for us
  console.log(doc);
  // We can read in these values from the doc
  const {
    name,
    state,
    population,
    CO2,
    latitude,
    longitude,
    waterpH,
    totalDissolvedSolids,
    specificConductance,
  } = doc;

  // TODO: get air quality
  const response = await fetch(
    "https://api.weatherbit.io/v2.0/current/airquality?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      process.env.AQI_KEY2
  );
  // const response = await fetch("AIR-API");
  // do something with it

  // TODO: get water quality
  const waterQuality = 100;
  // const response = await fetch("WATER-API");
  // do something with it
  console.log(response);

  res.json({
    name,
    state,
    population,
    CO2,
    latitude,
    longitude,
    aqi: response.data[0].aqi,
    waterQuality,
    waterpH,
    totalDissolvedSolids,
    specificConductance,
  });
});

export default handler;
