/* eslint-disable no-inline-comments */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const { Client, Structures } = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
const PushBullet = require('pushbullet');
const config = require('./authorization.json');
const pusher = new PushBullet(config.pushbullet);
const Database = require('better-sqlite3');
const error_code = new Database('error_codes.db', { verbose: console.log });
const DBL = require('dblapi.js');
const log = require('./utils/logger');

const fetch = require('node-fetch');
const { PlayerManager } = require('discord.js-lavalink');
const { inspect } = require('util');
const lavaconfig = require('./lavalink.json');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(config.youtube);
const moment = require('moment');

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
		this.player = new PlayerManager(this, lavaconfig.nodes, {
			user: this.user.id,
			shards: 1,
		});
		const fn = __filename.slice(__dirname.length + 1);
		log("info", `Logged into ${client.user.tag}`, fn);
		log("info", `Loaded Lavalink client`, fn);
	}

}

const client = new MusicClient();

const Ksoft = require('ksoft.js');
const ksoft = new Ksoft(config.ksoft);

const talkedRecently = new Set();

// Queue structure
Structures.extend('Guild', Guild => {
	class EnderGuild extends Guild {
		constructor(...args) {
			super(...args);
			this.queue = [];
		}
	}
	return EnderGuild;
});

client.commands = new Discord.Collection();
const dbl = new DBL(config.dbl, client);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const musicCmdFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of musicCmdFiles) {
	const command = require(`./commands/music/${file}`);
	client.commands.set(command.name, command);
}

// Bot Options
const botname = 'Ender';
const owner = 'Ender#0002';
const queue = { };

// Bot load event
client.on('ready', () => {

	setInterval(game, 9000);

	function game() {
		let members = 0;
		client.guilds.forEach(function(guild) { members = guild.memberCount + members; });
		const statuslist = [
			`!help • ${client.guilds.size.toLocaleString()} guilds`,
			`!help • ${client.channels.size.toLocaleString()} channels`,
			`!help • ${members.toLocaleString()} users`,
		];
		const random = Math.floor(Math.random() * statuslist.length);
		client.user.setActivity(statuslist[random], { type: 'STREAMING', url: 'https://twitch.tv/enderbot___' })
			.catch(console.error);
	}

});

client.on('disconnect', () => console.log('[ERROR] Disconnected from Discord, it may be down.'));
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));

client.on('message', async message => {
	// If the author of the message is the bot - stop.
	if (message.author.bot) return;

	const embed = new Discord.MessageEmbed()
		.setTitle('❌ Error!')
		.setDescription('You can\'t run this command in DMs')
		.setColor('#eb4d4b');
	if (message.channel.type != 'text') return message.channel.send(embed);

	if(message.mentions.users.size > 0) {
		if(message.mentions.users.first().id == '217562587938816000') {
			const deviceParams = {};
			pusher.note(deviceParams, 'Ender', `You were pinged by ${message.author.tag} in ${message.guild.name}`, function(error, response) {});
		}
		if(message.mentions.users.first().id == '371685425351229441') {
			const fetched = await db.fetch(`prefix-${message.guild.id}`);
			if (fetched === null) prefix = '!';
			else prefix = fetched;
			const embed = new Discord.MessageEmbed()
				.setTitle('👋 Hi! I\'m Ender!')
				.setDescription(`In \`${message.guild.name}\`, the prefix is \`${prefix}\`.`)
				.setColor('#3498db');
			message.channel.send(embed);
		}
	}

	const bw = db.fetch(`bannedwords-${message.guild.id}`);
	if(bw !== undefined) {
		if(bw) {
			msg = message.content.toLocaleLowerCase();
			if(bw.some(word => msg.includes(word))) {
				message.delete();
			}
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
	const fetched = await db.fetch(`prefix-${message.guild.id}`);
	if (fetched === null) {
		prefix = '!';
		db.set(`prefix-${message.guild.id}`, "!")
	} // Basically, if the prefix is not set, set it to '!' no matter what.
	else prefix = fetched;


	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command)

  || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));


	if(cmd) {
		const spamfilter = await db.fetch(`spamfilter-${message.guild.id}`);
		if(spamfilter == true) {
			if (talkedRecently.has(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setTitle('⌛ Chill out!')
					.setColor('#e67e22')
					.setDescription(`${message.author.username}, please wait 3s before sending your next command!`);
				return message.channel.send({ embed });
			}

			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 3500);

			cmd.execute(message, client, args).catch(err => {
				const snowflake = parseInt(message.author.id) + Math.round(+new Date() * 1000);
				const error_msgs = ['Ender did an oopsie!', 'Error successful!', 'Something bad happened', 'You really screwed up this time.', 'Big oopsie happened', 'Not my fault.'];
				const emsg = error_msgs[Math.floor((Math.random() * error_msgs.length))];
				const embed = new Discord.MessageEmbed()
					.setTitle(`❌ ${emsg}`)
					.setColor('#e74c3c')
					.setDescription(`A error occoured while trying to perform this command.\n\`\`\`${err}\`\`\`\nFor support, reference this code to the developer \`${snowflake}\``);
				message.channel.send(embed);
				const row = error_code.prepare('INSERT INTO error (ErrorCode, ErrorMsg, UserID, GuildID, Command) VALUES (?, ?, ?, ?, ?)');
				const final = row.run(`${snowflake}`, `${err}`, `${message.author.id}`, `${message.guild.id}`, `${message.content}`);
			});
		}
		else {
			cmd.execute(message, client, args).catch(err => {
				const snowflake = parseInt(message.author.id) + Math.round(+new Date() * 1000);
				const error_msgs = ['Ender did an oopsie!', 'Error successful!', 'Something bad happened', 'You really screwed up this time.', 'Big oopsie happened', 'Not my fault.'];
				const emsg = error_msgs[Math.floor((Math.random() * error_msgs.length))];
				const embed = new Discord.MessageEmbed()
					.setTitle(`❌ ${emsg}`)
					.setColor('#e74c3c')
					.setDescription(`A error occoured while trying to perform this command.\n\`\`\`${err}\`\`\`\nFor support, reference this code to the developer \`${snowflake}\``);
				message.channel.send(embed);
				const row = error_code.prepare('INSERT INTO error (ErrorCode, ErrorMsg, UserID, GuildID, Command) VALUES (?, ?, ?, ?, ?)');
				const final = row.run(`${snowflake}`, `${err}`, `${message.author.id}`, `${message.guild.id}`, `${message.content}`);
			});
		}
	}
});


