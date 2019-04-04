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
	name: 'np',
	aliases: ['nowplaying', 'now'],
    description: 'Show what is playing right now.',
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
			var t = "";
			var i = 0;
			message.guild.queue.forEach(v => {
							t = `${t}
			[${++i}] ${v.info.title}`;
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
				.addField("🎵 Queue", `\`${t}\``)	
				.setThumbnail(`https://i.ytimg.com/vi/${message.guild.queue[0].info.identifier}/hqdefault.jpg`)
				.setFooter(`Added by ${message.author.username}`, message.author.displayAvatarURL())
			const npe = await message.channel.send(np);

			await npe.react("⏯") // Play/Pause
			await npe.react("⏹") // Stop playback
			await npe.react("⏭") // Skip
			await npe.react("🔉") // Reduce volume by 10%
			await npe.react("🔊") // Increase volume by 10%
			await npe.react("📊") // Equalizer

			console.log(npe)

			const filter = (reaction, user) => {
				reaction.emoji.name === '⏯' && user.id === message.author.id;
			};

			const collector = message.createReactionCollector(filter, { time: message.guild.queue[0].info.length });

			collector.on('collect', r => {
				if(r.emoji.name === "⏯") {
					if(client.player.get(message.guild.id).paused == true) {
						client.player.get(message.guild.id).pause(pause=false)
					}
					else {
						client.player.get(message.guild.id).pause(pause=true)
					}
				}
			});

		}
    }
}