const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'help',
	description: 'Pls help!',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`help\``)
                .setDescription("Good job, you found the 🥚 Easter Egg")
                .addField("📘 Syntax", "`help`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        let prefix = await db.fetch(`prefix-${message.guild.id}`);
        let embed = new Discord.MessageEmbed()
            .setTitle(`✨ Hi! I'm Ender!`)
            .setDescription(`I'm **Ender**, the only bot you'll ever need.\n\nThe prefix for all commands here is \`${prefix}\`.`)
            .addField("📘 General", "`bot, ping, help, settings, p`")
            .addField("👢 Moderation", "`purge, ban, kick, mute`")
            .addField("🎉 Fun", "`8ball, cat, scratchcard, slots, hypixel`")
            .addField("💸 Economy", "`bank, bank bal, bank work, bank resign, bank crime, bank withdraw, bank deposit, bank hack`")
            .addField("🎧 Music", "`play, stop, now, pause, resume, earrape`")
            .addField("👀 Administrative", "`eval, speedtest`\n\nYou can get more information on a command by typing it followed by `help`.")
            .setColor("#3498db")
            .setTimestamp(Date.now())
            //.setThumbnail("https://cdn-proxy.ender.site/img/wave-emote.png")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        message.channel.send(embed)     
    }
}