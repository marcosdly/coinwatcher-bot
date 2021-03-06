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
  
  let alrearyExists, crypto_to_show;
  crypto = crypto.toUpperCase();
  
  await models.currency_configs.findByPk(String(message.guildId), {
    attributes: [ 'crypto_to_show' ]
  })
  .then(data => {
    crypto_to_show = data.dataValues.crypto_to_show;
    if (crypto_to_show === null || crypto_to_show === '') {
      alrearyExists = false;
    } else {
      alrearyExists = crypto_to_show.includes(crypto);
    }
  })
  .catch(err => console.log(err));

  if (alrearyExists) {
    message.reply('crypto already in list.');
  } else {
    if (crypto_to_show === null || crypto_to_show === '') {
      crypto_to_show = crypto;
    } else {
      crypto_to_show += `,${crypto}`;
    }

    await models.currency_configs.update({
      crypto_to_show: crypto_to_show
    }, {
      where: { server_id: String(message.guildId) },
      fields: ['crypto_to_show']
    })
    .catch(err => console.log(err));

    await message.reply(`Crypto currency (${crypto}) added to the list.\nCurrently selected cryptos: ${crypto_to_show.split(',').join(', ')}`);
  }
}
