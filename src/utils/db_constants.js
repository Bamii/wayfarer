module.exports = {

  // Searches
  SEARCH_USER_BY_EMAIL_QUERY: 'select * FROM users where email=$1',
  SEARCH_USER_BY_ID_QUERY: 'select * FROM users where id=$1',
  SEARCH_BUS_BY_ID_QUERY: 'select * from bus where bus_id=$1',

  // Select alls
  SEARCH_TRIPS_QUERY: 'select * from trip',
  SEARCH_TRIPS_BY_ID_QUERY: 'select * from trip where trip_id=$1',
  SEARCH_BOOKINGS_QUERY: 'select * from booking',
  SEARCH_BOOKINGS_BY_USER_ID_QUERY: 'select * from booking where user_id=$1',
  SEARCH_BOOKINGS_BY_ID_AND_USER_ID_QUERY: 'select * from booking where user_id=$2 and booking_id=$1',
  SEARCH_TRIPS_BY_DESTINATION_QUERY: 'select * from trip where lower(destination)=$1',
  SEARCH_TRIPS_BY_ORIGIN_QUERY: 'select * from trip where lower(origin)=$1',
  SEARCH_TRIPS_BY_DIRECTION_QUERY: 'select * from trip where lower($1)=$2',
  
  // Creates
  CREATE_BOOKING_QUERY:
  'insert into booking(user_id, trip_id) values ($1, $2) returning *',
  CREATE_TRIP_QUERY:
  'insert into trip(bus_id, origin, trip_date, fare, status, destination) values ($1, $2, $3, $4, $5, $6) returning *',
  ADD_USER_QUERY:
  'insert into users(email, first_name, last_name, password, is_admin) values ($1, $2, $3, $4, $5) returning *',
  
  // Deletes
  DELETE_BOOKING_QUERY: 'delete from booking where booking_id=$1 returning *',
  DELETE_USER_BY_EMAIL_QUERY: 'delete from users where email=$1',
  
  // Updates
  UPDATE_TRIP_STATUS_QUERY: 'update trip set status=$2 where trip_id=$1 returning *',
  UPDATE_BOOKING_SEAT_QUERY: 'update booking set seat_no=$2 where booking_id=$1 returning *'
};
