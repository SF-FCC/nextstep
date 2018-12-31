// Temp index routing
const pool = require("../db/postgres").pool;
const { requireAuthToken } = require("../middleware/helper");

module.exports = app => {
  app.post("/jobs", requireAuthToken, async (req, res, next) => {
    const user_id = req.user.id;
    const {
      posting_url,
      company_name,
      company_url,
      job_title,
      current_status,
      job_location,
      job_source,
      active
    } = req.body;

    const insert = `
      INSERT INTO jobs (
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        job_source,
        active,
        user_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;`;
    try {
      const jobs = await pool.query(insert, [
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        job_source,
        active,
        user_id
      ]);
      return res.json(jobs);
    } catch (err) {
      next(err);
    }
  });

  // TODO change to put method since it sends the whole object
  app.post("/jobs/update", requireAuthToken, async (req, res, next) => {
    // TODO - This needs to be fixed to handle updates properly
    const user_id = req.user.id;
    const {
      id,
      posting_url,
      company_name,
      company_url,
      job_title,
      current_status,
      job_location,
      job_source,
      active
    } = req.body;

    const insert = `
      UPDATE jobs SET 
        posting_url = $2, 
        company_name = $3,
        company_url = $4,
        job_title = $5,
        current_status = $6,
        job_location = $7,
        job_source = $8,
        active = $9,
        updated = now()::timestamp
      WHERE id = $1 AND user_id = $10
      RETURNING *
      ;`;

    try {
      const dbResponse = await pool.query(insert, [
        id,
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        job_source,
        active,
        user_id
      ]);
      console.log(dbResponse.rows[0]);
      return res.send({ status: 200 });
    } catch (err) {
      next(err);
    }
  });

  app.post("/jobs/delete", requireAuthToken, async (req, res, next) => {
    const user_id = req.user.id;
    const { id } = req.body;
    const remove = `DELETE FROM jobs WHERE id = $1 AND user_id = $2;`;

    try {
      const dbResponse = await pool.query(remove, [id, user_id]);
      return res.send({ status: 200 });
    } catch (err) {
      next(err);
    }
  });

  app.get("/jobs", requireAuthToken, async (req, res, next) => {
    const user_id = req.user.id;
    const query = `SELECT * FROM jobs WHERE user_id = $1;`;
    try {
      // TODO add limit, sort and pagination to complete endpoint
      const jobs = await pool.query(query, [user_id]);
      return res.json(jobs.rows);
    } catch (err) {
      next(err);
    }
  });
};
