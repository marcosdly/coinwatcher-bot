'use strict';

module.exports = {
  async execute(message, crypto) {
    await message.reply(`Crypto currency (${crypto}) removed from the list.`);
  }
};