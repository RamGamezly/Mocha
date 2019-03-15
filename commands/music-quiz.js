const { Client, Structures} = require("discord.js");
const Discord = require("discord.js");
const ytdl = require('ytdl-core');

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

function delay(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
 }

module.exports = {
	name: 'song-quiz',
	description: 'Song quiz',
	async execute(message, client, args) {
        const quiz = { 
            lobby: { },
            game: { 
                song1: {},
                song2: {},
                song3: {},
                song4: {},
                song5: {},
                song6: {},
                song7: {},
                song8: {},
                song9: {},
                song10: {}
             }
        }
        message.member.voice.channel.join()
            .then(async connection => {
                var track = await youtube.getVideoByID("4WgWGcED0JQ");
                var url = `https://www.youtube.com/watch?v=${track.raw.id}`
                console.log(track)
                var stream = ytdl(url, { filter: 'audioonly' });
                const dispatcher = connection.playStream(stream)
                delay(10000)
                message.member.voice.channel.leave();
                message.channel.send("f")
            });
    }
}