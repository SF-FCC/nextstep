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
    const hashPW = await bcrypt.hashSync(password, 10);
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
      // Should return confirmation and user info
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(400).json(`Registration error: ${err.detail}`);
    }
  });
  /* Login */
  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    return res.send("Received Login: ", req.body);
  });

  /* Logout */
  app.get("auth/logout", (req, res) => {});
};
