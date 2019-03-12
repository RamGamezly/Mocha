const { Structures } = require('discord.js');
const yt = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
var PushBullet = require('pushbullet');
const config = require("./authorization.json");
var pusher = new PushBullet(config.pushbullet);
const Database = require('better-sqlite3');
const error_code = new Database('error_codes.db', { verbose: console.log });

const Ksoft = require('ksoft.js');
const ksoft = new Ksoft(config.ksoft);

const talkedRecently = new Set();

var opts = {
  maxResults: 5,
  key: ''
};


Structures.extend('Guild', Guild => {
	class EnderGuild extends Guild {
		constructor(...args) {
			super(...args);
			this.queue = [];
		}
	}
	return EnderGuild;
});


const client = new Discord.Client({autoReconnect:true});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Bot Options
var botname = "Ender"
var owner = "Ender#0002"
var queue = { }

// Bot load event
client.on("ready", () => {
  console.log(`[${botname}] Loaded the bot.`);
  console.log(`[${botname}] Logged into ${client.user.tag} (${client.user.id})`)
  process.title = `${client.user.tag} (${client.user.id})`
  setInterval(async () => {
    var members = 0
    client.guilds.forEach(function(guild) { members = guild.memberCount + members });
    const statuslist = [
      `!help • ${client.guilds.size.toLocaleString()} guilds`,
      `!help • ${client.channels.size.toLocaleString()} channels`,
      `!help • ${members.toLocaleString()} users`
    ];
    const random = Math.floor(Math.random() * statuslist.length);
      client.user.setActivity(statuslist[random], { type: 'STREAMING', url: 'https://twitch.tv/directory' })
        .catch(console.error);
  }, 10000);
});

client.on('disconnect', () => console.log('[ERROR] Disconnected from Discord, it may be down.'));
//client.on('reconnecting', () => console.log('Attempting to reconnect to server.'));
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

client.on("message", async message => {
  //If the author of the message is the bot - stop.
  if (message.author.bot) return;

  const embed = new Discord.MessageEmbed()
    .setTitle("❌ Error!")
    .setDescription("You can't run this command in DMs")
    .setColor('#eb4d4b')
  if (message.channel.type != 'text') return message.channel.send(embed);

  if(message.mentions.users.size > 0) {
    if(message.mentions.users.first().id == '217562587938816000') {
      var deviceParams = {}
      pusher.note(deviceParams, 'Ender', `You were pinged by ${message.author.tag} in ${message.guild.name}`, function(error, response) {});    
    }
    if(message.mentions.users.first().id == '371685425351229441') {
        let fetched = await db.fetch(`prefix-${message.guild.id}`);
        if (fetched === null) prefix = '!';
        else prefix = fetched;
        const embed = new Discord.MessageEmbed()
          .setTitle("👋 Hi! I'm Ender!")
          .setDescription(`In \`${message.guild.name}\`, the prefix is \`${prefix}\`.`)
          .setColor("#3498db")
        message.channel.send(embed)
    }
  }

  db.add(`msgs-${message.guild.id}`, 1);
  // Adds one to the message counter, for the API.

  if(message.channel.id == '547746237454090260') {
    if(message.author.id !== '371685425351229441') {
        message.delete();
    }
  }

  // Prefix handler
  let fetched = await db.fetch(`prefix-${message.guild.id}`);
  if (fetched === null) prefix = '!'; // Basically, if the prefix is not set, set it to '!' no matter what.
  else prefix = fetched;



  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  const cmd  = client.commands.get(command)
  if(cmd) {
    let spamfilter = await db.fetch(`spamfilter-${message.guild.id}`);
    if(spamfilter == true) {
      if (talkedRecently.has(message.author.id)) {
        const embed = new Discord.MessageEmbed()
        .setTitle("⌛ Chill out!")
        .setColor("#e67e22")
        .setDescription(`${message.author.username}, please wait 3s before sending your next command!`)
        return message.channel.send({embed});
      }
    
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 3500);
      cmd.execute(message, client, args).catch(err => {
        console.log(err);
        var snowflake = message.author.id + Math.round(+new Date()/1000);
        const embed = new Discord.MessageEmbed()
          .setTitle("❌ Error!")
          .setColor("#e74c3c")
          .setDescription(`For support, reference this code to the developer \`${snowflake}\``)
        message.channel.send(embed); 
        const row = error_code.prepare(`INSERT INTO error (ErrorCode, ErrorMsg, UserID, GuildID, Command) VALUES`);
        const final = row.run(`${snowflake}`, `${err}`, `${message.author.id}`, `${message.guild.id}`, `${message.content}`);
        console.log(final)
        const errEmbed = new Discord.MessageEmbed()
          .setTitle("❌ Error!")
          .setColor("#e74c3c")
          .setDescription(`An error occoured while \`${message.author.username}#${message.author.discriminator}\` tried to run \`${cmd.name}\` in \`${message.guild.name}\`.\`\`\`vbs\n[1] ${err}\`\`\``)
          client.channels.get("547746237454090260").send(`<@!217562587938816000>`)    
          client.channels.get("547746237454090260").send(errEmbed)               
    });
    }
    else {
      cmd.execute(message, client, args).catch(err => {
          console.log(err);
          const embed = new Discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#e74c3c")
            .setDescription(`This error has been logged and will be reviewed by the developers.\`\`\`vbs\n[1] ${err}\`\`\``)
          message.channel.send(embed);  
          const errEmbed = new Discord.MessageEmbed()
            .setTitle("❌ Error!")
            .setColor("#e74c3c")
            .setDescription(`An error occoured while \`${message.author.username}#${message.author.discriminator}\` tried to run \`${cmd.name}\` in \`${message.guild.name}\`.\`\`\`vbs\n[1] ${err}\`\`\``)
          client.channels.get("547746237454090260").send(`<@!217562587938816000>`)    
          client.channels.get("547746237454090260").send(errEmbed)      
      });
    }
  } 
});



