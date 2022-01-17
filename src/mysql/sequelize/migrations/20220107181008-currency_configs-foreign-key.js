'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('currency_configs', {
      type: 'FOREIGN KEY',
      fields: ['server_id'],
      name: 'currency_configs-server_id-fkey',
      references: {
        table: 'guilds',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'currency_configs', // table
      'currency_configs-server_id-fkey' // constraint name
    );
  }
};
