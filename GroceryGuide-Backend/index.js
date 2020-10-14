/* Import environment variables */
require("dotenv").config(); // Configures the .env file

/* Import package dependencies */
const express = require("express"); // Framework for creating API routes
const cors = require("cors"); // Package to handle cross-origin client requests
const mongoose = require("mongoose"); // ORM to interface MongoDB
const morgan = require("morgan"); // Package for logging incoming client API requests
const bodyParser = require("body-parser"); // Package to allow Express to parse request body

const getRecommendations = require("./actions/recommendations");

/* Create server instance */
const server = express();

/* Connect to the database */
// mongoose.connect(encodeURI(process.env.MONGODB_URI), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// });
// mongoose.connection.on("connected", () => {
//   console.log("MongoDB connected!");
// });

/* Initialize middleware */
server.use(cors()); // Allows cross-origin access to the server
server.use(morgan("dev")); // Logs to the console incoming client API requests
server.use(bodyParser.json()); // Allows Express to parse request body

/* Set up appropriate routers */
server.get("/", (req, res) => res.send("Hello world!"));
server.get("/recommendation", getRecommendations);

/* Initalize server instance to listen for requests on specified port */
server.listen(process.env.PORT || 8080, () =>
  console.log(`Server ready. Listening at port ${process.env.PORT || 8080}`)
);
