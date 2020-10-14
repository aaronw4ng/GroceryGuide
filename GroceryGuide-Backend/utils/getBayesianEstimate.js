const getBayesianEstimate = (averageRating, { rating, totalRatings }, m = 20) =>
  (rating * totalRatings + averageRating * m) / (totalRatings + m);

module.exports = getBayesianEstimate;
