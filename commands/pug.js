const Discord = require('discord.js');
var request = require('request');

var botname = "Ender"

module.exports = {
	name: 'pug',
	description: 'puggo',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`pug\``)
                .setDescription("View a random image of a pug")
                .addField("📘 Syntax", "`pug`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        request('https://dog.ceo/api/breed/pug/images/random', function (error, response, body) {
            if(response && response.statusCode == '200') {
                obj = JSON.parse(body);
                const embed = new Discord.MessageEmbed()
                    .setTitle("<:pug:547814548518862908> puggo")
                    .setColor('#f8c291')
                    .setImage(`${obj.message}`)
                message.channel.send(embed);
            }
        });
    },
}