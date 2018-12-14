INSERT INTO users (
        first_name,
        last_name,
        email,
        password
) VALUES
(
  'John',
  'Doe',
  'john@mail.com',
  'password1'
), 
(
  'Jane',
  'Doe',
  'jane@mail.com',
  'password2'
);


INSERT INTO jobs (
        posting_url,
        company_name,
        company_url,
        job_title,
        current_status,
        job_location,
        job_source,
        user_id
) VALUES
(
'https://angel.co/black-sms/jobs/266042-software-engineer-fullstack',
'Black SMS',
'www.black.com',
'Software Engineer - Fullstack',
'Interested',
'San Francisco',
'AngelList',
1
),
(
'https://www.dice.com/jobs/detail/3431bbb22f3ce9b6cb0a9ec3ba00b6ed?src=32&CMPID=AG_ZR_PD_JS_US_OG_RC_&utm_campaign=Advocacy_Ongoing&utm_medium=Aggregator&utm_source=ZipRecuiter&rx_campaign=ziprecruiter36&rx_group=102012&rx_job=90907234%2F3431bbb22f3ce9b6cb0a9ec3ba00b6ed&rx_medium=cpc&rx_source=ziprecruiter&zip_cid=4b5533ed-e2bd-4bdc-b8f7-7bc98b8d2e90',
'Intelletec LLC',
'www.intelletec.com',
'Full Stack Developer (React Python)',
'Applied',
'San Francisco',
'Dice',
1
),
(
'https://www.linkedin.com/jobs/view/993029730/',
'Guidebook Inc',
'guidebook.com',
'Full Stack Developer (React Python)',
'Phone Call',
'San Francisco',
'LinkedIn',
1
),
(
'https://jobs.lever.co/appacademy/2cec5cb5-6250-476e-b981-86467e4c9c27',
'App Academy',
'https://www.appacademy.io/'
'Software Engineer--Web',
'Software Engineer',
'applied',
'San Francisco',
'CompanyWebsite',
2
),
(
'https://angel.co/crew-3/jobs/158070-front-end-developer',
'Crew',
'www.crew.com',
'Front-end Developer at Crew',
'On site',
'San Francisco',
'AngelList',
2
),
(
'https://angel.co/luxe-1/jobs/300616-software-engineer-front-end',
'LUXE',
'www.luxe.org',
'Software Engineer (Front End) at Luxe',
'assignment',
'San Francisco',
'AngelList',
2
);

