import { makeRequest } from "../utils/request.js";

export const getRecommendations = (
  latitude = 34.0407,
  longitude = -118.2468,
  maxDuration = 15,
  daysLeft = 0,
  travelMethod = "driving"
) =>
  makeRequest(
    "GET",
    `/recommendation?latitude=${latitude}&longitude=${longitude}&maxDuration=${maxDuration}&daysLeft=${daysLeft}&travelMethod=${travelMethod}`
  ).then(({ recommendations }) => recommendations);
