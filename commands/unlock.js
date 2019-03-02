const Discord = require('discord.js');

module.exports = {
	name: 'unlock',
	description: 'UnLock current channel.',
	async execute(message, client, args) {
        if(args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`lock\``)
                .setDescription("Lock current channel.")
                .addField("📘 Syntax", "`lock/unlock`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        if (message.member.hasPermission('MODIFY_GUILD')) {
                message.guild.roles.forEach(function(role) { 
                    message.channel.overwritePermissions(role, { SEND_MESSAGES: true, ADD_REACTIONS: true });
                })
                    if(message.channel.topic) {
                        var topic = message.channel.topic
                        var regex = "🔐 **Locked** - "
                        message.channel.setTopic(topic.replace(regex, ""));
                    }
                    let weEmbed = new Discord.MessageEmbed()
                        .setTitle(`🔐 Alright, \`#${message.channel.name}\` has been unlocked, this may take a few seconds to resolve.`)
                        .setColor("#3498db");
                    message.channel.send(weEmbed);                
        }
        else {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ No permission!`)
                .setDescription("You need the `Manage Server` permission to perform this command!")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed);  
        }
    }
}