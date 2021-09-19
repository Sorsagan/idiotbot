const Discord = require('discord.js');
require('discord-inline-reply');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        "You need `BAN_MEMBERS` permission to use that command."
      );
    }
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention the person whose warning you want to reset");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot are not allowed to have warnings");
    }

    if (message.author.id === user.id) {
      return message.channel.send("You are not allowed to delete your warnings");
    }
 if(isNaN(args[1])) {
   return message.reply("You need to write a number.")
 }
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
  if (warnings === 0) {
    return message.channel.send(`You cant have negative warn.`)
  }
  if (args[1].includes('-')) { 
        return message.channel.send(`nice try you idiot.`)
    }
    if (warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} do not have any warnings`);
    }

    db.subtract(`warnings_${message.guild.id}_${user.id}`,  args[1])
    user.send(
      `Your ${args[1]} warning(s) are deleted by ${message.author.username} from ${message.guild.name}`
    );
    await message.channel.send(
      `Deleted ${args[1]} warning(s) of ${message.mentions.users.first().username}`
    );
  };
exports.conf = {
  enabled: true,
    guildOnly: true,
      aliases: [],
        permLevel: 5
        };
exports.help = {
  name: 'delwarn',
    description: 'delwarn',
      usage: 'delwarn'
      };
      