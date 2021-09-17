const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Please specify a user.');

        if(!member) return message.channel.send('Can\'t find player');
        if(!member.bannable) return message.channel.send('Mentioned user is an admin or have higher role than me.');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!');

        let reason = args.slice(1).join(" ");

        if(!reason) return message.channel.send('Please specify a reason');

        member.ban({ days: 7, reason: `${reason}` }).catch(err => { 
          message.channel.send('Something went wrong')
            console.log(err)
        })

        const embed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Reason', reason)
        .setFooter(`Banned by: ${message.author}`)
        .setTimestamp()
        .setColor("RANDOM")

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
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'ban',
  usage: 'ban'
};
