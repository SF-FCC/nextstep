const bcrypt = require("bcrypt");
const { pool } = require("../db/postgres");

module.exports = app => {
  /* Register */
  app.post("/auth/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!email || !first_name || !last_name || !password) {
      return res.status(400).json("Invalid Form Submission: Missing fields");
    }
    const saltRounds = 10;
    const hashPW = await bcrypt.hashSync(password, saltRounds);
    const insert = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password
      )
    VALUES ($1, $2, $3, $4);`;
    try {
      const user = await pool.query(insert, [first_name, last_name, email, hashPW]);
      // TODO Should return confirmation, JWT, and user info
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json(`Registration error: ${err.detail}`);
    }
  });

  /* Login */
  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid Form Submission: Missing email or password");
    }

    try {
      const dbQuery = `SELECT email, password FROM users WHERE email = '${email}';`;
      const dbUser = await pool.query(dbQuery);
      const dbUserHash = dbUser.rows[0].password;
      const isValidPW = await bcrypt.compareSync(password, dbUserHash);
      if (isValidPW) {
        // TODO Return confirmation, JWT, and user info
        return res.json(`You are now logged in as ${dbUser.rows[0].email}`);
      } else {
        return res.status(400).json(`Invalid email or password 1`);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(`Login Error: ${err}`);
    }
  });

  /* Logout */
  // TODO Handle with passport/ jwt
  app.get("auth/logout", (req, res) => {});
};
