/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
const { Client, Structures } = require('discord.js');
const Discord = require('discord.js');

const fetch = require('node-fetch');
const { PlayerManager } = require('discord.js-lavalink');
const { inspect } = require('util');
const config = require('../lavalink.json');
const botconfig = require('../authorization.json');
const defaultRegions = {
	asia: ['sydney', 'singapore', 'japan', 'hongkong'],
	eu: ['london', 'frankfurt', 'amsterdam', 'russia', 'eu-central', 'eu-west'],
	us: ['us-central', 'us-west', 'us-east', 'us-south', 'brazil'],
};
const db = require('quick.db');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(botconfig.youtube);
const numWords = require('num-words');
const moment = require('moment');
const log = require('../utils/logger')
const utm_track = '?utm_source=Ender+Bot' + '?utm_uri=https%3A%2F%2Fbot.ender.site'

const Database = require('better-sqlite3');
const error_code = new Database('error_codes.db', { verbose: console.log });

Structures.extend('Guild', Guild => {
	class EnderGuild extends Guild {
		constructor(...args) {
			super(...args);
			this.queue = [];
		}
	}
	return EnderGuild;
});


class MusicClient extends Client {

	constructor(options) {
		super(options);

		this.player = null;

		this.once('ready', this._ready.bind(this));
	}

	_ready() {
		this.player = new PlayerManager(this, config.nodes, {
			user: this.user.id,
			shards: 1,
		});
		const fn = __filename.slice(__dirname.length + 1);
		log("info", `Loaded Lavalink client`, fn);
	}

}

const client = new MusicClient();

client.login(botconfig.token);


client.on('error', console.error)
	.on('warn', console.warn);

