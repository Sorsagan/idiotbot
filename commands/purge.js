const Discord = require("discord.js");
require("discord-inline-reply");
exports.run = function(client, message, args) {
  let toDelete = parseInt(args[0]);
  if (toDelete > 99) {
    message.channel
      .send("<:error:888763120019972126> I can't delete more than 99 text once a time!")
      .then(m => {
        m.delete({ timeout: 5000 });
      });
    return;
  }

  if (!toDelete || toDelete == 0 || toDelete.isNaN) {
    message.channel.send("<:error:888763120019972126> You need to specify a valid number!");
    return;
  }

  message.channel
    .bulkDelete(toDelete + 1)
    .then(r => {
      message.channel.send(`<:succes:888763150097326090> Deleted ${toDelete} messages!`).then(m => {
        m.delete({ timeout: 5000 });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: "purge",
  description: "purge",
  usage: "purge"
};
