const { Client, Pool } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'wayfarer',
  password: 'Dhaiv335.',
  port: '5432'
});

client.connect();

module.exports = client;
