const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) {
      message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
      message.channel.send("<:lock:888769802036989983> Locked the channel!");
    } else {
      message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: null,
      });
      message.channel.send("<:unlock:888769835939532820> Unlocked the channel!");
    }
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: [],
        permLevel: 3
        };
exports.help = {
  name: 'lock',
    description: 'lock',
      usage: 'lock'
      };
      