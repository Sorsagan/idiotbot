const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const background = [
  "https://i.ibb.co/gRQGnpG/1.png",
  "https://i.ibb.co/DYLJ5GT/2.png",
  "https://i.ibb.co/42kW0pL/3.png",
  "https://i.ibb.co/WpF2kvC/4.png",
  "https://i.ibb.co/6ZgxHVQ/5.png",
  "https://i.ibb.co/tJzLZNn/6.png"
  ]
 exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

  let level = client.db.get(`level_${user.id}`) || 1;
  let cexp = client.db.get(`exp_${user.id}`) || 0;
  const target = 5 * Math.pow(level, 2) + (50 * level) + 100;

  let everyone = client.db.all().filter(i => i.ID.startsWith("exp_")).sort((a, b) => b.data - a.data);
  let rank = everyone.map(x => x.ID).indexOf(`exp_${user.id}`) + 1;


  const card = new canvacord.Rank()          
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setRank(rank)
    .setLevel(level)
    .setCurrentXP(cexp)
    .setRequiredXP(target-cexp)
    .setStatus(user.presence.status)
    .setAvatar(user.displayAvatarURL({ format: "png", size: 1024 }))
   .setBackground("IMAGE", background[Math.floor(Math.random() * 4)],);

  const img = await card.build();
  
  return message.channel.send(new MessageAttachment(img, "level.png"));
};

exports.conf = {
  aliases: [],
  guildOnly: true,
  enabled: true,
  permLevel: 0
};

module.exports.help = {
  name: "level",
  usage: "level",
  description: "level"
};
