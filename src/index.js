'use strict';

const { token } = require('./config.json');
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// >> LOADS THE EVENTS
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// >> CATALOGS THE COMMANDS
// Iterate through the commands folder and add them to the commands collection (object)
client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // Set a new item in the Collection with the key as
  // the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Login to dicord with your client's token
client.login(token);