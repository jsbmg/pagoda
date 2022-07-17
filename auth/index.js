require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secureRoutes');
const app = express();
const port = 8000;

app.use(morgan('tiny'));
app.use(express.json());

app.use('/', routes);
app.use('/', passport.authenticate('jwt', { session: false }), secureRoutes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
