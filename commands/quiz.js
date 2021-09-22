const Discord = require('discord.js');
require('discord-inline-reply');
const GameCord = require('gamecord-fork').djs
exports.run = async (client, message, args) => {
  new GameCord.Quiz(message)
        .setTitle('Quiz')
        .setColor('WHITE')
        .setTime(20000) // Set time
        .run()
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'quiz',
    description: 'quiz',
      usage: 'quiz'
      };
     