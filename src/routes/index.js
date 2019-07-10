const routes = require('express').Router();
const trip = require('./trip');
const auth = require('./auth');
const booking = require('./booking');

routes.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Wayfarer API' });
});

routes.use('/auth', auth);
routes.use('/trips', trip);
routes.use('/bookings', booking);

module.exports = routes;
