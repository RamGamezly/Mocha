const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const db = require("quick.db");

var botname = "Ender"
var servers = []

module.exports = {
	name: 'stop',
	description: 'Stop playing music in guild',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`stop\``)
                .setDescription("Stop playing music in this server.")
                .addField("📘 Syntax", "`stop`")
                .addField("👑 Role Needed", "`DJ`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
            if(message.member.roles.some(r=>["DJ"].includes(r.name)) ) {
                if(message.guild.voiceConnection) {
                    message.guild.voiceConnection.disconnect();
                    message.react('👍');
                    db.set(`nowplaying-${song.guild.id}`, { song: { } })
                }
                else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("🤔 No music is playing right now, or you're not in a voice channel.")
                        .setColor('#eb4d4b')
                    message.channel.send(embed);
                }
            } 
            else {
                const embed = new Discord.MessageEmbed()
                    .setTitle("❌ No permissions!")
                    .setDescription("You don't have permission to clear the queue.")
                    .setColor('#eb4d4b')
                message.channel.send(embed);
            }
        }
    }
