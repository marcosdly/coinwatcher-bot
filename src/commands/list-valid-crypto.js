'use strict';

module.exports.validArguments = 'not needed';

module.exports.execute = async function (message, placeholder) {
  const config = require('./config');
  await message.reply(`Valid crypto currencies for sub-commands of **config**: ${config.arguments.cryptoCurrency.values.map(x => x.toUpperCase()).join(', ')}.`)
};