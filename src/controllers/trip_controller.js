const passport = require('passport');
const debug = require('debug')('app:trip_controller');
const client = require('../../connection');
const {
  findMissingFields,
  buildResponse,
  hashPassword,
  generateToken
} = require('../utils/helpers');
const { CREATE_TRIP_QUERY, SEARCH_BUS_BY_ID_QUERY, SELECT_ALL_TRIPS_QUERY } = require('../utils/db_constants');

function tripController() {
  function createTrip(req, res) {
    const { bus_id, origin, destination, trip_date, fare, status } = req.body;
    const { user_id, is_admin } = req.user;

    if (is_admin) {
      client.query(SEARCH_BUS_BY_ID_QUERY, [bus_id])
        .then(({ rows }) => {
          if (rows.length === 0) {
            res.send(buildResponse('error', "The bus_is is invalid!"));
          } else {
            client.query(CREATE_TRIP_QUERY, [bus_id, origin, trip_date, fare, status, destination])
              .then(({ rows: [trip] }) => {
                res.send(buildResponse('success', trip));
              })
          }
        })
        .then(() => {
          debug(req.user);
          debug(req.body);
        })
        .catch((err) => debug(err));
    } else {
      res.status(401).send(buildResponse('error', "Authorization required! You're not allowed to view this endpoint!"))
    }
  }

  function getAll(req, res) {
    const { user_id, is_admin } = req.user;

    client.query(SELECT_ALL_TRIPS_QUERY)
      .then(({ rows }) => {
        res.status(200).send(buildResponse('success', rows));
      })
  }

  return {
    getAll,
    createTrip
  }
}

module.exports = tripController();
