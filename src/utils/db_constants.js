module.exports = {
  ADD_USER_QUERY:
    'insert into users(email, first_name, last_name, password) values ($1, $2, $3, $4) returning *',
  SEARCH_USER_BY_EMAIL_QUERY: 'SELECT * FROM users where email=$1',
  SEARCH_USER_BY_ID_QUERY: 'SELECT * FROM users where id=$1'
};
