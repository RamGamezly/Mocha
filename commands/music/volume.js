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
	name: 'volume',
	aliases: ['vol', 'earrape'],
    description: 'Change the volume of the track.',
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

		if (message.guild.queue[0] == undefined) {
			const embed = new Discord.MessageEmbed()
				.setTitle(':x: Nothing playing.')
				.setColor('#e74c3c');
			return message.channel.send(embed);
		}

		// Grabbing the player session
		const player = client.player.get(message.guild.id)
		
		if(!player) {
			const embed = new Discord.MessageEmbed()
				.setTitle(':x: Nothing playing.')
				.setColor('#e74c3c');
			return message.channel.send(embed);			
		}

		else {
			const prefix = db.fetch(`prefix-${message.guild.id}`);
			args = message.content.slice(prefix.length).split(/ +/);
			const command = args.shift().toLowerCase();
			if(command === "volume" || command === "vol") {
				if(args[0] == 'help' || !args[0]) {
					const embed = new Discord.MessageEmbed()
							.setTitle(`⁉ Help for \`volume\``)
							.setDescription("Change playback volume")
							.addField("📘 Syntax", "`volume <number> or volume <number>%`")
							.setColor('#3498db')
							.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
					return message.channel.send(embed)   
			}
				if(isNaN(args[0]) == false) { // Checks if it is a number
					player.volume(parseInt(args[0]))
					if(parseInt(args[0]) >= 50) {
						message.react("🔊")
					}
					if(parseInt(args[0]) < 50) {
						if(parseInt(args[0]) == 0) {
							message.react("🔈")
						}
						else {
							message.react("🔉")
						}
					}
				}
				else {
					if(args[0][args[0].length -1] == "%") {
						const volume = args[0].replace(/%/gi, "")
						player.volume(parseInt(volume))
						if(parseInt(volume) >= 50) {
							message.react("🔊")
						}
						if(parseInt(volume) < 50) {
							if(parseInt(volume) == 0) {
								message.react("🔈")
							}
							else {
								message.react("🔉")
							}
						}
					}
				}
			}
			if(command === "earrape" || command === "er") {
				if(args[0] == 'help' || !args[0]) {
					const embed = new Discord.MessageEmbed()
							.setTitle(`⁉ Help for \`earrape\``)
							.setDescription("Toggle earrape mode")
							.addField("📘 Syntax", "`earrape <on/off>`")
							.setColor('#3498db')
							.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
					return message.channel.send(embed)   
			}
				if(args[0] === "on") {
					player.volume(250)
					client.player.get(message.guild.id).setEQ([{ band: 0.25, gain: 1 }, { band: 1, gain: 1 }])
					await message.react("👂");
					await message.react("🔪");
				}
				if(args[0] === "off") {
					client.player.get(message.guild.id).setEQ([{ band: 0, gain: 0 }, { band: 0, gain: 0 }])
					player.volume(100)
					message.react("🔊")
				}
			}
		}
    }
}