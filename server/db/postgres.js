const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  database: process.env.PG_DB || 'postgres',
  password: process.env.PG_PW || 'postgres',
  port: process.env.PG_PORT || 5432
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on postgress pool', err);
  // process.exit(-1);
});

// Hello world!
async function helloWorld() {
  const res = await pool.query('SELECT current_database()');
  console.log(res.rows[0]);
}

helloWorld();

module.exports.pool = pool;
