const { Client, Pool } = require('pg');
const debug = require('debug')('conn');

require('dotenv').config();

const LocalClient = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: '5432',
  ssl: true
});

LocalClient.connect();

module.exports = LocalClient;
