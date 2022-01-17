'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('operational_configs', {
      server_id: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        autoIncrement: false,
        primaryKey: true
      },
      channel_to_message_id: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull: true
      },
      master_role_id: {
        type: Sequelize.DataTypes.STRING(25),
        allowNull:true
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
    await queryInterface.dropTable('operational_configs');
  }
};