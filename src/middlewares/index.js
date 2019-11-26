const url = require('url');
const express = require('express').Router();
const debug = require('debug')('app:middlewares');
const { buildResponse, findMissingFields, existsIn, appendTo, append } = require('../utils/helpers');
var setPrototypeOf = require('setprototypeof');

function flatten(array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];

    if (Array.isArray(value)) {
      flattenForever(value, result);
    } else {
      result.push(value);
    }
  }

  return result;
}

function checkForValidPath(paths) {
  return function(req, res, next) {
    debug(`[path] =>  [${req.originalUrl}]`);
    const path = url.parse(req.url).path;

    if (paths.find(e => e === path)) {
      next();
    } else {
      res
        .status(404)
        .send(buildResponse('error', 'This endpoint does not exist! Please refer to the docs.'));
    }
  };
}

function checkMissingField(fields) {
  return function(req, res, next) {
    const missingFields = findMissingFields(req.body, fields);
    debug(missingFields);

    // uses passport's local stategy for email, and password signin.
    if (missingFields.length > 0) {
      res
        .status(200)
        .send(
          buildResponse('error', `${missingFields.length} field(s) are missing!`, { missingFields })
        );
      return;
    }
    next();
  };
}

module.exports = {
  checkForValidPath,
  checkMissingField,
};