client.on('message', async message => {
	if (message.author.bot || !message.guild) return;
	let prefix = db.fetch(`prefix-${message.guild.id}`);
	if(!prefix) {
		prefix = '!';
	}
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const noplayer = {
		'title': '❌ Error!',
		'description': 'No Lavalink player found.',
		'color': 15158332,
	};

	async function Play(song, message, player) {
		if(song.error) {
			const snowflake = parseInt(message.author.id) + Math.round(+new Date() * 1000);
			const error_msgs = ['Ender did an oopsie!', 'Error successful!', 'Something bad happened', 'You really screwed up this time.', 'Big oopsie happened', 'Not my fault.'];
			const emsg = error_msgs[Math.floor((Math.random() * error_msgs.length))];
			const embed = new Discord.MessageEmbed()
				.setTitle(`❌ ${emsg}`)
				.setColor('#e74c3c')
				.setDescription(`A error occoured while trying to perform this command.\n\`\`\`${err}\`\`\`\nFor support, reference this code to the developer \`${snowflake}\``);
			return message.channel.send(embed);
			const row = error_code.prepare('INSERT INTO error (ErrorCode, ErrorMsg, UserID, GuildID, Command) VALUES (?, ?, ?, ?, ?)');
			const final = row.run(`${snowflake}`, `${err}`, `${message.author.id}`, `${message.guild.id}`, `${message.content}`);			
		}
        if(message.guild.queue == "") {
			console.log("passed check for no queue");
			player.play(song.track);
			const np = new Discord.MessageEmbed()
				.setTitle("💿 Now playing")
				.setColor("#f1c40f")
				.setDescription(`\`\`\`ini
${song.info.title}

[Volume]: ${player.state.volume}%
[Equalizer]: Flat
				\`\`\``)
				.addField("🕒 Duration", moment.utc(song.info.length).format('HH:mm:ss'), true)
				.addField("🎼 Artist", song.info.author, true)
				.setThumbnail(`https://i.ytimg.com/vi/${song.info.identifier}/maxresdefault.jpg`)
				.setFooter(`Added by ${message.author.username}`, message.author.displayAvatarURL())
			message.channel.send(np)
		}
		if(message.guild.queue !== "") {
			console.log("passed check for queue, pushing");
			message.guild.queue.push(song);
		}	
	}

	async function queueManager(message, track, video) {
		const [song] = await getSong(track);
		const player = await client.player.join({
			guild: message.guild.id,
			channel: message.member.voice.channelID,
			host: getIdealHost(message.guild.region),
		}, { selfdeaf: true });
		if (!player) throw 'No player found...';
		if(!song) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`❌ Nothing found for '${video}'`)
				.setColor('#e74c3c');
			return message.channel.send(embed);
		}
		console.log(song)
		Play(song, message, player)
		player.once('error', console.error);
		player.once('end', async data => {
			if(data.reason !== "REPLACED") {
				message.guild.queue = []
				await client.player.leave(message.guild.id);
				const embed = new Discord.MessageEmbed()
					.setTitle('👋 Bye!')
					.setDescription('All tracks in the queue were played. You can add another song by runnning the `play` command.')
					.setColor('#f1c40f');
				return message.channel.send(embed);
			}
			else {
				message.guild.queue.shift();
				player.play(message.guild.queue[0].track);
			}
		});	

	}

	if (command === 'play') {
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
		try {
			const video = await youtube.getVideo(track);
		}
		catch (error) {
			try {
				const videos = await youtube.searchVideos(track, 5);
				let index = 0;
				const videoz = videos.map(video2 => `:${numWords(++index)}: ${video2.title} - [Watch Video](https://www.youtube.com/watch?v=${video2.id})`).join('\n');
				const embed = new Discord.MessageEmbed()
					.setTitle(`🔎 Searched for '${track}'`)
					.setDescription(`${videoz}`)
					.setColor('#3498db')
					.setThumbnail(message.author.displayAvatarURL())
					.setImage(`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`)
					.setFooter('Type which track you would like to play, for example typing \'1\' would play track one.', `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`);
				message.channel.send(embed);
				try {
					const ch = message.channel;
					const filter = m => m.content >= 1 || m.content <= 5 || m.content == 'cancel';
					const collector = ch.createMessageCollector(filter, { time: 30000 });
					collector.on('collect', async m => {
						if(m.author.id == '371685425351229441') return;
						if(m.content == 'cancel') {
							message.reply('Cancelled.');
						}
						else {
							console.log(m.content);
							const videoIndex = parseInt(m.content);
							console.log(videoIndex);
							const video = await youtube.getVideoByID(videos[videoIndex - 1].id);
							queueManager(m, video, track);
						}
					});
				}
				catch (err) {
					message.delete();
					console.error(err);
					const embed = new Discord.MessageEmbed()
						.setTitle('❌ Error!')
						.setColor('#e74c3c')
						.setDescription(`This error has been logged and will be reviewed by the developers.\`\`\`vbs\n[1] ${err}\`\`\``);
					message.channel.send(embed);
					const errEmbed = new Discord.MessageEmbed()
						.setTitle('❌ Error!')
						.setColor('#e74c3c')
						.setDescription(`An error occoured while \`${message.author.username}#${message.author.discriminator}\` tried to run \`${message.content}\` in \`${message.guild.name}\`.\`\`\`vbs\n[1] ${err}\`\`\``);
					client.channels.get('547746237454090260').send('<@!217562587938816000>');
					client.channels.get('547746237454090260').send(errEmbed);
				}
			}
			catch (err) {
				console.error(err);
				const embed = new Discord.MessageEmbed()
					.setTitle(`❌ Nothing found for '${args.join(' ')}'`)
					.setColor('#e74c3c');
				return message.channel.send(embed);
			}

		}
	}
		if (command === 'stop' | command === 'leave') {
			await client.player.leave(message.guild.id);
			message.react('👍');
		}
		if (command === 'pause') {
			const player = client.player.get(message.guild.id);
			if (!player) return message.channel.send({ noplayer });
			await player.pause(true);
			message.react('👍');
		}
		if (command === 'resume') {
			const player = client.player.get(message.guild.id);
			if (!player) return message.channel.send({ noplayer });
			await player.pause(false);
			message.react('👍');
		}
		if(command === 'volume') {
			const player = client.player.get(message.guild.id);
			let [...volume] = args;
			volume = volume.join(' ');
			if(!volume | volume === 'help') {
				const embed = new Discord.MessageEmbed()
					.setTitle('⁉ Help for `volume`')
					.setDescription('Set the volume of the tracks.')
					.addField('📘 Syntax', '`volume <number>`')
					.setColor('#3498db')
					.setFooter(`Requested by ${message.author.username}`, message.author.displaydisplayAvatarURL()());
				return message.channel.send(embed);
			}
			if (!player) return message.channel.send({ noplayer });
			await player.volume(volume);
			return message.channel.send(`Set the volume to \`${volume}%\``);
		}
		if(command === 'earrape') {
			const player = client.player.get(message.guild.id);
			let [...volume] = args;
			volume = volume.join(' ');
			if(!volume | volume === 'help') {
				const embed = new Discord.MessageEmbed()
					.setTitle('⁉ Help for `earrape`')
					.setDescription('Make the entire music queue earrape.')
					.addField('📘 Syntax', '`earrape <on/off>`')
					.setColor('#3498db')
					.setFooter(`Requested by ${message.author.username}`, message.author.displaydisplayAvatarURL()());
				return message.channel.send(embed);
			}
			if(volume === 'on') {
				if (!player) return message.channel.send({ noplayer });
				await player.volume(1000);
				const wEmbed = new Discord.MessageEmbed()
					.setTitle(`👍 Earrape mode activated in ${message.guild.name}`)
					.setColor('#f1c40f');
				return message.channel.send(wEmbed);
			}
			if(volume === 'off') {
				if (!player) return message.channel.send({ noplayer });
				await player.volume(100);
				const wEmbed = new Discord.MessageEmbed()
					.setTitle(`👍 Earrape mode deactivated in ${message.guild.name}`)
					.setColor('#f1c40f');
				return message.channel.send(wEmbed);
			}
		}
	}
);

async function clean(text) {
	if (text instanceof Promise || (Boolean(text) && typeof text.then === 'function' && typeof text.catch === 'function')) text = await text;
	if (typeof text !== 'string') text = inspect(text, { depth: 0, showHidden: false });
	text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
	return text;
}

async function getSong(string) {
	const res = await fetch(`http://localhost:2333/loadtracks?identifier=${string.raw.id}`, {
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

process.on('unhandledRejection', console.log)
	.on('error', console.error)
	.on('warn', console.warn);