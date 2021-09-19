const Discord = require("discord.js");
require("discord-inline-reply");
exports.run = function(client, message, args) {
  const user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  var role = user.guild.roles.cache.find(role => role.name == "Muted");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.lineReply('<:danger:888763177909772319> You need `KICK_MEMBERS` permission to use that command.')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReply('<:danger:888763177909772319> I need `KICK_MEMBERS` permission to execute this command.')

  if (!user) {
    return message.channel.send("<:danger:888763177909772319> You need to mention a user.");
  }
  if (user.roles.cache.has(role)) {
    message.channel.send(`<:succes:888763150097326090> ${user} is unmuted!`);
    user.roles.remove(role);
  } else {
    message.channel.send(`<:error:888763120019972126> This user isn\'t muted.`);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: "unmute",
  description: "unmute",
  usage: "unmute"
};