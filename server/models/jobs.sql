/* If you want archived functionality to work, add the following sql command to your local db */ 
/* ALTER TABLE jobs ADD COLUMN active BOOL; */ 

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS jobs(
    id SERIAL PRIMARY KEY,
    posting_url VARCHAR(500),
    company_name VARCHAR(255),
    company_url VARCHAR(500),
    job_title VARCHAR(255),
    current_status VARCHAR(255),
    job_location VARCHAR(255),
    job_source VARCHAR(255),
    created TIMESTAMP DEFAULT now(),
    active BOOL DEFAULT true,
    updated TIMESTAMP DEFAULT now(),
    user_id INTEGER REFERENCES users (id)
);

COMMIT;
