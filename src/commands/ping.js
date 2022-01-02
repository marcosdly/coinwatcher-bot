'use strict';

module.exports.name = 'ping';
module.exports.secondaryCommands = false;
module.exports.validArguments = 'not needed';

module.exports.execute = async function (message, placeholder) {
  await message.reply('Pong!');
}