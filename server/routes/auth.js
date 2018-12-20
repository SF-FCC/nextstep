const bcrypt = require("bcrypt");
const { pool } = require("../db/postgres");
const passport = require("passport");
const { createToken } = require("../middleware/helper");

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
    console.log("req.user", req.user);
    return res.status(200).send({ user: req.user, token: createToken(req.user.id) });
  });

  /* Logout */
  // * NOTE: User logout will be handled on Client-side (delete token from storage)
  app.get("/auth/logout", (req, res) => {
    return res.status(200).json(`TEMP: You are sort of logged out. Emphasis on the sort of.`);
  });

  // Saving for testing
  //   app.get("/auth/test", passport.authenticate("jwt", { session: false }), (req, res) => {
  //      console.log("AUTH/TEST", req);
  //     return res.json(req.user);
  //   });
};
