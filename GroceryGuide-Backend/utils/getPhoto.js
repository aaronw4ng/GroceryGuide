const axios = require("axios");

const getPhoto = async (photoReference) => {
  const { data } = await axios.get(`
  https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=${photoReference}&key=${
    process.env.GOOGLE_MAPS_API_KEY || "AIzaSyA0OMD1GpHHRXovv0sQsTf76LPOzJ4_KAY"
  }
    `);
  console.log(data);
  return data;
};

getPhoto(
  "CmRaAAAAJx2PX-_pJqOyvYYZc3QF0kJxmQdQcRQg-4dzybkTAGvr91n1ehZlbkn4PvS17WDnGb8J68AbmdVXFKEamQ7Yq5lbPmLVUEW-BFmHyL16ScCgFY3oCw2plFvHYyCrH7yREhA1_JhMLsqOt8vYwhEKn1hTGhR28ZPvP7njWzhqiJdZxdncZcHqHQ"
);
module.exports = getPhoto;
