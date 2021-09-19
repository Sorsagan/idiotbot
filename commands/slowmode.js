const Discord = require("discord.js");
require("discord-inline-reply");
exports.run = function(client, message, args) {
  if (!args[0])
    return message.channel.send(
      `<:error:888763120019972126> You did not specify the time in seconds you wish to set this channel's slow mode too!`
    );

  if (isNaN(args[0]))
    return message.channel.send(
      `<:error:888763120019972126> That is not a number!`
    );

  message.channel.setRateLimitPerUser(args[0]);
  message.channel.send(`<:succes:888763150097326090> Set the slowmode of this channel too **${args[0]}**`);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1
};
exports.help = {
  name: "slowmode",
  description: "slowmode",
  usage: "slowmode"
};
