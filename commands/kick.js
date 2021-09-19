const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
  if (!message.member.hasPermission('KICK_MEMBERS')) return message.lineReply('<:danger:888763177909772319> You need `KICK_MEMBERS` permission to use that.')
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReply('<:danger:888763177909772319> I need `KICK_MEMBERS` permission to execute this command.')
  
  let member = message.mentions.members.first()
  if (!member) return message.reply('<:danger:888763177909772319> Please specify a member for me to kick them.')
  let reason = args.slice(1).join(" ");
  if (!reason) return message.channel.send('<:danger:888763177909772319> Please specify a reason.');
  if (!member.kickable) return message.reply('<:error:888763120019972126> This member is not kickable.')
  
  member.kick(reason).catch(err => console.log(err));
  const embed = new Discord.MessageEmbed()
        .setTitle('<:succes:888763150097326090> Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', member)
        .addField('Reason', reason)
        .setFooter(`Kicked by: ${message.author}`)
        .setTimestamp()
        .setColor("GREEN")

        message.channel.send(embed);

       const logembed = new Discord.MessageEmbed()
       .setTitle('Kick Log!')
       .setThumbnail(member.user.displayAvatarURL())
       .addField('Kicked User', member)
       .addField('Kicked by:', message.author)
       .addField('Reason:', reason)
       .setFooter('Kicked Time:', client.user.displayAvatarURL())
       .setTimestamp()
       .setColor("YELLOW")
       
       client.channels.cache.get('888514055038464001').send(logembed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'kick',
  description: 'kick',
  usage: 'kick'
};
