const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const ffmpeg = require('ffmpeg');

function Play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly",
        quality: "highestaudio",
      }));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if(server.queue[0]) {
            Play(connection,message);
        }
        else {
            connection.disconnect();
            const embed = new Discord.RichEmbed()
                .setTitle("👋 Queue Finished, leaving voice channel.")
                .setDescription("You can always add another track to the queue by typing `!play` followed by a search query.")
                .setColor('#3498db')
                .setThumbnail("https://cdn-proxy.ender.site/enderbot.png")
            message.channel.send(embed);   
        }
    });
}

var botname = "Ender"
var servers = []

module.exports = {
	name: 'play',
	description: 'Play a track from YouTube',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.RichEmbed()
                .setTitle(`⁉ Help for \`play\``)
                .setDescription("Play a track from youtube.")
                .addField("📘 Syntax", "`play <valid youtube url>`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            return message.channel.send(embed)   
        }
        let url = message.content.split(' ')[1];
        if(!url) {
            const embed = new Discord.RichEmbed()
                .setTitle(`⁉ Help for \`play\``)
                .setDescription("Play a track from youtube.")
                .addField("📘 Syntax", "`play <valid youtube url>`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
            return message.channel.send(embed)               
        }
        else {
            var regex = "^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$";
            n = url.includes("youtube.com/watch?v=")
            if(n) {
                if(message.member.voiceChannel) {
                    if(!message.guild.voiceConnection) {
                        if(!servers[message.guild.id]) {
                            servers[message.guild.id] = {queue: []}
                        }
                        var server = servers[message.guild.id]
                        message.member.voiceChannel.join()
                            .then(connection =>{
                                var server = servers[message.guild.id];
                                server.queue.push(url);
                                Play(connection, message)
                            })
                    }
                }
                else {
                    const embed = new Discord.RichEmbed()
                        .setTitle("🤔 Join a voice channel before playing music.")
                        .setColor('#eb4d4b')
                    message.channel.send(embed);
                    console.error(`[${botname}] ${message.author.username}#${message.author.discriminator} tried to play music in ${message.guild} but wasn't in a voice channel.`)
                }
            }
            else {
                const embed = new Discord.RichEmbed()
                    .setTitle("❓ That doesn't look like a YouTube url.")
                    .setColor('#eb4d4b')
                message.channel.send(embed);          
            }
        }
	},
};