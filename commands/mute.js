const Discord = require("discord.js");
require("discord-inline-reply");
const ms = require("ms");
exports.run = function(client, message, args) {
  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  var role = user.guild.roles.cache.find(role => role.name == "Muted");
  let reason = args.slice(2).join(" ");
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.lineReply(
      "<:danger:888763177909772319> You need `KICK_MEMBERS` permission to use that command."
    );
  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.lineReply(
      "<:danger:888763177909772319> I need `KICK_MEMBERS` permission to execute this command."
    );

  if (!reason)
    return message.channel.send(
      "<:danger:888763177909772319> Please specify a reason."
    );

  if (!user) {
    return message.channel.send(
      "<:danger:888763177909772319> You need to mention the player you want to mute."
    );
  }
  if (!args[1]) {
    return message.channel.send(
      "<:danger:888763177909772319> You need to specify how long to mute the use."
    );
  }
  if (args[1].includes("-")) {
    return message.channel.send("<:error:888763120019972126> Nice try you idiot.");
  }
  const embed = new Discord.MessageEmbed()
    .setTitle("<:succes:888763150097326090> Member Muted")
    .setThumbnail(user.user.displayAvatarURL())
    .addField("Muted User", user)
    .addField("Reason", reason)
    .setFooter(`Muted by: ${message.author}`)
    .setTimestamp()
    .setColor("GREEN");

  message.channel.send(embed);

  const logembed = new Discord.MessageEmbed()
    .setTitle("Mute Log!")
    .setThumbnail(user.user.displayAvatarURL())
    .addField("Muted User", user)
    .addField("Muted by:", message.author)
    .addField("Reason:", reason)
    .setFooter("Muted Time:", client.user.displayAvatarURL())
    .setTimestamp()
    .setColor("RED");

  client.channels.cache.get("888514055038464001").send(logembed);

  user.roles.add(role);

  setTimeout(() => {
    user.roles.remove(role);
  }, ms(args[1]));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: "mute",
  description: "mute",
  usage: "mute"
};
