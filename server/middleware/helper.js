const jwt = require("jsonwebtoken");
const passport = require("passport");

const jwtHelper = {
  createToken: userId => {
    return jwt.sign(
      { sub: userId, data: userId, iat: Math.floor(Date.now() / 1000) },
      process.env.JWT_KEY,
      {
        algorithm: "HS256",
        expiresIn: 300 // measured in seconds from time of issue (iat) - currently 5 minutes
      }
    );
  },
  requireAuthToken: passport.authenticate("jwt", { session: false })
};

module.exports = jwtHelper;
