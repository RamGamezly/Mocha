const Discord = require('discord.js');
var request = require('request');

var botname = "Mocha"

module.exports = {
	name: 'cat',
	description: 'kitteh',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`cat\``)
                .setDescription("View a random image of a cat")
                .addField("Syntax", "`cat`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        request('https://aws.random.cat/meow', function (error, response, body) {
            if(response && response.statusCode == '200') {
                obj = JSON.parse(body);
                const embed = new Discord.MessageEmbed()
                    .setTitle("much kitteh")
                    .setColor('#f1c40f')
                    .setImage(`${obj.file}`)
                message.channel.send(embed);
            }
        });
    },
}
