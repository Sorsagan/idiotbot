const Discord = require('discord.js');
require('discord-inline-reply');
const db = require('quick.db')
exports.run = function(client, message, args) {
  const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

    message.channel.send(`${user} have **${warnings}** warning(s).`);
}
exports.conf = {
  enabled: true,
    guildOnly: true,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'warning',
    description: 'warning',
      usage: 'warning'
      };
      