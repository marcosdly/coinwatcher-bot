// Sequelize's configuration

const { mysql } = require('../../config.json');

module.exports = {
  use_env_variable: false,
  
  username: mysql.user,
  password: mysql.password,
  database: mysql.database,
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql',
  
  logging: console.log,
  benchmark: true
}