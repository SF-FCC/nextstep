const pool = require("../db/postgres").pool;
const bcrypt = require("bcrypt");

module.exports = app => {
  // TEMP REGISTER ROUTE - Move to auth routes
  app.post("/users", async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    // TODO Validate password/ email
    const saltRounds = 10;
    const pwHash = bcrypt.hashSync(password, saltRounds, (err, hash) => {
      if (err) {
        return console.error("bcrypt hashing error", err);
      }
      return hash;
    });    

    const insert = `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password
        )
      VALUES ($1, $2, $3, $4);`;
    try {
      const user = await pool.query(insert, [first_name, last_name, email, pwHash]);
      return res.json(user);
    } catch (err) {
      // TODO add error message for email already taken
      next(err);
    }
  });

  app.get("/users", async (req, res, next) => {
    const query = `SELECT * from users`;
    try {
      // TODO add limit, sort and pagination to complete endpoint
      const users = await pool.query(query);
      return res.json(users.rows);
    } catch (err) {
      next(err);
    }
  });
};
