const Trip = require('express').Router();
const { createTrip, getAllTrips, cancelTrip, filterTrip } = require('../controllers/trip_controller');
const { authenticate } = require('../controllers/auth_controller');

// Routes
Trip.use(authenticate);
Trip.post('/', createTrip);
Trip.get('/', getAllTrips);
Trip.patch('/:tripId', cancelTrip);

// Extras
Trip.get('/destination/:destination', filterTrip);
Trip.get('/origin/:origin', filterTrip);

module.exports = Trip;
