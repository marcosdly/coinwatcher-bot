'use strict';

module.exports.name = 'guildCreate';
module.exports.once = false;

module.exports.execute = async function (guild) {
  const db = require('../mysql/sequelize/models/index');
  const models = db.sequelize.models;

  const newGuildsInstance = await models.guilds.create({
    id: String(guild.id),
    name: guild.name
  }, {
    isNewRecord: true,
    benchmark: false,
    logging: false
  }).catch(err => console.log(err));

  const newCurrencyConfigsInstance = await models.currency_configs.create({
    server_id: String(guild.id)
  }, {
    isNewRecord: true,
    benchmark: false,
    logging: false
  }).catch(err => console.log(err));

  const newOperationalConfigsInstance = await models.operational_configs.create({
    server_id: String(guild.id)
  }, {
    isNewRecord: true,
    benchmark: false,
    logging: false
  }).catch(err => console.log(err));

  console.log(`Server ${guild.name} (id: ${guild.id}) successfully added to the database.`);
}