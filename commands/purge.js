const Discord = require('discord.js');
require('discord-inline-reply');
exports.run = function(client, message, args) {
let toDelete = parseInt(args[0]);
        if(toDelete > 100) {
            message.channel.send("I can\'t delete more than 100 text once a time!")
            return;
        }

        if(!toDelete || toDelete == 0 || toDelete.isNaN) {
            message.channel.send("You need to specify a valid number!");
            return;
        }

        message.channel.bulkDelete(toDelete+1).then(r => {
            message.channel.send(`Deleted ${toDelete} messages!`).then(m => {
                m.delete({timeout: 5000})
            })
        }).catch(err => {
            console.log(err)
        })

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'purge',
  description: 'purge',
  usage: 'purge'
};
