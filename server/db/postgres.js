const { Pool } = require("pg");
const fs = require("fs");

// Load table schemas
const createUsersTable = fs.readFileSync("./models/users.sql").toString();
const createJobsTable = fs.readFileSync("./models/jobs.sql").toString();

// Config postgres connection
const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "127.0.0.1",
  database: process.env.PG_DB || "postgres",
  password: process.env.PG_PW || "postgres",
  port: process.env.PG_PORT || 5432
});

// The pool wil emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on postgress pool", err);
  // process.exit(-1);
});

/**
 * Create required tables in the db if they don't exist
 */
async function initializeTables() {
  try {
    const res = await pool.query("SELECT current_database()");
    console.log(res.rows[0]);
    // TODO log any table creation
    await pool.query(createUsersTable);
    await pool.query(createJobsTable);
  } catch (err) {
    console.log(err);
  }
}

initializeTables();

module.exports.pool = pool;
