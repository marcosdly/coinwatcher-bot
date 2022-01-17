'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('operational_configs', {
      type: 'FOREIGN KEY',
      fields: ['server_id'],
      name: 'operational_configs-server_id-fkey',
      references: {
        table: 'guilds',
        field: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'operational_configs', // table
      'operational_configs-server_id-fkey' // constraint name
    );
  }
};
