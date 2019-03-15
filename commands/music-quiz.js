const { Client, Structures} = require("discord.js");
const Discord = require("discord.js");

const fetch = require("node-fetch");
const { PlayerManager } = require("discord.js-lavalink");
const { inspect } = require("util");
var config = require('../lavalink.json')
const botconfig = require("../authorization.json");
const defaultRegions = {
    asia: ["sydney", "singapore", "japan", "hongkong"],
    eu: ["london", "frankfurt", "amsterdam", "russia", "eu-central", "eu-west"],
    us: ["us-central", "us-west", "us-east", "us-south", "brazil"]
};

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(botconfig.youtube);
const numWords = require('num-words');
const moment = require("moment");

module.exports = {
	name: 'song-quiz',
	description: 'Song quiz',
	async execute(message, client, args) {
        const quiz = { 
            lobby: { }
        }
        quiz.lobby.timer = 30;
        for(var i=0; i < 30; i++){
            setTimeout(
                function () {
                    
                    quiz.lobby.timer = quiz.lobby.timer--
                    quiz.lobby.embed = new Discord.MessageEmbed()
                        .setTitle(`💿 ${message.author.username} has started a music quiz!`)
                        .setDescription(`You can join the game by joining \`${message.member.voiceChannel.name}\`.`)
                        .setFooter(`Starting in ${quiz.lobby.timer}...`)
                    var qle = qle.edit(quiz.lobby.embed);
            }, 1000);
        }        
    }
}