'use strict';

module.exports.execute = async function (message, fiat) {
  await message.reply(`Fiat currency (${fiat}) added to the list.`);
}