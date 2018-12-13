const pool = require("../db/postgres").pool;

module.exports = app => {
  // Use for user profile update form
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
