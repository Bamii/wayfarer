const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function getVersionNumber() {
  return 1;
}

function queryBuilder() {
  return 1;
}

function findMissingFields(data, fields) {
  const f = [...fields];
  const d = { ...data };
  const r = [];

  for (let i of fields) {
    if (Object.keys(d).find(e => e === i) === undefined) {
      r.push(i);
    }
  }

  return r;
}

function buildResponse(type, data, extras) {
  const d = { status: type };

  d[type === 'success' ? 'data' : 'error'] = data;

  if (extras) {
    const names = Object.getOwnPropertyNames(extras);
    names.forEach(name => (d[name] = extras[name]));
  }
  return d;
}

function hashPassword({ password, saltingRounds = 10 }) {
  return bcrypt.hashSync(password, saltingRounds);
}

function comparePassword(text, hash) {
  return bcrypt.compareSync(text, hash);
}

function generateToken(options) {
  const { payload, secret = 'wayfarer', jwtOpts } = options;

  return jwt.sign(payload, secret);
}

module.exports = {
  getVersionNumber,
  queryBuilder,
  findMissingFields,
  buildResponse,
  hashPassword,
  comparePassword,
  generateToken
};