const defaultSettings = {
	prefix: '!',
	welcomeChannel: '',
	welcomeMessage: 'Welcome **{{user}}** to **{{guild}}**!\n*Note, this is changable in `!settings`*',
};

client.on('guildCreate', guild => {
	db.set(`ksbanprotection-${member.guild.id}`, true);
	db.set(`prefix-${guild.id}`, '!');
	const gcwelcome = guild.channels.find(channel => channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
	console.log(`[${botname}] ${botname} has joined the guild '${guild.name}'`);
	const deviceParams = {};
	pusher.note(deviceParams, 'Ender', `Ender has joined the guild ${guild.name}`, function(error, response) {});
	console.log('   Tasks:');
	guild.createRole({
		name: 'DJ',
		color: 'BLUE',
	})
		.then(role =>
			console.log(`      - Created ${role.name} role with colour ${role.color}`),
		)
		.catch(console.log);
});

client.on('guildDelete', guild => {
	console.log(`[${botname}] ${botname} has left the guild '${guild.name}'`);
	console.log('   Tasks:');
	const deviceParams = {};
	pusher.note(deviceParams, 'Ender', `Ender has left the guild ${guild.name}`, function(error, response) {});
});

client.on('guildMemberAdd', async (member, user) => {
	const wc = await db.fetch(`welcomechannel-${member.guild.id}`);
	let wmsg = await db.fetch(`welcomemessage-${member.guild.id}`);
	const jr = await db.fetch(`joinrole-${member.guild.id}`);
	ksoft.bans.check(member.id)
		.then(ban => {
			if(ban.is_banned == true) {
				const ks = db.fetch(`ksbanprotection-${member.guild.id}`);
				if(ks === true) {
					member.kick();
					const embed = new Discord.MessageEmbed()
						.setTitle('❌ Failed to join server.')
						.setDescription('This server has global ban protection enabled, and as you are on that list you have been removed from the server. You may appeal your ban at https://bans.ksoft.si/check/me')
						.setColor('#eb4d4b');
					member.sendMessage(embed);
					console.log(`Banned user ${member.tag} tried to join a server but was banned globally.`);
				}
			}
		});
	if(wc) {
		if(!wmsg) {
			wmsg = 'Welcome **{{user}}#{{discriminator}}** to **{{server}}**\n\n**Join Date: **{{joined}}\n\nThis message is editable in the settings `settings`.';
		}
		const fwmsg = wmsg.replace(/{{user}}/g, member.user.username);
		const fwmsg1 = fwmsg.replace(/{{discriminator}}/g, member.user.discriminator);
		const fwmsg2 = fwmsg1.replace(/{{discriminator}}/g, member.user.discriminator);
		const fwmsg3 = fwmsg2.replace(/{{joined}}/g, member.user.createdAt.toGMTString());
		const fwmsg4 = fwmsg3.replace(/{{server}}/g, member.guild.name);
		const fwmsg5 = fwmsg4.replace(/{{id}}/g, member.id);
		const fwmsg6 = fwmsg5.replace(/{{membercount}}/g, member.guild.memberCount);
		const fwmsg7 = fwmsg6.replace(/\n/g, '\n');
		const colours = ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#d35400', '#e67e22', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#ecf0f1', '#34495e'];
		const clr = colours[Math.floor((Math.random() * colours.length))];
		const embed = new Discord.MessageEmbed()
			.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
			.setTitle(`👋 Welcome to ${member.guild.name}`)
			.setDescription(fwmsg7)
			.setColor('#3498db')
			.setTimestamp(Date.now())
			.setThumbnail(`${member.guild.iconURL}?size=1024`)
			.setFooter(member.guild.name, `${member.guild.iconURL}?size=1024`);
		await member.guild.channels.find(channel => channel.id === wc).send(embed).catch(err => console.log(err));
		await (member.addRole(jr));
	}
});


client.login(config.token);