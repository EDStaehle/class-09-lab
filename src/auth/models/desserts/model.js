'use strict';

const dessertsModel = (sequelize, DataTypes) =>
  sequelize.define('Dessert', {
    type: { type: DataTypes.STRING, required: true },
    flavor: { type: DataTypes.STRING, required: true },
    occasion: { type: DataTypes.STRING, required: true },
  });

module.exports = dessertsModel;
