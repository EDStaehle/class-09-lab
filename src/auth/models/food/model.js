'use strict';

const foodModel = (sequelize, DataTypes) =>
  sequelize.define('Food', {
    type: { type: DataTypes.STRING, required: true },
    name: { type: DataTypes.STRING, required: true },
    calories: { type: DataTypes.INTEGER, required: true },
  });

module.exports = foodModel;
