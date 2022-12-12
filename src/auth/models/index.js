'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const usersModel = require('./users');
const dessertsModel = require('./desserts/model');
const foodModel = require('./food/model');
const Collection = require('./data-collection');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory:'
  : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const dessert = dessertsModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);

users.hasMany(food);
food.belongsTo(users);

users.hasMany(dessert);
dessert.belongsTo(users);
module.exports = {
  db: sequelize,
  users,
  food: new Collection(food),
  dessert: new Collection(dessert),
};
