'use strict';

module.exports.execute = async function (message, fiat) {
  await message.reply(`Default fiat currency (${fiat}) selected.`);
}