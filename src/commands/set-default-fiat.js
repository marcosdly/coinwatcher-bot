'use strict';

const config = require('./config');
module.exports.validArguments = [
  ...config.arguments.fiatCurrency.values
];

module.exports.execute = async function (message, fiat) {
  const { isCurrencyValid } = require('./config');
  if (!isCurrencyValid(message, fiat, 'fiat')) return;

  const db = require('../mysql/sequelize/models/index');
  const models = db.sequelize.models;
  
  let alrearyExists, default_fiat;
  fiat = fiat.toUpperCase();
  
  await models.currency_configs.findByPk(String(message.guildId), {
    attributes: [ 'default_fiat' ]
  })
  .then(data => {
    default_fiat = data.dataValues.default_fiat;
    if (default_fiat === null) {
      alrearyExists = false;
    } else {
      alrearyExists = default_fiat.includes(fiat);
    }
  })
  .catch(err => console.log(err));

  if (alrearyExists) {
    message.reply(`${fiat} already is the default.`);
  } else {
    await models.currency_configs.update({
      default_fiat: fiat
    }, {
      where: { server_id: String(message.guildId) },
      fields: ['default_fiat']
    })
    .catch(err => console.log(err));

    await message.reply(`${fiat} successfully selected as default.`);
  }
}