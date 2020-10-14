const axios = require("axios");
const neighborhoods = require("../neighborhoods.json");
const writeJsonFile = require("write-json-file");

const getBusyTimes = async (placeId) => {
  // Start a scraping job in APIFY
  console.log("Starting scraping job");

  const actorResponse = await axios
    .post(
      `https://api.apify.com/v2/acts/drobnikj~crawler-google-places/runs?token=${
        process.env.APIFY_API_TOKEN || "pJfvgCMf7SjumutbCC8Mk3Zsh"
      }`,
      {
        searchString: `place_id:${placeId}`,
        proxyConfig: { useApifyProxy: true },
        maxCrawledPlaces: 1,
        includeReviews: false,
        includeImages: false,
        includeOpeningHours: false,
        includePeopleAlsoSearch: false,
      }
    )
    .catch((e) => {
      console.log(e);
      throw e;
    });

  // Wait for scraping job to finish
  console.log("Waiting for scraping job to finish");
  await new Promise((resolve) => setTimeout(resolve, 20000));

  // Get results from scraping job
  console.log("Getting results of scraping job");
  const response = await axios
    .get(
      `https://api.apify.com/v2/datasets/${actorResponse.data.data.defaultDatasetId}/items`
    )
    .catch((e) => console.log(e));

  // Sleep to prevent APIFY over usage
  console.log("Sleeping for 10 sec to prevent APIFY over usage");
  await new Promise((resolve) => setTimeout(resolve, 10000));

  console.log("Finished scraping job");
  return response.data[0] ? response.data[0].popularTimesHistogram : [];
};

const getPopularTimes = async (neighborhoods) => {
  // Get an array of all the grocery stores' place ids
  const allGroceryStores = [];
  for (const [_, value] of Object.entries(neighborhoods).slice(366)) {
    allGroceryStores.push(...value.map(({ place_id }) => place_id));
  }

  // Get the busy time of each placeId and store it in a dictionary
  const allGroceryStoresBusyTimes = {};
  let i = 366;
  for (const placeId of allGroceryStores) {
    console.log(
      `Starting grocery store ${i + 1} of ${allGroceryStores.length}`
    );

    let busyTimes;
    try {
      busyTimes = await getBusyTimes(placeId);
    } catch (e) {
      break;
    }
    allGroceryStoresBusyTimes[placeId] = busyTimes;
    ++i;
  }

  writeJsonFile("busyTimes3.json", {
    errorOnIndex: i,
    allGroceryStoresBusyTimes,
  });

  return allGroceryStoresBusyTimes;
};

getPopularTimes(neighborhoods);
