const Discord = require('discord.js');
const { client, Util } = require('discord.js');

var botname = "Ender"

module.exports = {
	name: 'scratchcard',
	description: 'Scrachcards!',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`scratchcard\``)
                .setDescription("Scratchcards!")
                .addField("📘 Syntax", "`scratchcard`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        var chance = Math.random();
        if (chance < 0.3) {
            const embed = new Discord.MessageEmbed()
                .setTitle("💳 Scratch card")
                .setDescription("||⭐ WINNER ⭐|||| - You earned 5 gold||")
                .setColor('#eb4d4b')     
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())   
            message.channel.send(embed);
        }
        else if(chance > 0.3) {
            const embed = new Discord.MessageEmbed()
                .setTitle("💳 Scratch card")
                .setDescription("||😞 LOSER 😞|||| - You lost 5 gold||")
                .setColor('#eb4d4b')     
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())   
            message.channel.send(embed);            
        }
    }
}