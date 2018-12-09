const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
// TODO change static location and serve with nginx
app.use(express.static("../client/build"));

// Routes
require("./routes/index")(app);
require("./routes/jobs")(app);

//Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
});
