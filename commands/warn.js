const Discord = require("discord.js");
require("discord-inline-reply");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const permembed = new Discord.MessageEmbed()
      .setDescription(
        "<:danger:888763177909772319> You need `BAN_MEMBERS` permission to use that command."
      )
      .setColor("RED");
    return message.channel.send(permembed);
  }

  const user = message.mentions.members.first();

  if (!user) {
    const mentionembed = new Discord.MessageEmbed()
      .setDescription(
        "<:error:888763120019972126> You have to mention the person you want to unban."
      )
      .setColor("RED");
    return message.channel.send(mentionembed);
  }

  if (message.mentions.users.first().bot) {
    return message.channel.send("You can not warn bots.");
  }

  if (message.author.id === user.id) {
    return message.channel.send("You can not warn yourself.");
  }

  if (user.id === message.guild.owner.id) {
    return message.channel.send("You cant warn the server owner -_-");
  }

  const reason = args.slice(1).join(" ");

  if (!reason) {
    const reasonembed = new Discord.MessageEmbed()
      .setDescription(
        "<:error:888763120019972126> Please provide reason to warn."
      )
      .setColor("RED");
    return message.channel.send(reasonembed);
  }
  const embed = new Discord.MessageEmbed()
    .setTitle("<:succes:888763150097326090> Member Warned")
    .setThumbnail(user.user.displayAvatarURL())
    .addField("User Warned", user)
    .addField("Reason", reason)
    .setFooter(`Warned by: ${message.author}`)
    .setTimestamp()
    .setColor("GREEN");
  const logembed = new Discord.MessageEmbed()
    .setTitle("Warn Log!")
    .setThumbnail(user.user.displayAvatarURL())
    .addField("Warned User", user)
    .addField("Warned by:", message.author)
    .addField("Reason:", reason)
    .setFooter("Warned Time:", client.user.displayAvatarURL())
    .setTimestamp()
    .setColor("RED");
  let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

  if (warnings === null) {
    db.set(`warnings_${message.guild.id}_${user.id}`, 1);
    user.send(
      `You have been warned in **${message.guild.name}** for ${reason}`
    );
    await message.channel.send(embed);
    client.channels.cache.get("888514055038464001").send(logembed);
  } else if (warnings !== null) {
    db.add(`warnings_${message.guild.id}_${user.id}`, 1);

    user.send(
      `You have been warned in **${message.guild.name}** for ${reason}`
    );

    await message.channel.send(embed);
    client.channels.cache.get("888514055038464001").send(logembed);

    message.delete;
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};
exports.help = {
  name: "warn",
  description: "warn",
  usage: "warn"
};
