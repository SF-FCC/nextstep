const path = require("path");

// Temp index routing

module.exports = app => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
  });
};
