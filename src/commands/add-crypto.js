'use strict';

module.exports = {
  async execute(message, crypto) {
    await message.reply(`Crypto currency (${crypto}) added to the list.`);
  }
};