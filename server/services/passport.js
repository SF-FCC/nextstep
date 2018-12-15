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
              return done(null, validUserInfo, { message: "Welcome. You've got mail" });
            }
          });
        } else {
          //   Returns on Invalid Username
          return done(null, false, { message: "Invalid Username or Password" });
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

/* 
* SAVE
* async version - needs to be tested due to conflicting opinions on async with callbacks
* supposedly not entirely stable
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (username, password, done) => {
      try {
        const findUserByEmail = `SELECT id, email, password FROM users WHERE email = '${username}';`;
        const dbUser = await pool.query(findUserByEmail);

        // Invalid Username
        if (!dbUser.rows.length) {
          return done(null, false, { message: "Invalid Username or Password" });
        }

        // Compare passwords
        const dbUserHash = dbUser.rows[0].password;
        const isValidPw = await bcrypt.compareSync(password, dbUserHash);

        // Invalid Password
        if (!isValidPw) {
          return done(null, false, { message: "Invalid Username or Password" });
        }

        const { id, email } = dbUser.rows[0];
        const validUserInfo = { id, email };

        return done(null, validUserInfo);
      } catch (err) {
        return done(err, false, { message: "Error with login" });
      }
    }
  )
);
*/
