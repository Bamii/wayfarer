const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getVersionNumber = () => 1;

const getType = o =>
  Object.prototype.toString
    .call(o)
    .split(' ')[1]
    .slice(0, -1)
    .toLowerCase();

const is = (type, value) => lowerCase(getType(value)) === lowerCase(type);

const lowerCase = val => val.toLowerCase();

const findMissingFields = (data, fields) =>
  fields.reduce((acc, curr) => (!data.hasOwnProperty(curr) ? acc.concat(curr) : acc), []);

const existsIn = (el, arr) => (arr.find(ele => ele === el) === undefined ? true : false);

const appendTo = (arr, el, d) => d === 'f' ? [el].concat(arr) : arr.concat(el);

const append = (arr, el) => {
  const last = arr.pop();
  return [...arr, el, last];
}

// Password utilities
const hashPassword = ({ password, saltingRounds = 10 }) => bcrypt.hashSync(password, saltingRounds);

const comparePassword = (text, hash) => bcrypt.compareSync(text, hash);

const generateToken = ({ payload, secret = 'wayfarer' }) => jwt.sign(payload, secret);

// API service utilities
const buildResponse = (type, data, extras) => {
  const d = { status: type };

  d[type === 'success' ? 'data' : 'error'] = data;

  if (getType(extras).toLowerCase() === 'object') {
    const names = Object.getOwnPropertyNames(extras);
    names.forEach(name => (d[name] = extras[name]));
  }
  return d;
};

module.exports = {
  getVersionNumber,
  findMissingFields,
  buildResponse,
  hashPassword,
  comparePassword,
  generateToken,
  is,
  existsIn,
  appendTo,
  append
};
