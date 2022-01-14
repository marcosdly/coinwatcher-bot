'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('currency_configs', {
      server_id: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: false,
        autoIncrement: false,
        unique: true,
        primaryKey: true
      },
      fiat_to_show: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      default_fiat: {
        type: Sequelize.DataTypes.STRING(3),
        allowNull: false,
        defaultValue: 'USD'
      },
      crypto_to_show: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },
      default_crypto: {
        type: Sequelize.DataTypes.STRING(16),
        allowNull: false,
        defaultValue: 'BTC'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('currency_configs');
  }
};