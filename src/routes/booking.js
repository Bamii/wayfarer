const Booking = require('express').Router();

Booking.post('/', (req, res) => {
  res.send({ status: 'okay', data: 'booking' });
});

Booking.get('/', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for booking ${id}` });
});

Booking.delete('/:bookingid', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for user ${id}` });
});

module.exports = Booking;
