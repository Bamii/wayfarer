const { buildResponse } = require('../utils/helpers');
const debug = require('debug')('app:middlewares');
// middleware to catch all the unspecified routes.
function checkForValidPath(paths) {
  return function(req, res, next) {
    debug(req.url);
    const single = req.url.length === 1 && req.url === '/';
    const url = single ? '/' : req.url.split('/').pop();

    if (paths.find(e => e === url)) {
      next();
    } else {
      res
        .status(404)
        .send(buildResponse('error', 'This endpoint does not exist! Please refer to the docs.'));
    }
  };
}

module.exports = {
  checkForValidPath
};
