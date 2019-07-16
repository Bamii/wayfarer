const passport = require('passport');
const debug = require('debug')('app:booking_controller');
const client = require('../../connection');
const { buildResponse, findMissingFields } = require('../utils/helpers');
const {
  CREATE_BOOKING_QUERY,
  SEARCH_TRIPS_BY_ID_QUERY,
  SEARCH_BOOKINGS_BY_USER_ID_QUERY,
  SEARCH_BOOKINGS_QUERY,
  DELETE_BOOKING_QUERY,
  SEARCH_BOOKINGS_BY_ID_AND_USER_ID_QUERY,
  UPDATE_BOOKING_SEAT_QUERY,
} = require('../utils/db_constants');

function bookingController() {
  function createBooking(req, res) {
    const { trip_id } = req.body;
    const { user_id, is_admin } = req.user;
    const fields = ['trip_id'];
    const missingFields = findMissingFields(req.body, fields);
    
    if (missingFields.length > 0) {
      res
        .status(200)
        .send(
          buildResponse('error', `${missingFields.length} field(s) are missing!`, { missingFields })
        );
    } else {
      client.query(SEARCH_TRIPS_BY_ID_QUERY, [trip_id])
        .then(({ rows }) => {
          const [trip] = rows;
          if (rows.length === 0) {
            res.status(200).send(buildResponse('error', "Invalid Trip ID. This Trip does not exist in our database."));
          } else {
            client.query(CREATE_BOOKING_QUERY, [user_id, trip_id])
              .then(({ rows: [booking] }) => {
                res.status(200).send(buildResponse('success', { ...trip, ...booking }));
                // first_name, last_name, email. ::TODO::
              })
          }
        })
        .catch(e => debug(e.message));
    }
  }

  function getAllBookings(req, res) {
    const { user_id, is_admin } = req.user;
    const query = is_admin
      ? client.query(SEARCH_BOOKINGS_QUERY)
      : client.query(SEARCH_BOOKINGS_BY_USER_ID_QUERY, [user_id]);

     query
        .then(({ rows }) => {
          res.status(200).send(buildResponse('success', rows));
        })
        .catch(() => res.status(500).send(buildResponse('error', 'Internal Server Error!')));
  }

  function deleteBooking(req, res) {
    const { user_id, is_admin } = req.user;
    const { bookingId } = req.params;

      client.query(SEARCH_BOOKINGS_BY_ID_AND_USER_ID_QUERY, [bookingId, user_id])
        .then(({ rows }) => {
          if (rows.length === 0) {
            res.status(401).send(buildResponse('error', "You have no booking with this ID on our system!"));
          } else {
            client.query(DELETE_BOOKING_QUERY, [bookingId])
              .then(() => {
                res.status(200).send(buildResponse('success', "Booking deleted successfully"));
              })
          }
        })
        .catch(() => res.status(500).send(buildResponse('error', 'Internal Server Error!')))
  }

  function changeSeat(req, res) {
    const { bookingId } = req.params;
    const { seat_no } = req.body;
    const { user_id } = req.user;
    const fields = ['seat_no'];
    const missingFields = findMissingFields(req.body, fields);

    if (missingFields.length > 0) {
      res
        .status(200)
        .send(
          buildResponse('error', `${missingFields.length} field(s) are missing!`, { missingFields })
        );
    } else {
      client.query(SEARCH_BOOKINGS_BY_ID_AND_USER_ID_QUERY, [bookingId, user_id])
        .then(({ rows }) => {
          if (rows.length === 0) {
            res.status(200).send(buildResponse('error', 'You have no booking with this ID on our system!'))
          } else {

            client.query(UPDATE_BOOKING_SEAT_QUERY, [bookingId, seat_no])
              .then(({ rows }) => {
                debug(rows);
                res.status(200).send(buildResponse('success', "Seat No changed successfully", { msg: rows }));
              });
          }
        })
        .catch(e => res.status(500).send(buildResponse('error', 'Internal Server Error!')))
    }
  }

  return {
    changeSeat,
    createBooking,
    deleteBooking,
    getAllBookings,
  }
}

module.exports = bookingController();
