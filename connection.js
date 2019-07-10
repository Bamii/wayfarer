const { Client, Pool } = require('pg');

async function connect(config) {
  const client = new Client(config);

  await client.connect();

  const res = await client.query('select * from users');

  console.log(res);
}

// call
connect({
  user: 'postgres',
  host: 'localhost',
  database: 'wayfarer',
  password: 'Dhaiv335.',
  port: '5432'
});
