const pool = require("../db/postgres").pool;

module.exports = app => {
  // TODO Use for user profile update form - probably prefer patch
  app.put("/users", (req, res) => {});

  app.get("/users", async (req, res, next) => {
    const query = `SELECT * from users`;
    try {
      // TODO add limit, sort and pagination to complete endpoint
      const users = await pool.query(query);
      return res.json(users.rows);
    } catch (err) {
      next(err);
    }
  });
};
