const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function getType(o) {
  if (o === null) return "null";
  if (o === undefined) return "undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}

function getVersionNumber() {
  return 1;
}

function findMissingFields(data, fields) {
  const f = [...fields];
  const d = { ...data };
  const r = [];

  for (const i of fields) {
    if (Object.keys(d).find(e => e === i) === undefined) {
      r.push(i);
    }
  }

  return r;
}

function buildResponse(type, data, extras) {
  const d = { status: type };

  d[type === 'success' ? 'data' : 'error'] = data;

  if (getType(extras).toLowerCase() === 'object') {
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
  findMissingFields,
  buildResponse,
  hashPassword,
  comparePassword,
  generateToken
};
