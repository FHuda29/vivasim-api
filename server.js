const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();


var corsOptions = {
  origin: "http://localhost:5173"
  //origin: "http://147.139.174.253"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to vivasim API application." });
});

// routes
require("./app/routes/product.route.js")(app);
require("./app/routes/productpartner.route.js")(app);
require("./app/routes/user.route.js")(app);
require("./app/routes/partner.route.js")(app);
require("./app/routes/agent.route.js")(app);
require("./app/routes/inventory.route.js")(app);
require("./app/routes/level.route.js")(app);
require("./app/routes/country.route.js")(app);
require("./app/routes/order.route.js")(app);
require("./app/routes/orderevent.route.js")(app);
require("./app/routes/dashboard.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
