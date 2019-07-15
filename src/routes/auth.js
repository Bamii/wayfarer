const Auth = require('express').Router();
const { signin, signup, authenticate } = require('../controllers/auth_controller');
const { checkForValidPath } = require('../middlewares');
const { buildResponse } = require('../utils/helpers');

// middlewares
// Auth.use(checkForValidPath(['/', 'signin', 'signup', 'teapot']));

// routes
Auth.post('/signin', signin);
Auth.post('/signup', signup);
Auth.get('/teapot', authenticate, (req, res) => {
  res.status(418).send(buildResponse('success', 'Sip on!!'));
});

module.exports = Auth;
