const Discord = require('discord.js');
require('discord-inline-reply');
const request = require('request');
exports.run = function(client, message, args) {
request("https://random.dog/woof.json", { method: "get" }, function(
      error,
      response,
      body
    ) {
      if (error) return console.error(error);
      console.log(response.body);
      const dog = new Discord.MessageAttachment(JSON.parse(response.body).url, "dog.png");
      message.channel.send(dog)
    });
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: ['puppy'],
        permLevel: 0
        };
exports.help = {
  name: 'dog',
    description: 'dog',
      usage: 'dog'
      };
      