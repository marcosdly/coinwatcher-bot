'use strict';

module.exports = {
  isCommand(commandName, logMessage) {
    const {accessSync, constants} = require('fs');
    const commandFile = `${__dirname}/commands/${commandName}.js`;

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
  },

  
}