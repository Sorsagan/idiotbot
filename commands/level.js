const db = require('quick.db')
const { getInfo } = require("../xp.js")
const canvacord = require("canvacord");
const Discord = require("discord.js");
const background = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbffNMl_lDavVi5YWvzGYNUpiO2huKd_Aamg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZCtuvqAKiUxgkUoJ6WY9Rj5fVnA0kPzCTCw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUK9Qk_-xGwv-QZIXz2L-CZ1VIcJ-5yDkcuA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0lmyo47lvtXIscNlOATWJdX4WAwYOJfAtA&usqp=CAU"
  ]
  exports.run = function(client, message, args) {
    const user = message.mentions.users.first() || message.author;
    
    if(user.id === client.user.id) { //IF BOT
      return message.channel.send("😉 | I am on level 100.")
    }
    
    if(user.bot) {
      return message.channel.send("Bot do not have levels.")
    }
    
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    
    const {level, remxp, levelxp} = getInfo(xp);
    
const rank = new canvacord.Rank()
    .setAvatar(user.displayAvatarURL({dynamic: false,  format: 'png'}))
    .setCurrentXP(remxp)
    .setRequiredXP(levelxp)
    .setLevel(level)
    .setStatus(user.presence.status)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(1, "a", false)
    .setBackground("IMAGE", background[Math.floor(Math.random() * 4)],);

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "level.png");
        message.channel.send(attachment);
    });   
    
    
    
    
  }
exports.conf = {
  enabled: true,
    guildOnly: true,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'level',
    description: 'Botun pingini gĂ¶sterir.',
      usage: 'ping'
      };