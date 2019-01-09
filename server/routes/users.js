const pool = require("../db/postgres").pool;
const { requireAuthToken } = require("../middleware/helper");

module.exports = app => {
  // TODO Use for user profile update form - probably prefer patch
  app.put("/users", (req, res) => {});

  app.delete("/users/delete", requireAuthToken, async (req, res, next) => {
    const user_id = req.user.id;
    const remove = `DELETE FROM users WHERE id = $1;`;
    try {
      const dbResponse = await pool.query(remove, [user_id]);
      return res.send({ status: 200 });
    } catch (err) {
      next(err);
    }
  });

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
