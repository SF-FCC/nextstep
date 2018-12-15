const bcrypt = require("bcrypt");
const { pool } = require("../db/postgres");
const passport = require("passport");

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
  app.post("/auth/login", passport.authenticate("local"), (req, res) => {
    return res.status(200).json(req.user);
  });

  /* Logout */
  // TODO Passport session does not persist, Handle with sessions or jwt?
  app.get("/auth/logout", (req, res) => {
    req.logOut();
    return res.status(200).json(`TEMP: You are sort of logged out. Emphasis on the sort of.`);
  });
};
