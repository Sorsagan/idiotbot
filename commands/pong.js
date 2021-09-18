const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
  message.lineReply('Pong! **' + client.ws.ping + '** ms');
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'ping',
    description: 'Botun pingini gĂ¶sterir.',
      usage: 'ping'
      };
      