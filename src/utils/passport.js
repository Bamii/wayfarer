const passport = require('passport');
require('./strategies/local.strategy.js')();
require('./strategies/jwt.strategy.js')();

const passportFn = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passportFn;
