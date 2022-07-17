const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const argon2 = require('argon2');
const crypto = require('crypto');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const db = require('../db/db');

passport.use(
  'signup',
  new localStrategy(
    async (username, password, done) => {
      const user = username;
      const salt = crypto.randomBytes(16);
      try {
        const hashedPassword = await argon2.hash(password);
        const values = [user, hashedPassword, salt];

        const query = await db.query(
          `INSERT INTO users (username, hashed_password, salt)
           VALUES ($1, $2, $3) RETURNING username`,
          values
        );

        return done(null, query.rows[0].username);
      } catch(error) {
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    async (username, password, done) => {
      console.log('at login');
      try {
        const query = await db.query(
          'SELECT * FROM users WHERE username = $1', [ username ]
        )

        const row = query.rows[0];

        if (!row) {
          return done(null, false, { message: 'User not found' });
        }

        crypto.pbkdf2(
          password,
          row.salt,
          10000,
          32,
          'sha256',
          async function(error, hashedPassword) {
            if (await argon2.verify(row.hashed_password, password)) {
              return done(null, row);
            }
            return done(null, false, { message: 'Incorrect password' });
          }
        );
      } catch(error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
