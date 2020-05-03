//NO LONGER USED
import { fetch } from "../../utils/fetch";

// const token = d9bdb6e3fcb6baad2a46e25c7c667fc64e5a9227;
// const base_url = "https://api.waqi.info/feed/";
// const city = "miami";

export default async function (req, res) {
  const response = await fetch(
    "https://api.waqi.info/feed/goleta/?token=d9bdb6e3fcb6baad2a46e25c7c667fc64e5a9227"
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      aqi: response.data.aqi,
      name: response.data.city.name,
    })
  );
}
