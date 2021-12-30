'use strict';

module.exports = {
  name: 'ping',
  secondaryCommands: false,
  validArguments: 'not needed',
  async execute(message, placeholder) {
    await message.reply('Pong!');
  }
};