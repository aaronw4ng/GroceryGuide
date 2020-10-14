const {
  getNeighborhoods,
  getNeighborhoodCoordinates,
} = require("../utils/getNeighborhoods");
const getDuration = require("../utils/getDuration");
const filterNeighborhoodsForDuration = require("../utils/filterNeighborhoodsForDuration");
const getBayesianEstimate = require("../utils/getBayesianEstimate");

const getRecommendations = async (req, res) => {
  const {
    latitude,
    longitude,
    maxDuration,
    daysLeft,
    travelMethod,
  } = req.query;

  // Get all LA neighborhoods
  const neighborhoods = await getNeighborhoods();
  const neighborhoodCoordinates = await Promise.all(
    neighborhoods.map(({ name }) => getNeighborhoodCoordinates(name))
  );

  // Filter out neighborhoods that will definitely take longer than user's max duration to get to
  const filteredNeighborhoods = filterNeighborhoodsForDuration(
    neighborhoods,
    neighborhoodCoordinates,
    { latitude, longitude },
    maxDuration,
    travelMethod
  );

  // Get all grocery stores in each neighborhood
  const allGroceryStores = require("../neighborhoods.json");
  filteredNeighborhoods.forEach(
    (neighborhood) =>
      (neighborhood.groceryStores = allGroceryStores[neighborhood.name])
  );

  // Get all optimistic durations for those grocery stores and filter out the ones where duration > maxDuration
  const neighborhoodsWithinDuration = [];
  await Promise.all(
    filteredNeighborhoods.map(async ({ name, cases, groceryStores }) => {
      const durations = await Promise.all(
        groceryStores.map(({ location }) =>
          getDuration(
            latitude,
            longitude,
            location.lat,
            location.lng,
            travelMethod
          )
        )
      );
      
      const filteredGroceryStores = [];
      groceryStores.forEach(
        (groceryStore, i) => {
          if(durations[i] <= maxDuration)
          filteredGroceryStores.push({...groceryStore, duration: durations[i]})
        }
      );

      if (filteredGroceryStores.length)
        neighborhoodsWithinDuration.push({
          name,
          cases,
          groceryStores: filteredGroceryStores,
        });
    })
  );

  // Get the safest neighborhoods
  const safestNeighborhoods = [];

  // If # of cases are tied with the least # of cases, include them. Else, take the top 3 safest neighborhoods.
  let minCases = Infinity;
  neighborhoodsWithinDuration.forEach(
    ({ cases }) => (minCases = Math.min(minCases, cases))
  );

  neighborhoodsWithinDuration
    .sort((a, b) => a.cases - b.cases)
    .every((neighborhood) => {
      if (neighborhood.cases > minCases && safestNeighborhoods.length > 3)
        return false;
      safestNeighborhoods.push(neighborhood);
      return true;
    });

  // Get all the grocery stores from those neighborhoods
  const safestGroceryStores = [];
  const seen = {};
  safestNeighborhoods.forEach(({ name, cases, groceryStores }) => {
    const formattedGroceryStores = [];
    groceryStores.forEach((groceryStore) => {
      if (!seen[groceryStore.address]) {
        seen[groceryStore.address] = true;
        formattedGroceryStores.push({
          ...groceryStore,
          neighborhood: name,
          cases,
        });
      }
    });
    safestGroceryStores.push(...formattedGroceryStores);
  });

  // Sort the safest grocery stores by their Bayesian estimates and filter out any with less than 10 ratings
  const averageRating =
    safestGroceryStores.reduce((acc, { rating }) => acc + rating, 0) /
    safestGroceryStores.length;

  const recommendations = safestGroceryStores
    .sort(
      (a, b) =>
        getBayesianEstimate(averageRating, b) -
        getBayesianEstimate(averageRating, a)
    )
    .filter(({ totalRatings }) => totalRatings >= 10);

  // Return the top three grocery stores with the optimal busy times

  res.json({ recommendations: recommendations.slice(0, 5) });
};

module.exports = getRecommendations;

/*
  const writeToJson = require("write-json-file");
  const getGroceryStores = require("../utils/getGroceryStores");

  const d = {};
  const g = await Promise.all(
    neighborhoods.map(({ name }) => getGroceryStores(name))
  );
  neighborhoods.forEach((neighborhood, i) => {
    d[neighborhood.name] = g[i];
  });
  writeToJson("n.json", d);
*/
