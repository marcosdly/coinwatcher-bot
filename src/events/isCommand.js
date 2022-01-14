'use strict';

module.exports.name = 'messageCreate';
module.exports.once = false;

module.exports.isCommand = function (commandName, logMessage) {
  const {accessSync, constants} = require('fs');
  const commandFile = `${__dirname}/../commands/${commandName}.js`;

  try {
    accessSync(commandFile, constants.F_OK);
  } catch (Error) {
    if (logMessage)
      console.log('File unavailable. Couldn\'t get command data.');
    return false;
  }
  if (logMessage)
    console.log(`File available. Getting command data from src/commands/${commandName}.js`);
  return commandFile;
}

module.exports.execute = async function (message) {
  // Check if it's a command
  if (!message.toString().startsWith('cw ')) return;

  const messageArr = message.toString().split(' ');
  const prefix = messageArr[0]; // In case I ever need it
  const commandName = messageArr[1];
  const commandArgument = messageArr[2];
  const subCommandName = messageArr[2];
  const subCommandArgument = messageArr[3];

  // Check if the syntax is generally valid
  if (messageArr.length > 4) {
    await message.reply('Too much text to be a valid command.');
    return;
  }
  if (!this.isCommand(commandName, false)) {
    await message.reply(`${commandName} is not a command.`);
    return;
  }

  const command = require(this.isCommand(commandName, false));

  // Check if the command have sub-commands
  if (!command.secondaryCommands) {
    const command = require(this.isCommand(commandName, true));

    // Check if that are pre-setted arguments;
    // If that are, then checks if it's valid.
    if (command.validArguments !== 'not needed') {
      if (!(command.validArguments.includes(commandArgument))) {
        await message.reply(`**${commandArgument}** is not a valid argument for **${commandName}**.`);
        console.log(`\'${commandArgument}\' is not a valid argument for \'${commandName}\'.`);
        return;
      }
    } else {
      console.log('No pre-setted arguments found.');
    }

    // Try run the command, otherwise log the error
    try {
      console.log('Running command...');
      await command.execute(message, commandArgument);
      console.log('Command executed successfully!');
    } catch (error) {
      console.error(error);
      await message.reply('There was an error while executing this command!');
    }
  } else {
    let command = require(this.isCommand(commandName, true));
    let subCommand = require(this.isCommand(subCommandName, true));

    // Check if sub-command is valid
    if (!(command.secondaryCommands.includes(subCommandName))) {
      await message.reply(`**${subCommandName}** is not a valid sub-command for **${commandName}**.`);
      console.log(`\'${subCommandName}\' is not a valid sub-command for \'${commandName}\'.`);
      return;
    }

    // Check if that are pre-setted arguments;
    // If that are, then checks if it's valid.
    if (subCommand.validArguments !== 'not needed') {
      if (!subCommand.validArguments.includes(subCommandArgument)) {
        await message.reply(`**${subCommandArgument}** is not a valid argument for **${subCommandName}**.`);
        console.log(`\'${subCommandArgument}\' is not a valid argument for \'${subCommandName}\'.`);
        return;
      }
    } else {
      console.log('No pre-setted arguments found.');
    }

    // Finally, try run the command, otherwise log the error
    try {
      console.log('Running command...');
      await subCommand.execute(message, subCommandArgument);
      console.log('Command executed successfully!');
    } catch (error) {
      console.error(error);
      await message.reply('There was an error while executing this command!');
    }
  }
}

