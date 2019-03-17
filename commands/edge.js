const { Client, MessageAttachment } = require('discord.js');

module.exports = {
	name: 'edge',
	description: 'Ender edge.',
	async execute(message, client, args) {
        if(args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`edge\``)
                .setDescription("Ender edge.")
                .addField("📘 Syntax", "`edge`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        else {
            const attachment = new MessageAttachment('https://bot.ender.site/img/enderedgev6.png');
            message.channel.send(attachment);
        }
    }
}