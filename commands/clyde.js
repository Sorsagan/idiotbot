const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = async (client, message, args) => {
  if (!args[0]) {
      return message.channel.send("`Usage: =clyde <msg>`");
    }
    let clydeMessage = args.slice(0).join(" ");
    let image = `https://ctk-api.herokuapp.com/clyde/${clydeMessage}` 
    const clyde = new Discord.MessageAttachment(image, "clyde.png");
      message.channel.send(clyde)
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'clyde',
    description: 'clyde',
      usage: 'clyde'
      };
     