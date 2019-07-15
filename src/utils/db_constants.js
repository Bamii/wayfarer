module.exports = {
  ADD_USER_QUERY:
    'insert into users(email, first_name, last_name, password) values ($1, $2, $3, $4) returning *',
  SEARCH_USER_BY_EMAIL_QUERY: 'SELECT * FROM users where email=$1',
  SEARCH_USER_BY_ID_QUERY: 'SELECT * FROM users where id=$1',
  CREATE_TRIP_QUERY:
    'insert into trip(bus_id, origin, trip_date, fare, status, destination, bookings) values ($1, $2, $3, $4, $5, $6, $7) returning *',
  SEARCH_BUS_BY_ID_QUERY: 'SELECT * from bus where bus_id=$1',
  SELECT_ALL_TRIPS_QUERY: 'select * from trip',
  SELECT_ALL_TRIPS_BY_ID_QUERY: 'select * from trip where trip_id=$1',
  CREATE_BOOKING_QUERY:
    'insert into booking(user_id, trip_id, created_on) values ($1, $2, now()) returning *'
};
