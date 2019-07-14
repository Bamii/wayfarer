const passport = require('passport');
const debug = require('debug')('app:auth_controller');
const client = require('../../connection');
const {
  findMissingFields,
  buildResponse,
  hashPassword,
  generateToken
} = require('../utils/helpers');
const { ADD_USER_QUERY, SEARCH_USER_BY_EMAIL_QUERY } = require('../utils/db_constants');

function authController() {
  function signup(req, res) {
    const { email, password, first_name, last_name, is_admin } = req.body;
    const fields = ['email', 'first_name', 'last_name', 'password', 'is_admin'];
    const user = [email, first_name, last_name, hashPassword({ password })];
    const missingFields = findMissingFields(req.body, fields);

    if (missingFields.length > 0) {
      // Send error message if there are missing fields.
      res.send(
        buildResponse('error', `${missingFields.length} field(s) are missing!`, { missingFields })
      );
    } else {
      // Check if a user already exists
      // 1. if not, create a new one and send a success response to the user
      // 2. if one exists, send an error message to the user.
      client.query(SEARCH_USER_BY_EMAIL_QUERY, [email]).then(({ rows }) => {
        if (rows.length > 0) {
          // send error message if a user with the same email already exists.
          res.send(buildResponse('error', 'This email exists already in our database.'));
        } else {
          // create new user
          client
            .query(ADD_USER_QUERY, user)
            .then(({ rows: [user] }) => {
              const u = { user_id: user.id, is_admin: user.is_admin };

              req.login(user, () => {
                res.send(
                  buildResponse('success', {
                    token: generateToken({ payload: u }),
                    ...u
                  })
                );
              });
            })
            //client.catch
            .catch(e => res.send(buildResponse('error', e.message)));
        }
      });
    }
  }

  function signin(req, res, next) {
    return passport.authenticate('local', { session: false }, (err, user) => {
      if (err) {
        res.send(buildResponse('error', err));
      }

      if (!user) {
        res.send(buildResponse('error', 'Wrong Email or Password. Please try again :)'));
      } else {
        const { id, is_admin } = user;
        const data = { id, is_admin };

        res.send(
          buildResponse('success', {
            token: generateToken({ payload: data }),
            ...data
          })
        );
      }
    })(req, res, next);
  }

  function authenticate(req, res, next) {
    return passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        res
          .status(401)
          .send(
            buildResponse('error', "Authentication required. You're not allowed to view this page!")
          );
      }

      if (user) {
        next();
      } else if (!user) {
        res
          .status(401)
          .send(
            buildResponse('error', "Authentication required. You're not allowed to view this page!")
          );
      }
    })(req, res, next);
  }

  return {
    signin,
    signup,
    authenticate
  };
}

module.exports = authController();
