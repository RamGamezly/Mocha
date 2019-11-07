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
            const embed = new Discord.MessageEmbed()
                .setTitle("Queue Finished, leaving voice channel.")
                .setDescription("You can always add another track to the queue by typing `!play` followed by a search query.")
                .setColor('#3498db')
            message.channel.send(embed);   
        }
    });
}

var botname = "Mocha"
var servers = []

const client = new Discord.Client();

module.exports = {
	name: 'radio',
	description: 'Play a track from YouTube',
	async execute(message, args) {
            if(message.member.voiceChannel) {
                if(!message.guild.voiceConnection) {
                    if(!servers[message.guild.id]) {
                        servers[message.guild.id] = {queue: []}
                    }
                    var server = servers[message.guild.id]
                    message.member.voiceChannel.join()
                        .then(connection =>{
                            connection.play('http://212.71.250.12:8040/stream'); 
                        })
                }
            }
            else {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Join a voice channel before playing music.")
                    .setColor('#eb4d4b')
                message.channel.send(embed);
                console.error(`[${botname}] ${message.author.username}#${message.author.discriminator} tried to play music in ${message.guild} but wasn't in a voice channel.`)
            }
        }
	}
