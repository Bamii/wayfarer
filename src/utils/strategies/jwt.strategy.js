const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const debug = require('debug')('app:jwt');
const connection = require('../../../connection');
const { comparePassword } = require('../helpers');
const { SEARCH_USER_BY_ID_QUERY } = require('../db_constants');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'wayfarer'
};

module.exports = () => {
  passport.use(
    new Strategy(opts, ({ user_id }, done) => {
      connection.query(SEARCH_USER_BY_ID_QUERY, [user_id], (err, res) => {
        const [user] = res.rows;

        if (user) {
          done(null, user);
          return;
        }

        done(null, false);
      });
    })
  );
};
