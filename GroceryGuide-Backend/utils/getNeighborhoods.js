const axios = require("axios");
const cheerio = require("cheerio");

const formatName = (name) => {
  if (name.includes("Unincorporated"))
    return name.slice("Unincorporated - ".length);
  if (name.includes("City of")) return name.slice("City of ".length);
  if (name.includes("Los Angeles -"))
    return name.slice("Los Angeles - ".length);
  return name;
};

const getNeighborhoods = async () => {
  const { data } = await axios
    .get("http://publichealth.lacounty.gov/media/Coronavirus/locations.htm")
    .catch((e) => e.response.data);

  const $ = cheerio.load(data);

  let saveData = false;
  const tableRows = [];

  $(".table")
    .first()
    .find("tr")
    .each((i, tableRow) => {
      if ($(tableRow).find("td").first().text() === "- Under Investigation")
        return false;
      if (saveData) tableRows.push(tableRow);
      if ($(tableRow).find("td").first().text() === "CITY/COMMUNITY**")
        saveData = true;
    });

  const neighborhoods = [];

  tableRows.forEach((tableRow) => {
    const neighborhood = {};
    $(tableRow)
      .find("td")
      .each((i, td) => {
        if (i === 0) neighborhood.name = formatName($(td).text());
        else if (i === 1)
          neighborhood.cases = $(td).text() === "--" ? 0 : Number($(td).text());
        else if (i === 2) return false;
      });
    neighborhoods.push(neighborhood);
  });

  return neighborhoods;
};

const getNeighborhoodCoordinates = async (neighborhood) => {
  const { data } = await axios
    .get(
      `
      https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Los Angeles ${neighborhood}&inputtype=textquery&fields=geometry&key=${process.env.GOOGLE_MAPS_API_KEY}
    `
    )
    .catch((e) => console.log(e));

  return data.candidates[0]
    ? data.candidates[0].geometry.location
    : { lat: undefined, lng: undefined };
};

module.exports = { getNeighborhoods, getNeighborhoodCoordinates };