const defaultSettings = {
  prefix: "!",
  welcomeChannel: "",
  welcomeMessage: "Welcome **{{user}}** to **{{guild}}**!\n*Note, this is changable in `!settings`*"
}

client.on("guildCreate", guild => {
  db.set(`prefix-${guild.id}`, '!');
    const gcwelcome = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    console.log(`[${botname}] ${botname} has joined the guild '${guild.name}'`);
    var deviceParams = {}
    pusher.note(deviceParams, 'Ender', `Ender has joined the guild ${guild.name}`, function(error, response) {});
    console.log(`   Tasks:`);
      guild.createRole({
        name: 'DJ',
        color: 'BLUE',
      })
    .then(role => 
      console.log(`      - Created ${role.name} role with colour ${role.color}`),
    )
    .catch(console.log)
  })

  client.on("guildDelete", guild => {
    console.log(`[${botname}] ${botname} has left the guild '${guild.name}'`);
    console.log(`   Tasks:`);
    var deviceParams = {}
    pusher.note(deviceParams, 'Ender', `Ender has left the guild ${guild.name}`, function(error, response) {});
  })

client.on("guildMemberAdd", async (member, user) => {
  let wc = await db.fetch(`welcomechannel-${member.guild.id}`);
  let wmsg = await db.fetch(`welcomemessage-${member.guild.id}`);
  let jr = await db.fetch(`joinrole-${member.guild.id}`);
  ksoft.bans.check(member.id)
    .then(ban => {
      if(ban.is_banned == true) {
        member.kick()
        const embed = new Discord.MessageEmbed()
          .setTitle("❌ Failed to join server.")
          .setDescription("This server has global ban protection enabled, and as you are on that list you have been removed from the server. You may appeal your ban at https://bans.ksoft.si/check/me")
          .setColor('#eb4d4b')
        member.sendMessage(embed);
        console.log(`Banned user ${member.tag} tried to join a server but was banned globally.`)
      }
    });
    if(wc) {
      if(!wmsg) {
        wmsg = "Welcome **{{user}}#{{discriminator}}** to **{{server}}**\n\n**Join Date: **{{joined}}\n\nThis message is editable in the settings `settings`."
      }
      var fwmsg = wmsg.replace(/{{user}}/g, member.user.username)
      var fwmsg1 = fwmsg.replace(/{{discriminator}}/g, member.user.discriminator)
      var fwmsg2 = fwmsg1.replace(/{{discriminator}}/g, member.user.discriminator)
      var fwmsg3 = fwmsg2.replace(/{{joined}}/g, member.user.createdAt.toGMTString())
      var fwmsg4 = fwmsg3.replace(/{{server}}/g, member.guild.name)
      var fwmsg5 = fwmsg4.replace(/{{id}}/g, member.id)
      var fwmsg6 = fwmsg5.replace(/{{membercount}}/g, member.guild.memberCount)
      var fwmsg7 = fwmsg6.replace(/\n/g, "\n")
      const colours = ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#d35400', '#e67e22', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#ecf0f1', '#34495e']
      let clr = colours[Math.floor((Math.random() * colours.length))];
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
        .setTitle(`👋 Welcome to ${member.guild.name}`)
        .setDescription(fwmsg7)
        .setColor("#3498db")
        .setTimestamp(Date.now())
        .setThumbnail(`${member.guild.iconURL}?size=1024`)
        .setFooter(member.guild.name, `${member.guild.iconURL}?size=1024`);
      await member.guild.channels.find(channel => channel.id === wc).send(embed).catch(err => console.log(err));
      await(member.addRole(jr));
    }
  });





 
  client.login(config.token);