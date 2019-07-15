const { buildResponse } = require('../utils/helpers');
const debug = require('debug')('app:middlewares');

// TODO::
function checkForValidPath(paths) {
  return function(req, res, next) {
    debug(req.url);
    const single = req.url.length === 1 && req.url === '/';
    const url = single ? '/' : req.url.split('/').pop();

    debug(req.url.split('/').pop());
    if (paths.find(e => e === url)) {
      debug('nxt');
      next();
    } else {
      debug('bck');
      res
        .status(404)
        .send(buildResponse('error', 'This endpoint does not exist! Please refer to the docs.'));
    }
  };
}

module.exports = {
  checkForValidPath
};
