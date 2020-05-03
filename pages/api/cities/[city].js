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
    waterpH,
    totalDissolvedSolids,
    specificConductance,
  } = doc;

  const response = await fetch(
    "https://api.opencagedata.com/geocode/v1/json?q=" +
      name +
      "," +
      state +
      ",United%20States" +
      "&key=" +
      process.env.LONGLAT_KEY
  );

  console.log(response);

  // TODO: get air quality
  const resp = await fetch(
    "https://api.weatherbit.io/v2.0/current/airquality?lat=" +
      response.results[0].bounds.northeast.lat +
      "&lon=" +
      response.results[0].bounds.northeast.lng +
      "&key=" +
      process.env.AQI_KEY2
  );

  console.log(resp);

  // const response = await fetch("AIR-API");
  // do something with it

  // TODO: get water quality
  //const waterQuality = 100;
  // const response = await fetch("WATER-API");
  // do something with it

  res.json({
    name,
    state,
    population,
    CO2,
    latitude: response.results[0].bounds.northeast.lat,
    longitude: response.results[0].bounds.northeast.lng,
    aqi: resp.data[0].aqi,
    // waterQuality,
    waterpH,
    totalDissolvedSolids,
    specificConductance,
  });
});

export default handler;
