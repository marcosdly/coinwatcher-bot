'use strict';

module.exports.name = 'config';

module.exports.secondaryCommands = [
    'add-fiat',
    'del-fiat',
    'set-default-fiat',
    'add-crypto',
    'del-crypto',
    'set-default-crypto',
    'list-valid-fiat',
    'list-valid-crypto'
];

module.exports.arguments = {
  fiatCurrency: {
    validFor: this.secondaryCommands.filter((str) => str.includes('fiat')),
    values: [
      'brl',
      'usd'
    ]
  },
  cryptoCurrency: {
    validFor: this.secondaryCommands.filter((str) => str.includes('crypto')),
    values: [
      'btc',
      'eth'
    ]
  }
};

module.exports.validArguments = [
  ...this.arguments.fiatCurrency.values,
  ...this.arguments.cryptoCurrency.values
];

module.exports.isCurrencyValid = async function (message, currency, type) {
  if (!(type === 'fiat' || type === 'crypto')) {
    console.log('Invalid currency type at commands/config.js:isCurrencyValid()');
    return false;
  }
  
  if (type === 'fiat') {
    if (currency.length !== 3) {
      await message.reply('Fiat must have exactly 3 characters.');
      return false;
    }
    
    if (currency.match(/[0-9]/g)) {
      await message.reply('Fiat must have only letters.');
      return false;
    }
  }

  currency = currency.toLowerCase();
  const config = require('./config');

  if (!config.arguments[`${type}Currency`].values.includes(currency)) {
    await message.reply(`Invalid or unknown ${type}. Check \`cw config list-valid-${type}\``);
    return false;
  }

  return true;
};