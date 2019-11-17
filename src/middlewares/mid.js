const debug = require('debug')('mid-js');

function middleware(options) {
  const { rootMiddleWares, path, paths, auth } = options;
  return function(req, res, next) {
    debug(auth);
    debug(req.originalUrl);
    // if (auth) {
    const { middleware, paths } = auth;
    const urlPath = paths || path;

    // find req.url
    // rootMiddleWares.forEach(mw => req.url && app.use(mw));

    // auth middleware.
    paths.forEach(p => debug(p));
    // authPaths.forEach(p => req.url === p && app.use(authMiddleware));
    next();
    // }
  };
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
