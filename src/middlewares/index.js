const url = require('url');
const express = require('express').Router();
const debug = require('debug')('app:middlewares');
const { buildResponse, findMissingFields, existsIn } = require('../utils/helpers');
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
    debug(req.originalUrl);
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

function middleware(options) {
  const { app, rootMiddleWares, path, paths, auth, baseUrl } = options;
  return function(req, res, next) {
    if (auth) {
      const { middleware: authMiddleware, paths: authPaths } = auth;
      debug('------------------------------------------');
      debug('mine');
      debug('------------------------------------------');

      // auth middleware.
      if (existsIn(req.originalUrl, authPaths)) {
        res.app.use(req.originalUrl, authMiddleware);
        next();
      }

      debug(app._router.stack);
    }
  };
}

module.exports = {
  checkForValidPath,
  checkMissingField,
  middleware
};

const cresappuse = function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate app.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var fns = flatten(Array.prototype.slice.call(arguments, offset), []);

  if (fns.length === 0) {
    throw new TypeError('app.use() requires a middleware function');
  }

  // setup router
  this.lazyrouter();
  var router = this._router;
  debug('------------------------------------------');
  debug('express');
  debug('------------------------------------------');

  fns.forEach(function(fn) {
    // non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    // restore .app property on req and res
    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function(err) {
        setPrototypeOf(req, orig.request);
        setPrototypeOf(res, orig.response);
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
};
