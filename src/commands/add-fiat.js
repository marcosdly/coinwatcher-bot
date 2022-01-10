'use strict';

module.exports.execute = async function (message, fiat) {
  const db = require('../mysql/sequelize/models/index');
  const models = db.sequelize.models;
  
  let alrearyExists, fiat_to_show;
  
  await models.currency_configs.findByPk(String(message.guildId), {
    attributes: [ 'fiat_to_show' ]
  })
  .then(data => {
    fiat_to_show = data.dataValues.fiat_to_show;
    if (fiat_to_show === null) {
      alrearyExists = false;
    } else {
      alrearyExists = fiat_to_show.includes(fiat);
    }
  })
  .catch(err => console.log(err));

  if (alrearyExists) {
    message.reply('Fiat already in list.');
  } else {
    if (fiat_to_show === null) {
      fiat_to_show = fiat;
    } else {
      fiat_to_show += `,${fiat}`;
    }

    await models.currency_configs.update({
      fiat_to_show: fiat_to_show
    }, {
      where: { server_id: String(message.guildId) },
      fields: ['fiat_to_show']
    })
    .catch(err => console.log(err));

    await message.reply(`Fiat currency (${fiat}) added to the list.\nCurrently selected fiats: ${fiat_to_show.split(',').join(', ')}`);
  }
}