const passport = require('passport');
const debug = require('debug')('app:auth_controller');
const client = require('../../connection');
const { buildResponse, hashPassword, generateToken } = require('../utils/helpers');
const { ADD_USER_QUERY, SEARCH_USER_BY_EMAIL_QUERY } = require('../utils/db_constants');

function authController() {
  function signup(req, res) {
    const { email, first_name, last_name, is_admin, password } = req.body;
    // Check if a user already exists
    // 1. if not, create a new one and send a success response to the user
    // 2. if one exists, send an error message to the user.
    client.query(SEARCH_USER_BY_EMAIL_QUERY, [email]).then(({ rows }) => {
      debug(rows);
      if (rows.length > 0) {
        // 1. send error message if a user with the same email already exists.
        res.status(200).send(buildResponse('error', 'This email exists already in our database.'));
      } else {
        // 2. create new user if one doesn't exist already.
        const userFields = [
          email,
          first_name,
          last_name,
          hashPassword({ password, saltingRounds: 10 }),
          is_admin
        ];

        client
          .query(ADD_USER_QUERY, userFields)
          .then(({ rows: [user] }) => {
            const u = { user_id: user.id, is_admin: !!user.is_admin, iat: Date.now() };

            req.login(user, () => {
              res
                .status(200)
                .send(buildResponse('success', { token: generateToken({ payload: u }), ...u }));
            });
          })
          // client.catch
          .catch(e => res.status(500).send(buildResponse('error', e.message)));
      }
    });
  }

  function signin(req, res, next) {
    return passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        res
          .status(200)
          .send(buildResponse('error', 'Wrong Email or Password. Please try again :)'));
      } else {
        const { id, is_admin } = user;
        const data = { user_id: id, is_admin, iat: Date.now() };

        res.status(200).send(
          buildResponse('success', {
            token: generateToken({ payload: data }),
            ...data
          })
        );
      }
    })(req, res, next);
  }

  function authenticate(req, res, next) {
    // uses passport's jwt strategy for jwt authentications.
    return passport.authenticate('jwt', { session: false }, (err, user) => {

      if (err) {
        res
          .status(401)
          .send(
            buildResponse('error', "Authentication required. You're not allowed to view this page!")
          );
      }

      if (user) {
        req.user = { user_id: user.id, is_admin: user.is_admin };
        next();
      } else if (!user) {
        res
          .status(401)
          .send(
            buildResponse('error', "Authentication required. You're not allowed to view this page!")
          );
      }
    })(req, res, next);
    // res
    //   .status(401)
    //   .send(
    //     buildResponse('error', "Authentication required. You're not allowed to view this page!")
    //   );
  }

  return {
    signin,
    signup,
    authenticate
  };
}

module.exports = authController();
