const bcrypt = require("bcrypt");
const { pool } = require("../db/postgres");
const passport = require("passport");
const { createToken, requireAuthToken } = require("../middleware/helper");
const isEmail = require("validator/lib/isEmail");
const normalizeEmail = require("validator/lib/normalizeEmail");

module.exports = app => {
  /* Register */
  app.post("/auth/register", async (req, res, next) => {
    const { first_name, last_name, email, password, confirmPW } = req.body;
    if (!email || !first_name || !last_name || !password || !confirmPW) {
      res.status(400);
      return next("Registration form is missing required fields");
    }
    if (password !== confirmPW) {
      res.status(400);
      return next("Password does not match confirmation");
    }
    if (!isEmail(email)) {
      res.status(400);
      return next("Email is invalid");
    }
    if (password.length < 4) {
      res.status(400);
      return next("Password must be at least 4 characters");
    }
    // NormalizeEmail needs verification, possibly could create a confusing ux and may need option tweaking
    const sanitizedEmail = normalizeEmail(email);
    const saltRounds = 10;
    const hashPW = await bcrypt.hashSync(password, saltRounds);
    const insert = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password
      )
    VALUES ($1, $2, $3, $4)
    RETURNING id, email;`;
    try {
      const registerQuery = await pool.query(insert, [
        first_name,
        last_name,
        sanitizedEmail,
        hashPW
      ]);
      const user = registerQuery.rows[0];
      return res.status(200).json({ user, token: createToken(user.id) });
    } catch (err) {
      res.status(400);
      return next(`Registration error: ${err.detail}`);
    }
  });

  /* Login */
  app.post("/auth/login", passport.authenticate("local"), (req, res) => {
    console.log("req.user", req.user);
    return res.status(200).send({ user: req.user, token: createToken(req.user.id) });
  });

  /* Check user already logged in */
  app.get("/auth/verify", requireAuthToken, (req, res) => {
    return res.status(200).send({ user: req.user });
  });

  /* Logout */
  // * NOTE: User logout will be handled on Client-side (delete token from storage)
  // app.get("/auth/logout", (req, res) => {
  //   return res.status(200).json(`TEMP: You are sort of logged out. Emphasis on the sort of.`);
  // });

  // Saving for testing
  // app.get("/auth/test", requireAuthToken, (req, res) => {
  //   console.log("AUTH/TEST", req.user);
  //   return res.json(req.user);
  // });
};
