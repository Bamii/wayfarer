const Auth = require('express').Router();
const debug = require('debug')('app:authjs');
const { signin, signup, authenticate } = require('../controllers/auth_controller');
const { checkForValidPath, checkMissingField, middleware } = require('../middlewares');
const { buildResponse } = require('../utils/helpers');

// middlewares
// Auth.use(checkForValidPath(['/', '/signin', '/signup', '/teapot', '/teaspoon']));
// Auth.use(
//   middleware({
//     baseUrl: '/api/v1',
//     auth: {
//       middleware: authenticate,
//       paths: ['/auth/teapot']
//     }
//   })
// );

// routes
Auth.post('/signin', checkMissingField(['email', 'password']), signin);
Auth.post(
  '/signup',
  checkMissingField(['email', 'first_name', 'last_name', 'password', 'is_admin']),
  signup
);
Auth.get('/teapot', (req, res) => {
  // debug(req.app._router.stack);
  res.status(418).send(buildResponse('success', 'Sip on!!'));
});
Auth.get('/teaspoon', (req, res) => {
  res.status(418).send(buildResponse('success', 'Spoon on ;)'));
});

module.exports = Auth;
