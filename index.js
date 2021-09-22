const Discord = require("discord.js");
const client = new Discord.Client();
const db = require('quick.db')
const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;
client.conf = {
  token: `${process.env.token}`,
  pref: "i!",
  own: "idniz",
  oynuyor: `im just an idiot`,
  durum: "dnd" // durumu
};
client.cooldown = new Discord.Collection();
client.config = {
cooldown: 1 * 1000
}
client.db = require("quick.db");
client.on("message", async (message) => {
  let client = message.client;
  if (!message.guild || message.author.bot) return;
  const info = {
    xp: db.get(`exp_${message.author.id}`) || 0,
    level: db.get(`level_${message.author.id}`) || 1,
    target: 5 * Math.pow(this.level, 2) + (50 * this.level) + 100,
    channel: client.channels.cache.get(db.get(`svlog_${message.guild.id}`) || "-1"),
    cooldown: client.cooldown.get(`${message.author.id}`) || 0
  };
  if (Date.now() - info.cooldown > client.config.cooldown) {
    info.xp++;
    if(info.xp >= info.target) {
      info.xp-= info.target;
      info.level++;
      if(info.channel && info.channel.type === "text") {
        try {
          info.channel.send(`:tada: <@${message.author.id}>, leveled up! Your new level is ${info.level}!`);
        } catch (e) {}
      }
      db.set(`level_${message.author.id}`, info.level);
    }
    db.set(`exp_${message.author.id}`, info.xp);
    client.cooldown.set(`${message.author.id}`, Date.now());
  }
  if (message.content.includes("discord.gg/" || "discordapp.com/invite/")) {
    message
      .delete()
      .then(
        message.channel.send(
          "Link Deleted:\n**Invite links are not permitted on this server**"
        )
      );
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
});

client.on("ready", () => {
  console.log(`Bütün komutlar yüklendi, bot çalıştırılıyor...`);
  console.log(
    `${client.user.username} ismi ile Discord hesabı aktifleştirildi!`
  );
  let mob;
  if (client.conf.durum == "online") mob = "Çevrimiçi";
  if (client.conf.durum == "offline") mob = "Çevrimdışı";
  if (client.conf.durum == "idle") mob = "Boşta";
  if (client.conf.durum == "dnd") mob = "Rahatsız Etmeyin";
  console.log(`Durum ayarlandı: ${mob}!`);
  client.user.setPresence({
    activity: { name: client.conf.oynuyor, type: 2 },
    status: client.conf.durum
  });
  console.log(`Oynuyor ayarlandı!`);
});

const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
var prefix = client.conf.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
  if (message.author.id === message.guild.ownerID) permlvl = 7;
  if (message.author.id === client.conf.own) permlvl = 8;
  return permlvl;
};

///DOKUNMA
client.on("guildMemberAdd", member => {
  let textChannel = member.guild.channels.cache.find(
    channel => channel.id === "888481440877117523"
  );

  if (textChannel) {
    var messages = [
      `Brace yourselves. <@${member.user.id}> just joined the server.`,
      `Challenger approaching - <@${member.user.id}> has appeared`,
      `Welcome <@${member.user.id}>. Leave your weapon by the door.`,
      `Big <@${member.user.id}> showed up!`,
      `<@${member.user.id}> just joined... or did they?`,
      `Ready player <@${member.user.id}>`,
      `<@${member.user.id}> hopped into the server. Kangaroo!!`,
      `<@${member.user.id}> joined. You must construct additional pylons.`,
      `Hello. Is it <@${member.user.id}> you're looking for?`,
      `Where's <@${member.user.id}> in the server!`,
      `It's dangerous to go alone, take <@${member.user.id}>`
    ];

    textChannel.send({
      embed: {
        color: 3447003,
        description: messages[Math.floor(Math.random() * 11)],
        timestamp: new Date()
      }
    });
    var role = member.guild.roles.cache.find(role => role.name == "Triader");
    member.roles.add(role);
  }
});

client.login(client.conf.token);