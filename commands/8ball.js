const Discord = require('discord.js');
var request = require('request');

var botname = "Ender"

module.exports = {
	name: '8ball',
	description: 'Magic 8Ball',
	async execute(message, args) {
        let q = message.content.split(' ')[1];
        if(q) {
            var items = ["For sure","Without a doubt","Most certainly","Try again later","Not today","My sources say no","Definate no","Yes","No","Obviously","I don't think so"]
            var item = items[Math.floor(Math.random()*items.length)];
            const embed = new Discord.MessageEmbed()
                .setTitle(`🎱 ${item}`)
                .setColor('#1e272e')
            message.channel.send(embed);
        }
        if(!q) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`🎱 Do you dare ask the magic 8ball a question?`)
                .setDescription(`Try again, but with a killer question.`)
                .setColor('#1e272e')
            message.channel.send(embed);            
        }
    },
}