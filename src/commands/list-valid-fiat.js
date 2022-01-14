'use strict';

module.exports.validArguments = 'not needed';

module.exports.execute = async function (message, placeholder) {
  const config = require('./config');
  await message.reply(`Valid fiat currencies for sub-commands of **config**: ${config.arguments.fiatCurrency.values.map(x => x.toUpperCase()).join(', ')}.`)
};