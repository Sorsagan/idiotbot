const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.lineReply('<:danger:888763177909772319> You need `BAN_MEMBERS` permission to use that command.')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply('<:danger:888763177909772319> I need `BAN_MEMBERS` permission to execute this command.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Please specify a user.');

        if(!member) return message.channel.send('<:danger:888763177909772319> Can\'t find player');
        if(!member.bannable) return message.channel.send('<:danger:888763177909772319> Mentioned user is an admin or have higher role than me.');

        if(member.id === message.author.id) return message.channel.send('<:error:888763120019972126> Bruh, you can\'t ban yourself!');

        let reason = args.slice(1).join(" ");

        if(!reason) return message.channel.send('<:danger:888763177909772319> Please specify a reason.');

        member.ban({ days: 7, reason: `${reason}` }).catch(err => { 
          message.channel.send('<:error:888763120019972126> Something went wrong!')
            console.log(err)
        })

        const embed = new Discord.MessageEmbed()
        .setTitle('<:succes:888763150097326090> Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Reason', reason)
        .setFooter(`Banned by: ${message.author}`)
        .setTimestamp()
        .setColor("GREEN")

        message.channel.send(embed);

       const logembed = new Discord.MessageEmbed()
       .setTitle('Ban Log!')
       .setThumbnail(member.user.displayAvatarURL())
       .addField('Banned User', member)
       .addField('Banned by:', message.author)
       .addField('Reason:', reason)
       .setFooter('Banned Time:', client.user.displayAvatarURL())
       .setTimestamp()
       .setColor("RED")
       
       client.channels.cache.get('888514055038464001').send(logembed)
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'ban',
  description: 'ban',
  usage: 'ban'
};
