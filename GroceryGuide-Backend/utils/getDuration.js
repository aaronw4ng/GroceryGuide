const axios = require("axios");
/**
 *
 *
 * @param {Number} userLatitude
 * @param {Number} userLongitude
 * @param {Number} destinationLatitude
 * @param {Number} destinationLongitude
 * @param {String} mode
 * @returns {Number}
 */
const getDuration = async (
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
  mode
) => {
  const { data } = await axios.get(`
    https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&destinations=${destinationLatitude}, ${destinationLongitude}&mode=${mode}&key=${process.env.GOOGLE_MAPS_API_KEY}
    `);

  return data.rows && data.rows[0].elements[0].duration
    ? data.rows[0].elements[0].duration.value / 60
    : 0;
};

module.exports = getDuration;
