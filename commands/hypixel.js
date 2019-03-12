const Discord = require('discord.js');
const { client, Util } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');
const config = require("../authorization.json");
const apikey = config.hypixel

function convert(unix){

    // Unixtimestamp
    var unixtimestamp = unix;
   
    // Months array
    var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    return `${day} ${month} ${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

   }

module.exports = {
	name: 'hypixel',
	description: 'Lookup information on a Hypixel User',
	async execute(message, args) {
        const argu = message.content.split(' ');
        fetch(`https://api.hypixel.net/player?key=${apikey}&name=${argu[1]}`, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then(async resp => {
            var hplayer = await resp.json();
            var player = hplayer.player
            var body = { expr: `(sqrt(${player.networkExp} + 15312.5) - 125/sqrt(2))/(25*sqrt(2))` }
            fetch(`http://api.mathjs.org/v4/`, {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(async resp => {
                var calclevel = await resp.json();
                var level = calclevel.result.split(".");
                fetch(`https://api.hypixel.net/findGuild?key=${apikey}&byUuid=${player.uuid}`, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(async resp => {
                    resp2 = await resp.json();
                    var guildid = resp2.guild;
                    fetch(`https://api.hypixel.net/guild?key=${apikey}&id=${guildid}`, {
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then(async resp => {
                        var resp1 = await resp.json();
                        var guildname = resp1.guild.name
                        var guildtag = resp1.guild.tag
                        if(player.uuid == '4686e7b58815485d8bc4a45445abb984') {
                            guildname = 'HVENetworks (best guild)'
                            guildtag = 'MYSQL'
                        }
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`🎮 Hypixel Info`)
                            .setAuthor(`${argu[1]}`, `https://minotar.net/avatar/${player.uuid}`)
                            .setThumbnail(`https://minotar.net/avatar/${player.uuid}`)
                            .addField("🆙 Level", level[0], true)
                            .addField("🎖 Karma", player.karma.toLocaleString(), true)
                            .addField("🚩 Guild", guildname, true)
                            .addField("<:nametag:536559485381246996> Guild Tag", `[${guildtag}]`, true)
                            .addField("📆 First Join", convert(player.firstLogin), true)
                            .addField("🕒 Last Login", convert(player.lastLogin), true)
                            .setColor("#f1c40f")
                        return message.channel.send(embed);
                    })
                })
                })
            })
        .catch(err => {
            console.log(err)
            const embed = new Discord.MessageEmbed()
                    .setTitle("❌ Error!")
                    .setDescription(`Cannot find the player \`${argu[1]}\``)
                    .setColor('#e74c3c')
                return message.channel.send(embed);                
        })

}}
