// Temp index routing
const pool = require("../db/postgres").pool;

module.exports = app => {
  app.post("/jobs", async (req, res, next) => {
    const {
      posting_url,
      company_name,
      company_url,
      job_title,
      current_status,
      job_location
    } = req.body;
    const insert = `
      INSERT INTO jobs (
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location
        )
      VALUES ($1, $2, $3, $4, $5, $6);`;
    try {
      const jobs = await pool.query(insert, [
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location
      ]);
      return res.json(jobs);
    } catch (err) {
      next(err);
    }
  });
  app.get("/jobs", async (req, res, next) => {
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
