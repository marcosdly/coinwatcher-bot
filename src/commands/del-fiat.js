'use strict';

module.exports.execute = async function (message, fiat) {
  await message.reply(`Fiat currency (${fiat}) removed from the list.`);
}
