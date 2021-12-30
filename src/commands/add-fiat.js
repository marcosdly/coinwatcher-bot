'use strict';

module.exports = {
  async execute(message, fiat) {
    await message.reply(`Fiat currency (${fiat}) added to the list.`);
  }
};