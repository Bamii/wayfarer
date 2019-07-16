const Trip = require('express').Router();
const { createTrip, getAll } = require('../controllers/trip_controller');
const { authenticate } = require('../controllers/auth_controller');

// Routes
Trip.post('/', authenticate, createTrip);
Trip.get('/', authenticate, getAll);

Trip.patch('/:tripid', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for user ${id}` });
});

Trip.get('/:destination', (req, res) => {});

Trip.get('/:origin', (req, res) => {});

module.exports = Trip;
