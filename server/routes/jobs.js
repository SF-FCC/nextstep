// Temp index routing
const pool = require("../db/postgres").pool;

module.exports = app => {
  app.post("/jobs", async (req, res, next) => {
    // TODO - Need to add user_id from client req (action creator)
    const {
      posting_url,
      company_name,
      company_url,
      job_title,
      current_status,
      job_location,
      user_id
    } = req.body;
    const insert = `
      INSERT INTO jobs (
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        user_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    try {
      const jobs = await pool.query(insert, [
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        user_id
      ]);
      return res.json(jobs);
    } catch (err) {
      next(err);
    }
  });

  app.get("/jobs", async (req, res, next) => {
    // TODO - need to add user_id to query based on auth middleware/ request
    const query = `SELECT * from jobs`;
    try {
      // TODO add limit, sort and pagination to complete endpoint
      const jobs = await pool.query(query);
      return res.json(jobs.rows);
    } catch (err) {
      next(err);
    }
  });
};
