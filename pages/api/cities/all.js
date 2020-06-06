import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

// let the middleware process the request first, so that it can add the "db" field to req
handler.use(middleware);

handler.get(async (req, res) => {
  const cities = await req.db.collection("cities").find({}).toArray();
  const names = cities.map((object) => object.name);

  res.json(names);
});

export default handler;
