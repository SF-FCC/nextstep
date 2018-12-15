const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../db/postgres");
const bcrypt = require("bcrypt");

/*
 * Authenticated Session persistence
 TODO - Figure out how we're handling session management
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

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
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (username, password, done) => {
      const findUserByEmail = `SELECT id, email, password FROM users WHERE email = '${username}';`;
      pool.query(findUserByEmail, (err, results) => {
        if (err) {
          console.log("Error finding user on login");
          return done(err);
        }
        if (results.rows.length > 0) {
          const dbUser = results.rows[0];
          bcrypt.compare(password, dbUser.password, (err, user) => {
            if (err) {
              return done(err, false);
            }
            if (!user) {
              // Returns on Invalid Password - user === false
              return done(null, false, { message: "Invalid Username or Password" });
            }
            if (user) {
              //   Login Success - user === true
              //   Removing Password from returned UserInfo
              const { id, email } = dbUser;
              const validUserInfo = { id, email };
              done(null, validUserInfo, { message: "Welcome. You've got mail" });
            }
          });
        } else {
          //   Returns on Invalid Username
          done(null, false, { message: "Invalid Username or Password" });
        }
      });
    }
  )
);

/*
 *  NOTES:
 *  - message option on "done" callback can be accessed on route via "req.authInfo.message"
 *  - done callback === done(error, user) => hence null for err
 */
