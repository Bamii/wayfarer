const routes = require('express').Router();
const trip = require('./trip');
const auth = require('./auth');
const booking = require('./booking');
const { checkForValidPath } = require('../middlewares');

// Routes Middleware.
routes.use(checkForValidPath(['/', 'auth', 'trips']));
routes.get('/', (req, res) => res.send({ message: 'Welcome to the Wayfarer API!' }));

// routes
routes.use('/auth', auth);
routes.use('/trips', trip);
routes.use('/bookings', booking);

// exports.
module.exports = routes;
