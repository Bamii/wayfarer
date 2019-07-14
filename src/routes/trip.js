const Trip = require('express').Router();

Trip.post('/', (req, res) => {
  res.send({ status: 'okay', data: 'trip' });
});

Trip.get('/', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for trip ${id}` });
});

Trip.patch('/:tripid', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for user ${id}` });
});

Trip.get('/:destination', (req, res) => {});

Trip.get('/:origin', (req, res) => {});

module.exports = Trip;
