const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const si = require('systeminformation');
const os = require('os-utils');
var util = require('bot-utils')

module.exports = {
	name: 'bot',
	description: 'Stats from the bot',
	async execute(message, client, args) {
                let q = message.content.split(' ')[1];
                if(args[0] == 'help') {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`⁉ Help for \`bot\``)
                            .setDescription("Bot Stats")
                            .addField("📘 Syntax", "`bot`")
                            .setColor('#3498db')
                            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                        return message.channel.send(embed)   
                    }
                const used = process.memoryUsage().heapUsed / 1024 / 1024;
                let prefix = await db.fetch(`prefix-${message.guild.id}`);
                var users = 0
                client.guilds.forEach(function(guild) { users = guild.memberCount + users });
                const embed = new Discord.MessageEmbed()
                        .setTitle("🤖 Ender Bot Statistics")
                        .setDescription("I'm **Ender**, the only bot you'll ever need.")
                        .setColor("#3498db")
                        .addField(":up: Uptime", `I've been alive for ${util.uptime()} :knife:`)
                        .addField(":control_knobs: CPU", `Intel™ Duel Xeon E5-2630`, true)
                        .addField(`<:RAM:508587986854871040> RAM`, `${Math.round(used * 100) / 100}mb / 6024mb`, true)
                        .addField(":helmet_with_cross: CPU Usage", `undefined`, true)
                        .addField(":desktop: OS", `Windows Server 2016`, true)
                        .addField(`<:nodejs:541895676397748234> NodeJS Version`, `${process.versions.node}`, true)
                        .addField(`<:discordjs:541904094030462987> Discord.js Version`, `${version}`, true)
                        .addField(`👪 Members`, users.toLocaleString(), true)
                        .addField(`🏰 Servers`, client.guilds.size, true)
                        .addField(`❗ Prefix`, prefix, true)
                        .setFooter("dfhsucdhguhfbgdsjhfh", "http://i.imgur.com/w1vhFSR.png")
                        .setTimestamp()
                message.channel.send({embed});
	},
};