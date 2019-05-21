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
	name: 'stop',
	aliases: ['cc', 'clearqueue', 'end'],
  description: 'Clear the queue and leave the channel.',
  async execute(message, client, args) {
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
		if (message.guild.queue[0] == undefined) {
			const embed = new Discord.MessageEmbed()
				.setTitle(':x: Nothing playing.')
				.setColor('#e74c3c');
			return message.channel.send(embed);
		}
		await client.player.leave(message.guild.id)
		message.guild.queue = []
		message.react("👍")	
		log("warn", `Playback was stopped on command in ${message.guild.name} by ${message.author.tag}`)	
    }
}