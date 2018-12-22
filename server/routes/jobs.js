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
      job_source,
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
        job_source,
        user_id
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
        user_id
      ]);
      return res.json(jobs);
    } catch (err) {
      next(err);
    }
  });

  app.post("/jobs/update", async (req, res, next) => {
    const {
      id,
      posting_url,
      company_name,
      company_url,
      job_title,
      current_status,
      job_location,
      job_source,
    } = req.body;

    const insert = `
      UPDATE jobs SET 
        posting_url = $2, 
        company_name = $3,
        company_url = $4,
        job_title = $5,
        current_status = $6,
        job_location = $7,
        job_source = $8
      WHERE id = $1`;
    try {
      const dbResponse = await pool.query(insert, [
        id,
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        job_source
      ]);
      return res.json(dbResponse);
    } catch (err) {
      next(err);
    }
  });

  app.post("/jobs/delete", async (req, res, next) => {
    const { id } = req.body;
    const remove = `DELETE FROM jobs WHERE id = $1`;

    try {
      const dbResponse = await pool.query(remove, [id]);
      return res.json(dbResponse);
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
