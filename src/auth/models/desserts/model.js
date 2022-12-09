'use strict';

const foodModel = (sequelize, DataTypes) =>
  sequelize.define('Food', {
    type: { type: DataTypes.STRING, required: true },
    flavor: { type: DataTypes.STRING, required: true },
    occasion: { type: DataTypes.STRING, required: true },
  });

module.exports = foodModel;
