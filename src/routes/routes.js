'use strict';

const express = require('express');
const dataModules = require('../auth/models/index');
const router = express.Router();
const authRouter = express.Router();
const { users, food, dessert } = require('../auth/models');
const basicAuth = require('../auth/middleware/basic');
const bearerAuth = require('../auth/middleware/bearer');
const permissions = require('../auth/middleware/acl');

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});
authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});
authRouter.post('/signin', basicAuth, (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});
authRouter.get('/users', bearerAuth, permissions('read'), async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});
authRouter.get('/users/:id', bearerAuth, permissions('read'), async (req, res, next) => {
  let id = req.params.id;
  const singleUser = await users.findOne({where:{id}});
  res.status(200).json(singleUser);
});
authRouter.delete('/users/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  let id = req.params.id;
  await users.destroy({where:{id}});
  res.sendStatus(200);
});
authRouter.put('/users/:id', bearerAuth, permissions('update'), async (req, res, next) => {
  let id = req.params.id;
  const userRecordUpdated = await users.findOne({where:{id}});
  res.status(200).send('updated');
});
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});


authRouter.get('/userswithfood/:id',async (req, res, next) => {
  try {
    const id = req.params.id;
    const userswithfood = await users.findOne({where:{id}, include: food.model})
    res.status(200).send(userswithfood);

  } catch (e) {
    next(e);
  }
})
authRouter.get('/userswithdessert/:id',async (req, res, next) => {
  try {
    const id = req.params.id;
    const userswithdessert = await users.findOne({where:{id}, include: dessert.model})
    res.status(200).send(userswithdessert);

  } catch (e) {
    next(e);
  }
})





router.get('/:model',bearerAuth,permissions('read'), handleGetAll);
router.get('/:model/:id',bearerAuth,permissions('read'), handleGetOne);
router.post('/:model',bearerAuth,permissions('create'), handleCreate);
router.put('/:model/:id',bearerAuth,permissions('update'), handleUpdate);
router.delete('/:model/:id',bearerAuth,permissions('delete'), handleDelete);
async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}
async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}
async function handleCreate(req, res) {
  let obj = req.body;
  let id = req.user.id;

  let newRecord =  req.model === food? await req.model.createFood(obj, id):  await req.model.createDessert(obj, id)
  res.status(201).json(newRecord);


}
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}
module.exports = {
  router,
  authRouter,
};
