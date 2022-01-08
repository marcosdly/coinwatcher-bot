'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class guilds extends Model {
    static associate(models) {
      guilds.hasOne(models.currency_configs);
      guilds.hasOne(models.operational_configs);
    }
  };
  guilds.init({
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'guilds',
  });
  return guilds;
};