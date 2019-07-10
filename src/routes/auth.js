const auth = require('express').Router();

auth.get('/', (req, res) => {
  res.send({ status: 'okay', data: 'auth' });
});

auth.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for user ${id}` });
});

module.exports = auth;
