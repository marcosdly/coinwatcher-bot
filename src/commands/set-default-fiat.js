'use strict';

module.exports = {
  async execute(message, fiat) {
    await message.reply(`Default fiat currency (${fiat}) selected.`);
  }
};