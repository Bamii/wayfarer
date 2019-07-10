const UserRouter = require('express').Router();

UserRouter.get('/', (req, res) => {
  res.send({ status: 'okay', data: 'trip' });
});

UserRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send({ status: 'okay', data: `you requested for user ${id}` });
});

module.exports = UserRouter;
