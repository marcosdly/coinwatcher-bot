'use strict';

module.exports = async function (message, crypto) {
  await message.reply(`Crypto currency (${crypto}) added to the list.`);
}
