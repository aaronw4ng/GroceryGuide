const haversine = require("haversine-distance");

const getOptimisticDuration = (
  userLocation,
  neighborhoodLocation,
  travelMethod
) => {
  if (!neighborhoodLocation.lng || !neighborhoodLocation.lat) return 0;

  const { lng, lat } = neighborhoodLocation;
  const distanceInMiles =
    haversine(userLocation, { latitude: lat, longitude: lng }) * 0.000621371192;

  // Walking: (distanceInMiles / 4mph) * 60 min/hr
  if (travelMethod === "walking") return (distanceInMiles / 4) * 60;
  // Biking: (distanceInMiles / 4mph) * 60 min/hr
  else if (travelMethod === "biking") return (distanceInMiles / 15) * 60;
  // Driving: (distanceInMiles / 60mph) * 60 min/hr
  return distanceInMiles;
};

const filterNeighborhoodsForDuration = (
  neighborhoods,
  neighborhoodCoordinates,
  userLocation,
  maxDuration,
  travelMethod
) =>
  neighborhoods.filter(
    (_, i) =>
      getOptimisticDuration(
        userLocation,
        neighborhoodCoordinates[i],
        travelMethod
      ) <= maxDuration
  );

module.exports = filterNeighborhoodsForDuration;
