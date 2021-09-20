const Discord = require('discord.js');
require('discord-inline-reply');
const request = require('request');
exports.run = function(client, message, args) {
request("https://aws.random.cat/meow", { method: "get" }, function(
      error,
      response,
      body
    ) {
      if (error) return console.error(error);
      console.log(response.body);
      const cat = new Discord.MessageAttachment(JSON.parse(response.body).file, "cat.png");
      message.channel.send(cat)
    });
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: ['kitten'],
        permLevel: 0
        };
exports.help = {
  name: 'cat',
    description: 'cat',
      usage: 'cat'
      };
      