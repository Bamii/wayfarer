const Booking = require('express').Router();
const {
  createBooking,
  getAllBookings,
  deleteBooking,
  changeSeat
} = require('../controllers/booking_controller');
const { authenticate } = require('../controllers/auth_controller');

// Middleware
// Booking.use(authenticate);

// Routes
Booking.post('/', createBooking);
Booking.get('/', getAllBookings);
Booking.delete('/:bookingId', deleteBooking);

// Extras
Booking.patch('/:bookingId', changeSeat);

module.exports = Booking;
