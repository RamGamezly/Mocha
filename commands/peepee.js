const Discord = require('discord.js');
var request = require('request');

var botname = "Ender"

module.exports = {
	name: 'penis',
	description: 'check pp size',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`penis\``)
                .setDescription("Get your PP size")
                .addField("📘 Syntax", "`penis`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }

        var random = parseInt(Math.round(Math.floor(Math.random() * 20) + 1));

        var pp = "8";

        [...Array(random)].forEach((_, i) => {
            pp = pp + "="
        });

        const embed = new Discord.MessageEmbed()
            .setTitle(`🍆 ${message.author.username}, your peepee size is...`)
            .setDescription(`${pp}D`)
            .setColor("#9b59b6")
        message.channel.send(embed)
    },
}