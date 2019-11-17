const Auth = require('express').Router();
const { signin, signup, authenticate } = require('../controllers/auth_controller');
const { checkForValidPath, checkMissingField } = require('../middlewares');
const { buildResponse } = require('../utils/helpers');
const debug = require('debug')('authjs');

// middlewares
Auth.use(checkForValidPath(['/', '/signin', '/signup', '/teapot', '/teaspoon']));

// routes
Auth.post('/signin', checkMissingField(['email', 'password']), signin);
Auth.post(
  '/signup',
  checkMissingField(['email', 'first_name', 'last_name', 'password', 'is_admin']),
  signup
);
Auth.get('/teapot', (req, res) => {
  debug(req.bami);
  res.status(418).send(buildResponse('success', 'Sip on!!'));
});
Auth.get('/teaspoon', (req, res) => {
  res.status(418).send(buildResponse('success', 'Spoon on ;)'));
});

module.exports = Auth;
