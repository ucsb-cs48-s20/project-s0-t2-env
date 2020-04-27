export default async (req, res) => {
  const {
    query: { city },
  } = req;

  const name = "Goleta";
  const state = "CA";
  const population = 49970;
  const CO2 = 679561;
  const latitude = 34.4358;
  const longitude = -119.8276;

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
};
