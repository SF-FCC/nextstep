BEGIN TRANSACTION;

CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    posting_url VARCHAR(500),
    company_name VARCHAR(255),
    company_url VARCHAR(500),
    job_title VARCHAR(255),
    current_status VARCHAR(255),
    job_location VARCHAR(255)
);

COMMIT;