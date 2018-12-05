const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const { Pool } = require("pg");

async function test() {
  const pool = new Pool({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "127.0.0.1",
    database: process.env.PG_DB || "postgres",
    password: process.env.PG_PW || "postgres",
    port: process.env.PG_PORT || 5432
  });

  // Hello world!
  // const res = await pool.query("SELECT * FROM test LIMIT 10");
  // console.log(res.rows);
  await pool.end();
}
test();

const indexRoutes = require("./routes/index");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
// TODO change static location and serve with nginx
app.use(express.static("../client/build"));

// Routes
require("./routes/index")(app);

//Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
});
