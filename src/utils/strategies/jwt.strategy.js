const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const debug = require('debug')('app:jwt');
const connection = require('../../../connection');
const { comparePassword } = require('../helpers');
const { SEARCH_USER_BY_ID_QUERY } = require('../db_constants');

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'wayfarer'
};

module.exports = () => {
  passport.use(
    new Strategy(opts, ({ id }, done) => {
      connection.query(SEARCH_USER_BY_ID_QUERY, [id], (err, res) => {
        const [user] = res.rows;

        if (err || !user) {
          done(null, false);
        }

        if (user) {
          done(null, user);
        }
      });
    })
  );
};
