const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const debug = require('debug')('app:local_strategy')
const connection = require('../../../connection');
const { comparePassword } = require('../helpers');
const { SEARCH_USER_BY_EMAIL_QUERY } = require('../db_constants');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {
        connection.query(SEARCH_USER_BY_EMAIL_QUERY, [email], (err, res) => {
          const [user] = res.rows;

          if (err || !user || !comparePassword(password, user.password)) {
            done(null, false);
          } else {
            done(null, user);
          }
        });
      }
    )
  );
};
