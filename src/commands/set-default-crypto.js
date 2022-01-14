'use strict';

const config = require('./config');
module.exports.validArguments = [
  ...config.arguments.cryptoCurrency.values
];

module.exports.execute = async function (message, crypto) {
  const { isCurrencyValid } = require('./config');
  if (!isCurrencyValid(message, crypto, 'crypto')) return;

  const db = require('../mysql/sequelize/models/index');
  const models = db.sequelize.models;
  
  let alrearyExists, default_crypto;
  crypto = crypto.toUpperCase();
  
  await models.currency_configs.findByPk(String(message.guildId), {
    attributes: [ 'default_crypto' ]
  })
  .then(data => {
    default_crypto = data.dataValues.default_crypto;
    if (default_crypto === null) {
      alrearyExists = false;
    } else {
      alrearyExists = default_crypto.includes(crypto);
    }
  })
  .catch(err => console.log(err));

  if (alrearyExists) {
    message.reply(`${crypto} already is the default.`);
  } else {
    await models.currency_configs.update({
      default_crypto: crypto
    }, {
      where: { server_id: String(message.guildId) },
      fields: ['default_crypto']
    })
    .catch(err => console.log(err));

    await message.reply(`${crypto} successfully selected as default.`);
  }
}