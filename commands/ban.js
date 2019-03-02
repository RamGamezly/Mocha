const Discord = require('discord.js');

var botname = "Ender"

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    async execute(message, client, args) {
        if(args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`ban\``)
                .setDescription("Ban a user from the server")
                .addField("📘 Syntax", "`ban @User <reason>`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        if(!args[0]) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ Missing argument!`)
                .setDescription("You need to specify a user or a user ID and a reason.")
                .addField("📘 Syntax", "`ban @User <reason>`")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed); 
        }
        if(!args[1]) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ Missing argument!`)
                .setDescription("You need to specify a user or a user ID and a reason.")
                .addField("📘 Syntax", "`ban @User <reason>`")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed); 
        }
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ No permission!`)
                .setDescription("You need the `Ban Members` permission to perform this command!")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed);             
        }
        if(message.member.hasPermission("BAN_MEMBERS")) {
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(bUser.hasPermission("MANAGE_MESSAGES")) {
                let weEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ No permission!`)
                    .setDescription("You can't ban this user because they have the `Manage Messages` permission.")
                    .setColor("#e74c3c");
                return message.channel.send(weEmbed);                    
            }
            if(!bUser.hasPermission("MANAGE_MESSAGES")) {
                if(bUser == null) {
                    if(!args[0]) {
                        let weEmbed = new Discord.MessageEmbed()
                            .setTitle(`❌ Missing argument!`)
                            .setDescription("You need to specify a user or a user ID and a reason.")
                            .addField("📘 Syntax", "`ban @User <reason>`")
                            .setColor("#e74c3c");
                        return message.channel.send(weEmbed); 
                    }
                    else {
                        let weEmbed = new Discord.MessageEmbed()
                            .setTitle(`❌ User not found!`)
                            .setColor("#e74c3c");
                        return message.channel.send(weEmbed);  
                    }            
                }
                else {
                    if(args[0]) { 
                        if(args[1]) { 
                            let bReason = args.join(" ").slice(22);
                            message.guild.member(bUser).ban(bReason).then(i => {
                                let weEmbed = new Discord.MessageEmbed()
                                    .setTitle(`👌 Alright, banned \`${bUser.user.username}#${bUser.user.discriminator}\` for \`${bReason}\`.`)
                                    .setColor("#3498db");
                                return message.channel.send(weEmbed); 
                            }).catch(err => {
                                console.log(err);
                                const embed = new Discord.MessageEmbed()
                                  .setTitle("❌ Error!")
                                  .setColor("#e74c3c")
                                  .setDescription(`This error has been logged and will be reviewed by the developers.\`\`\`vbs\n[1] ${err}\`\`\``)
                                message.channel.send(embed);
                                const errEmbed = new Discord.MessageEmbed()
                                  .setTitle("❌ Error!")
                                  .setColor("#e74c3c")
                                  .setDescription(`An error occoured while \`${message.author.username}#${message.author.discriminator}\` tried to run \`ban\` in \`${message.author.guild.name}\`.\`\`\`vbs\n[1] ${err}\`\`\``)
                                client.channels.get("547746237454090260").send(errEmbed)          
                            });
                        }                
                    }
                }
            }
        }
    }
}