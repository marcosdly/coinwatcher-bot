'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class operational_configs extends Model {
    static associate(models) {
      models.operational_configs.belongsTo(models.guilds, {
        foreignKey: 'server_id'
      });
    }
  };
  operational_configs.init({
    server_id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
      autoIncrement: false,
      primaryKey: true
    },
    channel_to_message_id: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    master_role_id: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'operational_configs',
  });
  return operational_configs;
};