'use strict';

const {srcPath} = require('../globalVariables.js');
const {access, constants} = require('fs');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Checks if the interaction is a command, and if it is, execute it.
    if (!interaction.isCommand()) return;
  
    const commandFile = `${srcPath}/commands/${interaction.commandName}.js`;

    // Check if the file for the command exists. If it doesn't then cancel the event.
    if (access(commandFile,
      constants.F_OK,
      (err) => {
        err
        ? console.log('File unavailable. Couldn\'t get command data.')
        : console.log(`File available. Getting command data from ${commandFile}.`);
      }) === null) {

      return;

    }
  
    const command = require(commandFile);

    try {
      await command.execute(interaction);
      console.log('Command executed successfully!');
    } catch (error) {
      console.error(error);
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
  }
};