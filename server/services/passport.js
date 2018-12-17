const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../db/postgres");
const bcrypt = require("bcrypt");

/*
 * Save session data to db
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/*
 * Load session data from db
 */
passport.deserializeUser((id, done) => {
  const findUserById = `SELECT * FROM users WHERE id=${id}`;
  pool.query(findUserById, (err, results) => {
    if (err) {
      console.log("Error when selecting user on session deserialize", err);
      return done(err);
    }
    done(null, results.rows[0]);
  });
});

/*
 * Local Strategy Config
 */
passport.use(
  new LocalStrategy({ usernameField: "email", passwordField: "password" }, validateLocalLogin)
);

/**
 * Validate and log the user in
 * @param {string} userEmail the user input email
 * @param {string} password the user input password
 * @param {function} done done(error, user) where user is passed to... ?
 * Message option on "done" callback can be accessed via middleware "req.authInfo.message"
 */
async function validateLocalLogin(userEmail, password, done) {
  const findUserByEmail = `SELECT id, email, password FROM users WHERE email = $1::text;`;
  try {
    const results = await pool.query(findUserByEmail, [userEmail]);
    if (results.rows.length < 1) {
      throw new Error("User not found for supplied email when attempting login");
    }
    const dbUser = results.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password for found user when attempting login");
    }
    console.log("Login successful");
    // Only return id and email
    const { id, email } = dbUser;
    const validUserInfo = { id, email };
    return done(null, validUserInfo);
  } catch (err) {
    console.log(err);
    return done(null, false);
  }
}
