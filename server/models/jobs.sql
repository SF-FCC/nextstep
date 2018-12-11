BEGIN TRANSACTION;

CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    posting_url VARCHAR(500),
    company_name VARCHAR(255),
    company_url VARCHAR(500),
    job_title VARCHAR(255),
    current_status VARCHAR(255),
    job_location VARCHAR(255),
    job_source VARCHAR(255),
    created TIMESTAMP DEFAULT now(),
    updated TIMESTAMP DEFAULT now(),
    user_id INTEGER REFERENCES users (id)
);

COMMIT;