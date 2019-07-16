const passport = require('passport');
const debug = require('debug')('app:trip_controller');
const client = require('../../connection');
const { buildResponse, findMissingFields } = require('../utils/helpers');
const {
  CREATE_TRIP_QUERY,
  SEARCH_TRIPS_QUERY,
  SEARCH_BUS_BY_ID_QUERY,
  UPDATE_TRIP_STATUS_QUERY,
  SEARCH_TRIPS_BY_DESTINATION_QUERY,
  SEARCH_TRIPS_BY_ORIGIN_QUERY,
  SEARCH_TRIPS_BY_DIRECTION_QUERY,
} = require('../utils/db_constants');

function tripController() {
  function createTrip(req, res) {
    const { bus_id, origin, destination, trip_date, fare, status } = req.body;
    const { is_admin } = req.user;
    const fields = ['bus_id', 'origin', 'destination', 'trip_date', 'fare', 'status'];
    const missingFields = findMissingFields(req.body, fields);

    if (missingFields.length > 0) {
      res
        .status(500)
        .send(
          buildResponse('error', `${missingFields.length} field(s) are missing!`, { missingFields })
        );
    } else {
      if (is_admin) {
        client.query(SEARCH_BUS_BY_ID_QUERY, [bus_id])
          .then(({ rows }) => {
            if (rows.length === 0) {
              res.status(200).send(buildResponse('error', "The bus_is is invalid!"));
            } else {
              client.query(CREATE_TRIP_QUERY, [bus_id, origin, trip_date, fare, status, destination])
                .then(({ rows: [trip] }) => {
                  res.status(200).send(buildResponse('success', trip));
                })
            }
          })
          .catch((err) => debug(err.message));
      } else {
        res.status(401).send(buildResponse('error', "Authorization required! You're not allowed to view this endpoint!"))
      }
    }
  }

  function getAllTrips(req, res) {
    const { user_id, is_admin } = req.user;

    client.query(SEARCH_TRIPS_QUERY)
      .then(({ rows }) => {
        res.status(200).send(buildResponse('success', rows));
      })
      .catch(e => debug(e.message));
  }

  function cancelTrip(req, res) {
    const { user_id, is_admin } = req.user;
    const { tripId } = req.params;

    if (is_admin) {
      client.query(UPDATE_TRIP_STATUS_QUERY, [tripId, 0])
        .then(({ rows }) => {
          res.status(200).send(buildResponse('success', "Trip cancelled successfully"));
        })
        .catch(e => res.status(500).send(buildResponse('error', 'Internal Server Error!')))
    } else {
      res.status(401).send(buildResponse('error', "Authorization required! You're not allowed to view this endpoint!"));
    }
  }

  function filterTrip(req, res) {
    const { destination, origin } = req.params;
    const QUERY = destination ? SEARCH_TRIPS_BY_DESTINATION_QUERY : SEARCH_TRIPS_BY_ORIGIN_QUERY;
    const location = destination ? destination : origin;


    client.query(QUERY, [location])
      .then(({ rows }) => {
        debug(rows);
        res.status(200).send(buildResponse('success', rows))
      })
      .catch(e => res.status(500).send(buildResponse('error', 'Internal Server Error!')))
  }

  return {
    createTrip,
    cancelTrip,
    filterTrip,
    getAllTrips,
  }
}

module.exports = tripController();
