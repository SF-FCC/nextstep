const pool = require("../db/postgres").pool;
const { requireAuthToken } = require("../middleware/helper");
const bcrypt = require("bcrypt");

module.exports = app => {
  // TODO Use for user profile update form - probably prefer patch
  app.put("/users/email", requireAuthToken, async (req, res, next) => {
    const { email, newEmail } = req.body 
     
    const insert = `
      UPDATE users SET email = $2
      WHERE email = $1
      ;`;
    try {
      const dbResponse = await pool.query(insert, [email, newEmail]);
      return res.send({ status: 200 });
    } catch (err) {
      next(err)
    }
  });

  app.put("/users/password", requireAuthToken, async (req, res, next) => {
    const { email, newPw } = req.body 

    const saltRounds = 10;
    const hashPW = await bcrypt.hashSync(newPw, saltRounds);

    const insert = `
      UPDATE users SET password = $2
      WHERE email = $1
      ;`;
    try {
      const dbResponse = await pool.query(insert, [email, hashPW]);
      return res.send({ status: 200 });
    } catch (err) {
      next(err)
    }
  });

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
};
