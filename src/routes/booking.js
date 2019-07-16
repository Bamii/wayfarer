const Booking = require('express').Router();
const {
  createBooking,
  getAllBookings,
  deleteBooking,
  changeSeat
} = require('../controllers/booking_controller');
const { authenticate } = require('../controllers/auth_controller');

// Routes
Booking.use(authenticate);
Booking.post('/', createBooking);
Booking.get('/', getAllBookings);
Booking.delete('/:bookingId', deleteBooking);

// Extras
Booking.patch('/:bookingId', changeSeat);

module.exports = Booking;
