'use strict';

module.exports = async function (message, crypto) {
  await message.reply(`Crypto currency (${crypto}) removed from the list.`);
}