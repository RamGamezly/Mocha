const Discord = require('discord.js');
const ms = require("ms");

var botname = "Ender"

module.exports = {
    name: 'mute',
    description: 'Mute a user for a set time',
    async execute(message, client, args) {
        if(args[0] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`mute\``)
                .setDescription("Mute a user for a set time")
                .addField("📘 Syntax", "`mute @User <time>`")
                .addField("🕒 Time Types", "`s, m, h, d`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        if(!args[0]) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ Missing argument!`)
                .setDescription("You need to specify a user and the length of time.")
                .addField("📘 Syntax", "`mute @User <time>`")
                .addField("🕒 Time Types", "`s, m, h, d`")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed); 
        }
        if(!args[1]) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ Missing argument!`)
                .setDescription("You need to specify a user and the length of time.")
                .addField("📘 Syntax", "`mute @User <time>`")
                .addField("🕒 Time Types", "`s, m, h, d`")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed); 
        }
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ No permission!`)
                .setDescription("You need the `Manage Messages` permission to perform this command!")
                .setColor("#e74c3c");
            return message.channel.send(weEmbed);             
        }
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(bUser.hasPermission("MANAGE_MESSAGES")) {
                let weEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ No permission!`)
                    .setDescription("You can't mute this user because they have the `Manage Messages` permission.")
                    .setColor("#e74c3c");
                return message.channel.send(weEmbed);                    
            }
            if(!bUser.hasPermission("MANAGE_MESSAGES")) {
                if(bUser == null) {
                    if(!args[0]) {
                        let weEmbed = new Discord.MessageEmbed()
                            .setTitle(`❌ Missing argument!`)
                            .setDescription("You need to specify a user and the length of time.")
                            .addField("📘 Syntax", "`mute @User <time>`")
                            .addField("🕒 Time Types", "`s, m, h, d`")
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
                            let mutetime = args[1];
                            let muterole = message.guild.roles.find(`name`, "Ender Muted");
                            if(!muterole) {
                                const em = message.member.guild.createRole({
                                    name: "Ender Muted",
                                    color: "#e67e22",
                                    permissions: []
                                }).then(role => {
                                    message.member.guild.channels.forEach(function(guild) { 
                                        guild.overwritePermissions(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
                                     });
                                })
                                let weEmbed = new Discord.MessageEmbed()
                                    .setTitle(`❗ Please re-type the command, something went wrong.`)
                                    .setColor("#e74c3c");
                                message.channel.send(weEmbed);
                            }
                            else {
                                await(bUser.addRole(muterole.id));
                                let weEmbed = new Discord.MessageEmbed()
                                    .setTitle(`👌 Alright, muted \`${bUser.user.username}#${bUser.user.discriminator}\` for \`${ms(ms(mutetime))}\`.`)
                                    .setColor("#3498db");
                                message.channel.send(weEmbed);
                              
                                setTimeout(function(){
                                  bUser.removeRole(muterole.id);
                                  let weEmbed = new Discord.MessageEmbed()
                                        .setTitle(`⏰ \`${bUser.user.username}#${bUser.user.discriminator}\` has been unmuted.`)
                                        .setColor("#3498db");
                                  message.channel.send(weEmbed);
                              }, ms(mutetime));
                            }
                        }                
                    }
                }
            }
        }
    }
}