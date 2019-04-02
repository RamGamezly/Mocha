const { Client, RichEmbed } = require('discord.js');
const yt = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const Discord = require('discord.js');
const config = require("../../authorization.json")
const YouTube = require('simple-youtube-api');
const ytapi = new YouTube(config.youtube);
const db = require("quick.db");
const log = require('../../utils/logger');
const fetch = require("node-fetch");
const moment = require("moment")

const defaultRegions = {
	asia: ['sydney', 'singapore', 'japan', 'hongkong'],
	eu: ['london', 'frankfurt', 'amsterdam', 'russia', 'eu-central', 'eu-west'],
	us: ['us-central', 'us-west', 'us-east', 'us-south', 'brazil'],
};

module.exports = {
    name: 'play',
    description: 'Play a track and add it to the queue',
    async execute(message, client, args) {
					async function getSong(string) {
						const res = await fetch(`http://localhost:2333/loadtracks?identifier=${string}`, {
							headers: { 'Authorization': 'restfulapi' },
						});
						const response = await res.json();
						if (!res) throw 'There was an error, try again';
						if (!response.tracks) throw 'No tracks found';
						return response.tracks;
					
					}

					function shiftQueue(gobj, message, player) {
							gobj.queue.shift()
							if(message.guild.queue[0]) {
								player.play(message.guild.queue[0].track)
								player.once("end", async data => {
									if (data.reason === "REPLACED") return;

											// If the next item in queue is non-existant, just clear the queue and stop the player.
											if(!message.guild.queue[1]) {
												setTimeout(async function(){
													await client.player.leave(message.guild.id);	
													const np = new Discord.MessageEmbed()
													.setTitle("👋 Your queue has ended, goodbye!")
													.setColor("#f1c40f")
												message.channel.send(np)	
												message.guild.queue = []	
												}, 1000);									
											}

											// Check if next item exists, if true, shift the queue along.
											if(message.guild.queue[1]) {
												const g = message.guild
												shiftQueue(g, message, player)
											}

	
									});		
									
									var t = "";
									var i = 0;
									message.guild.queue.forEach(v => {
													t = `${t}\`
									[${++i}] ${v.info.title}\``;
									});

									const np = new Discord.MessageEmbed()
									.setAuthor(message.author.username, message.author.displayAvatarURL())
									.setTitle("💿 Now playing")
									.setColor("#f1c40f")
									.setDescription(`\`\`\`ini
	${message.guild.queue[0].info.title}
					
	[Volume]: ${player.state.volume}%
	[Equalizer]: Flat\`\`\``)
									.addField("🕒 Duration", moment.utc(message.guild.queue[0].info.length).format('HH:mm:ss'), true)
									.addField("🎼 Artist", message.guild.queue[0].info.author, true)
									.addField("📜 Queue Position", `\`${message.guild.queue.length}\``, true)		
									.addField("📯 Requested by", message.author.tag, true)	
									.addField("🎵 Queue", t)						
									.setThumbnail(`https://i.ytimg.com/vi/${message.guild.queue[0].info.identifier}/maxresdefault.jpg`)
									.setFooter(`Added by ${message.author.username}`, message.author.displayAvatarURL())
								message.channel.send(np)
	
								log("info", `Now playing ${message.guild.queue[0].info.title} in ${message.guild.name} with ${message.guild.queue.length} queue items.`)
							}
					}
					
					function getRegion(region) {
						region = region.replace('vip-', '');
						for (const key in defaultRegions) {
							const nodes = client.player.nodes.filter(node => node.connected && node.region === key);
							if (!nodes) continue;
							for (const id of defaultRegions[key]) {
								if (id === region || region.startsWith(id) || region.includes(id)) return key;
							}
						}
						return 'asia';
					}
					
					function getIdealHost(region) {
						console.log(client.player);
						region = getRegion(region);
						const foundNode = client.player.nodes.find(node => node.ready && node.region === region);
						if (foundNode) return foundNode.host;
						return client.player.nodes.first().host;
					}
					if (!message.member.voice.channelID) {
						const embed = new Discord.MessageEmbed()
							.setTitle(':x: Error!')
							.setDescription('You must be in a voice channel to play a song.')
							.setColor('#e74c3c');
						return message.channel.send(embed);
					}
					if (!message.member.guild.me.hasPermission('CONNECT')) {
						const embed = new Discord.MessageEmbed()
							.setTitle('❌ No permissions!')
							.setDescription('I don\'t have permission to join that channel. Make sure you setup the permissions correctly for me.')
							.setColor('#e74c3c');
						return message.channel.send(embed);
					}
					if (!message.member.guild.me.hasPermission('SPEAK')) {
						const embed = new Discord.MessageEmbed()
							.setTitle('❌ No permissions!')
							.setDescription('I don\'t have permission to speak in that channel. Make sure you setup the permissions correctly for me.')
							.setColor('#e74c3c');
						return message.channel.send(embed);
					}
					let [...track] = args;
					track = track.join(' ');
					if(message.guild.queue[0] == undefined) {
							const player = await client.player.join({
								guild: message.guild.id,
								channel: message.member.voice.channelID,
								host: getIdealHost(message.guild.region),
							}, { selfdeaf: true });
							if (!player) return message.channel.send(`\`\`\`ERROR! No player found. Voiding.\`\`\``);			
							if(player) {
									const [getSongResult] = await getSong(`ytsearch: ${track}`)
									message.guild.queue.push(getSongResult)
									if(message.guild.queue[0]) {
										player.play(message.guild.queue[0].track)
										player.once("end", async data => {
											if (data.reason === "REPLACED") return;
		
													// If the next item in queue is non-existant, just clear the queue and stop the player.
													if(!message.guild.queue[1]) {
														setTimeout(async function(){
															await client.player.leave(message.guild.id);	
															const np = new Discord.MessageEmbed()
															.setTitle("👋 Your queue has ended, goodbye!")
															.setColor("#f1c40f")
														message.channel.send(np)
														message.guild.queue = []		
														}, 1000);									
													}
		
													// Check if next item exists, if true, shift the queue along.
													if(message.guild.queue[1]) {
														const g = message.guild
														shiftQueue(g, message, player)
													}
		
			
											});			

										var t = "";
										var i = 0;
										message.guild.queue.forEach(v => {
														t = `${t}\`
										[${++i}] ${v.info.title}\``;
										});
											
										const np = new Discord.MessageEmbed()
										.setAuthor(message.author.username, message.author.displayAvatarURL())
										.setTitle("💿 Now playing")
										.setColor("#f1c40f")
										.setDescription(`\`\`\`ini
${message.guild.queue[0].info.title}
						
[Volume]: ${player.state.volume}%
[Equalizer]: Flat\`\`\``)
										.addField("🕒 Duration", moment.utc(message.guild.queue[0].info.length).format('HH:mm:ss'), true)
										.addField("🎼 Artist", message.guild.queue[0].info.author, true)
										.addField("📜 Queue Position", `\`${message.guild.queue.length}\``, true)		
										.addField("📯 Requested by", message.author.tag, true)	
										.addField("🎵 Queue", t)	
										.setThumbnail(`https://i.ytimg.com/vi/${message.guild.queue[0].info.identifier}/hqdefault.jpg`)
										.setFooter(`Added by ${message.author.username}`, message.author.displayAvatarURL())
									message.channel.send(np)

									log("info", `Playing ${getSongResult.info.title} in ${message.guild.name} with ${message.guild.queue.length} queue items.`)
							}	
						}		
					}
					else {
						const [getSongResult] = await getSong(`ytsearch: ${track}`)
						message.guild.queue.push(getSongResult)
						message.channel.send(`\`\`\`Added ${getSongResult.info.title} to queue.\`\`\``)
						log("info", `Added ${getSongResult.info.title} to the queue in ${message.guild.name} now with ${message.guild.queue.length} queue items.`)
						message.react("561647339916230656")
					}
				
    }
}