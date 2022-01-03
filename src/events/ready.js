'use strict';

module.exports.name = 'ready';
module.exports.once = true;

module.exports.execute = async function (client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
}
