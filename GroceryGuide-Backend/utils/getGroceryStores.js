const axios = require("axios");
const getGroceryStores = async (neighborhood) => {
  const { data } = await axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Los Angeles ${neighborhood}&type=grocery_or_supermarket&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )
    .catch((e) => console.log(e));

  const response = await Promise.all(
    data.results.map(({ place_id }) =>
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=opening_hours&key=${process.env.GOOGLE_MAPS_API_KEY}`
        )
        .catch((e) => console.log(e))
    )
  );

  const hoursData = response.map(({ data }) =>
    data.result ? data.result.opening_hours : undefined
  );

  return data.results
    .map(
      (
        {
          formatted_address,
          geometry,
          name,
          rating,
          user_ratings_total,
          photos,
          price_level,
          place_id,
        },
        i
      ) => ({
        name,
        rating,
        photos,
        place_id,
        address: formatted_address,
        location: geometry.location,
        totalRatings: user_ratings_total,
        priceLevel: price_level,
        openingHours: hoursData[i],
      })
    )
    .filter(({ openingHours }) => openingHours);
};

module.exports = getGroceryStores;
