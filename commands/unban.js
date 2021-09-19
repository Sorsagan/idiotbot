const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = async (client, message, args) => {
  const permembed = new Discord.MessageEmbed()
  .setDescription("<:danger:888763177909772319> You need `BAN_MEMBERS` permission to use that command.")
  .setColor("RED")
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(permembed)
    let user = args[0];
    const banList = await message.guild.fetchBans();
  if (!user) {
    const idembed = new Discord.MessageEmbed()
    .setDescription("<:error:888763120019972126> You have to write the id of the person you want to unban.")
    .setColor("RED")
    return message.channel.send(idembed)
  }
    if (!user || isNaN(user) || !banList.has(user)) {
      const embed1 = new Discord.MessageEmbed()
      .setDescription(`<:error:888763120019972126> This user isn\'t banned or invalid id!`)
      .setColor("RED")
        return message.channel.send(embed1)
    }
  const unbanembed = new Discord.MessageEmbed()
  .setDescription("<:succes:888763150097326090> Player successfully unbanned.")
  .setColor("GREEN")
    message.guild.members.unban(user);
    message.channel.send(unbanembed)
};
exports.conf = {
  enabled: true,
    guildOnly: true,
      aliases: [],
        permLevel: 5
        };
exports.help = {
  name: 'unban',
    description: 'unban',
      usage: 'unban'
      };
      