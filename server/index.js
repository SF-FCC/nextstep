const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
const pool = require('./db/postgres').pool;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
// TODO change static location and serve with nginx
app.use(express.static('../client/build'));

// Routes
require('./routes/index')(app);
require('./routes/jobs')(app);
require('./routes/users')(app);
require('./routes/auth')(app);

//Server Setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
});

// Graceful shutdown
function gracefulShutdown() {
  console.log('Closing http server.');
  server.close(() => {
    console.log('Closing db');
    pool.end(err => console.log(err));
  });
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
