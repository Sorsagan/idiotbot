const Discord = require("discord.js");
require("discord-inline-reply");
exports.run = function(client, message, args) {
  const embed = new Discord.MessageEmbed()
    .setTitle("<:guide:889582257663258646> Help Command")
    .addFields(
      {
        name: "<:moderation:889583704899473479> Moderation",
        value:
          "ban, unban, mute, unmute, kick, warn, warning, delwarn, lock, purge, slowmode",
        inline: true
      },
      {
        name: "<:integration:889583660116877313> Level",
        value: "level",
        inline: true
      },
      {
        name: "<:slashcommand:889585804379324437> Fun",
        value: "anime, dog, cat, meme, clyde",
        inline: true
      },
      {
        name: "<:flyrocket:890230759036686366> Games",
        value: "snake, guess, quiz",
        inline: true
      }
    )
  .setFooter(`Fun Fact: My prefix is i!`)
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "help",
  description: "help",
  usage: "help"
};
