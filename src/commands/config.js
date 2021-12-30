'use strict';

module.exports.name = 'config';
module.exports.secondaryCommands = [
    'add-fiat',
    'del-fiat',
    'set-default-fiat',
    'add-crypto',
    'del-crypto'
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