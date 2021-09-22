const Discord = require('discord.js');
require('discord-inline-reply');
const GameCord = require('gamecord-fork').djs
exports.run = async (client, message, args) => {
  new GameCord.SnakeGame(message)
        .setTitle('Snake Game')
        .setColor('WHITE')
        .setTime(60000) // Set time
        .run()
  };
exports.conf = {
  enabled: true,
    guildOnly: false,
      aliases: [],
        permLevel: 0
        };
exports.help = {
  name: 'snake',
    description: 'snake',
      usage: 'snake'
      };
     