const debug = require('debug')('app:mid-js');
const { is } = require('../utils/helpers');

function middleware(options) {
  const { app, rootMiddleWares, path, paths, auth, baseUrl } = options;
  // root middleware
  for (let rm of rootMiddleWares) {
    if (is('array', rm)) {
      app.use(rm[0], rm[1]);
    } else {
      app.use(`${baseUrl}/*`, rm);
    }
  }

  if (auth) {
    const { middleware: authMiddleware, paths: authPaths } = auth;

    // auth middleware
    for (let p of authPaths) {
      app.use(`${baseUrl}${p}`, authMiddleware);
    }

    // app middlewares
  }
}

module.exports = middleware;

// usage
/* 
  const myMiddleware = require('mw');

  myMiddleware({
    rootMiddleWares: [auth, goForth],
    path: '/',
    paths: ['/teapot', '/admin'],
    auth: {
      middleware: 'mw',
      paths: ['']
    }
  });

  myMiddleware({
    auth: {
      middleware: 'mw',
      paths: ['']
    }
  })

  // rootMiddleware => pipes the results of the middlewares(in the array) in each other. 
*/
