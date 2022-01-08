'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class currency_configs extends Model {
    static associate(models) {
      currency_configs.belongsTo(models.guilds, {
        foreignKey:'server_id',
      });
    }
  };
  currency_configs.init({
    server_id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      autoIncrement: false,
      unique: true,
      primaryKey: true
    },
    fiat_to_show: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    default_fiat: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'USD'
    },
    crypto_to_show: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    default_crypto: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'BTC'
    }
  }, {
    sequelize,
    modelName: 'currency_configs',
  });
  return currency_configs;
};