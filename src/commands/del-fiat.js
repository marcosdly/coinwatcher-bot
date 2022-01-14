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

  let isInList, fiat_to_show;
  fiat = fiat.toUpperCase();

  await models.currency_configs.findByPk(String(message.guildId), {
    attributes: [ 'fiat_to_show' ]
  })
  .then(data => {
    fiat_to_show = data.dataValues.fiat_to_show;
    if (fiat_to_show === null) {
      isInList = false;
    } else {
      isInList = fiat_to_show.includes(fiat);
    }
  })
  .catch(err => console.log(err));

  if (isInList) {
    const fiatList = fiat_to_show.split(',');
    fiatList.splice(fiatList.indexOf(fiat), 1);
    fiat_to_show = fiatList.join(',');
    
    await models.currency_configs.update({
      fiat_to_show: fiat_to_show
    }, {
      where: { server_id: String(message.guildId) },
      fields: ['fiat_to_show']
    })
    .catch(err => console.log(err));
  
    await message.reply(`Fiat currency (${fiat}) removed from the list.\nCurrently selected fiats: ${fiat_to_show === null || fiat_to_show === '' ? 'None' : fiat_to_show.split(',').join(', ')}`);
  } else {
    await message.reply(`Fiat ${fiat} isn't in the list.`);
    return;
  }

}