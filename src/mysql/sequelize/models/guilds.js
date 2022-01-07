'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class guilds extends Model {
    static associate(models) {
      models.guilds.hasOne(models.currency_configs);
      models.guilds.hasOne(models.operational_configs);
    }
  };
  guild.init({
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
    modelName: 'guild',
  });
  return guild;
};