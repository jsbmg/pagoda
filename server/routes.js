const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const db = require('./db/db');

const router = express.Router();

passport.use(new LocalStrategy(
  function verify(username, password, cb) {
  console.log(username, password);
  db.query('SELECT * FROM users WHERE username = $1', [ username ], function(err, row) {
    row = row.rows[0];
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { messages: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { messages: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

router.post('/login/password',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  function(req, res) {
    console.log('here', req);
    res.send(201);
  }
);

router.post('/signup', async function(req, res, next) {
  var salt = crypto.randomBytes(16);
  try {
    const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256');
    await db.query('INSERT INTO users (username, email, hashed_password, salt) VALUES ($1, $2, $3, $4)',
      [
        req.body.username,
        req.body.email,
        hashedPassword,
        salt,
      ]
    );
    console.log('User created!');
  } catch(error) {
    return next(error);
  }
});

module.exports = router;