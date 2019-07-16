const Trip = require('express').Router();
const {
  createTrip,
  getAllTrips,
  cancelTrip,
  filterTrip
} = require('../controllers/trip_controller');
const { authenticate } = require('../controllers/auth_controller');

// Middleware
Trip.use(authenticate);

// Routes
Trip.post('/', createTrip);
Trip.get('/', getAllTrips);
Trip.patch('/:tripId', cancelTrip);

// Extras
Trip.get('/destination/:destination', filterTrip);
Trip.get('/origin/:origin', filterTrip);

module.exports = Trip;
