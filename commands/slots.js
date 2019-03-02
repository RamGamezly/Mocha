const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'slots',
	description: 'Slot machine',
	async execute(message, args) {
            const argu = message.content.split(' ');
            if(argu[1] == 'help') {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`⁉ Help for \`slots\``)
                    .setDescription("Roll the slot machine")
                    .addField("📘 Syntax", "`slots`")
                    .setColor('#3498db')
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                return message.channel.send(embed)   
            }
        let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));
        let name = message.author.name;
        let aicon = message.author.displaydisplayAvatarURL();

        if (slots[result1] === slots[result2] && slots[result3]) {
            let wEmbed = new Discord.MessageEmbed()
                .setFooter(`Requested by ${name}`, aicon)
                .setTitle(':slot_machine: Slots')
                .setDescription(`You won ${name}!`)
                .addField(slots[result1] + slots[result2] + slots[result3], true)
                .setColor("#f4e842");
            message.channel.send(wEmbed);
        } else {
            let embed = new Discord.MessageEmbed()
                .setFooter(`Requested by ${name}`, aicon)
                .setTitle(':slot_machine: Slots')
                .setDescription(`You lost ${name}!`)
                .addField(slots[result1] + slots[result2] + slots[result3], true)
                .setColor("#f4e842");
            message.channel.send(embed);
}}}