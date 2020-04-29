import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

// this is a middleware. read more about middleware here: https://www.npmjs.com/package/connect

// process.env.MONGO_CONNECTION_STRING is set in the .env file`
const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// this function's purpose is just to add "dbClient" and "db" fields to the req object
// we connect to MongoDB, then select the db called "environment"
async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("environment");
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
