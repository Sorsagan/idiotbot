const Discord = require('discord.js');
require('discord-inline-reply');
const request = require('request');
exports.run = function(client, message, args) {
request("https://api.waifu.pics/sfw/waifu", { method: "get" }, function(
      error,
      response,
      body
    ) {
      if (error) return console.error(error);
      console.log(response.body);
      const anime = new Discord.MessageAttachment(JSON.parse(response.body).url, "waifu.png");
      message.channel.send(anime)
    });
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: ['waifu'],
        permLevel: 0
        };
exports.help = {
  name: 'anime',
    description: 'anime',
      usage: 'anime'
      };
      