'use strict';

const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const ffmpeg = require('ffmpeg');
const search = require('youtube-search');
const yt = new YouTube('AIzaSyAC_9B0XCKW9Y-dd90p7Zd1foeerMZv3M8');
const emojiCharacters = require(__dirname+'/emoji-char.js');

var opts = {
    maxResults: 5,
    key: 'AIzaSyAC_9B0XCKW9Y-dd90p7Zd1foeerMZv3M8'
  };

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
	name: 'lsearch',
	description: 'Search and play a track',
	async execute(message, args) {
        var query = message.content.split("search ")[1]
        if(query) {
            if(message.member.voiceChannel) {
                //if(message.guild.voiceConnection) {
                    if(!servers[message.guild.id]) {
                        servers[message.guild.id] = {queue: []}
                    }
                    var server = servers[message.guild.id]
                        search(query, opts, async function(err, results) {
                            if(err) return console.log(err);
                            let title1 = results[0].title
                            let title2 = results[1].title
                            let title3 = results[2].title
                            let title4 = results[3].title
                            let title5 = results[4].title
                            let link1 = results[0].link
                            let link2 = results[1].link
                            let link3 = results[2].link
                            let link4 = results[3].link
                            let link5 = results[4].link
                            let thumbnail = results[0].thumbnails.high.url
                            const embed = new Discord.RichEmbed()
                                .setTitle(`🔎 Searched for '${query}'`)
                                .setDescription(`:one: ${title1} - [Watch Video](${link1})\n:two: ${title2} - [Watch Video](${link2})\n:three: ${title3} - [Watch Video](${link3})\n:four: ${title4} - [Watch Video](${link4})\n:five: ${title5} - [Watch Video](${link5})\n\nYou can select which track you would like to add to the queue by selecting the reaction below, make sure all the emotes are loaded before selecting an option.`)
                                .setColor('#3498db')
                                .setThumbnail(message.author.avatarURL)
                                .setImage(thumbnail)
                            let embedmsg = await message.channel.send(embed)
                            const connection = await message.member.voiceChannel.join();
                            await embedmsg.react(emojiCharacters[1]); 
                            await embedmsg.react(emojiCharacters[2]); 
                            await embedmsg.react(emojiCharacters[3]); 
                            await embedmsg.react(emojiCharacters[4]); 
                            await embedmsg.react(emojiCharacters[5])

                            const reactions = embedmsg.awaitReactions(reaction => 
                                reaction.emoji.name === emojiCharacters[1] || reaction.emoji.name === emojiCharacters[2] || reaction.emoji.name === emojiCharacters[3] || reaction.emoji.name === emojiCharacters[4] || reaction.emoji.name === emojiCharacters[5], {max: 2}
                            ).then(reaction => {
                                message.channel.send("Reaction added")
                                if(reaction.get(emojiCharacters[1]).count == 2) {
                                    embedmsg.delete();
                                    var server = servers[message.guild.id];
                                    server.queue.push(link1);
                                    Play(connection, message)
                                    message.channel.send(`Added ${title1} to the queue!`)
                                }
                                else if(reaction.get(emojiCharacters[2]).count == 2) {
                                    embedmsg.delete();
                                    var server = servers[message.guild.id];
                                    server.queue.push(link2);
                                    Play(connection, message)
                                    message.channel.send(`Added ${title2} to the queue!`)
                                }
                                else if(reaction.get(emojiCharacters[3]).count == 2) {
                                    embedmsg.delete();
                                    var server = servers[message.guild.id];
                                    server.queue.push(link3);
                                    Play(connection, message)
                                    message.channel.send(`Added ${title3} to the queue!`)
                                }
                                else if(reaction.get(emojiCharacters[4]).count == 2) {
                                    embedmsg.delete();
                                    var server = servers[message.guild.id];
                                    server.queue.push(link4);
                                    Play(connection, message)
                                    message.channel.send(`Added ${title4} to the queue!`)
                                }
                                else if(reaction.get(emojiCharacters[5]).count == 2) {
                                    embedmsg.delete();
                                    var server = servers[message.guild.id];
                                    server.queue.push(link5);
                                    Play(connection, message)
                                 message.channel.send(`Added ${title5} to the queue!`)
                                }
                            }
                            )
                        });
                }
            }
            if(!message.member.voiceChannel) {
                const embed = new Discord.RichEmbed()
                    .setTitle("🤔 Join a voice channel before playing music.")
                    .setColor('#eb4d4b')
                message.channel.send(embed);
                console.error(`[${botname}] ${message.author.username}#${message.author.discriminator} tried to play music in ${message.guild} but wasn't in a voice channel.`)
            }
        if(!query) {
                const embed = new Discord.RichEmbed()
                    .setTitle("❓ What would you like to search for?")
                    .setColor('#eb4d4b')
                message.channel.send(embed);          
        }
    },
}
