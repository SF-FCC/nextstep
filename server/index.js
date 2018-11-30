const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

const indexRoutes = require("./routes/index");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routes
require("./routes/index")(app);

//Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
});
