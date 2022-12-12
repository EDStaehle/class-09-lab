'use strict';

const userModel = require('../users')

const foodModel = (sequelize, DataTypes) =>
  sequelize.define('Eatings', {
    type: { type: DataTypes.STRING, required: true },
    name: { type: DataTypes.STRING, required: true },
    calories: { type: DataTypes.INTEGER, required: true },
   
  });

module.exports = foodModel;
