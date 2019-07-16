module.exports = {

  // Searches
  SEARCH_USER_BY_EMAIL_QUERY: 'SELECT * FROM users where email=$1',
  SEARCH_USER_BY_ID_QUERY: 'SELECT * FROM users where id=$1',
  SEARCH_BUS_BY_ID_QUERY: 'SELECT * from bus where bus_id=$1',
  SELECT_ALL_TRIPS_QUERY: 'select * from trip',
  SELECT_ALL_TRIPS_BY_ID_QUERY: 'select * from trip where trip_id=$1',
  
  // Creates
  CREATE_BOOKING_QUERY:
  'insert into booking(user_id, trip_id) values ($1, $2) returning *',
  CREATE_TRIP_QUERY:
  'insert into trip(bus_id, origin, trip_date, fare, status, destination) values ($1, $2, $3, $4, $5, $6) returning *',
  ADD_USER_QUERY:
    'insert into users(email, first_name, last_name, password, is_admin) values ($1, $2, $3, $4, $5) returning *',
};
