const Discord = require('discord.js');

var botname = "Ender"

module.exports = {
    name: 'ping',
    description: 'Check the ping of the bot and discord.',
    async execute(message, client, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`ping\``)
                .setDescription("Check the ping of the bot and the ping to discord.")
                .addField("📘 Syntax", "`ping`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        const m = await message.channel.send("🏓");
        const embed = new Discord.MessageEmbed()
            .setColor('#9b59b6')
            .setDescription(`:ping_pong: ${m.createdTimestamp - message.createdTimestamp}ms\n :heartpulse: ${Math.round(client.ping)}ms`);
        m.edit(embed);
    },
};