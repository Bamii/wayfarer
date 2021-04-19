const routes = require('express').Router();
const trip = require('./trip');
const auth = require('./auth');
const booking = require('./booking');
// const myMiddleware = require('../middlewares/mid');
const { middleware } = require('../middlewares/');
const { authenticate } = require('../controllers/auth_controller');
const { checkForValidPath } = require('../middlewares');

// Routes Middleware.
// routes.use(checkForValidPath(['/', '/auth', '/trips', '/bookings', '/test']));

// routes
routes.get('/', (req, res) => res.send({ message: 'Welcome to the Wayfarer API!' }));
routes.use('/auth', auth);
routes.use('/trips', trip);
routes.use('/bookings', booking);
routes.use('/test', function(req, res, next) {
  console.log(req.body);
  res.set('Content-Type', 'application/json');
  res.send({
    ok: true
  });
});

// exports.
module.exports = routes;
