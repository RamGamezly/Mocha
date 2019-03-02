const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

module.exports = {
	name: 'setup',
	description: 'Setup Ender in your server',
	async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("👋 Hi, I'm Ender!")
            .setDescription("Hey there! I'm Ender, this setup shouldn't take long, I just need you to specify some channels and options. Whenever you are ready, type `ok`. 👍")
            .setColor('#3498db')
            .setFooter("When you are ready to start the setup say 'ok'", message.author.displayAvatarURL())
        const embed1 = await message.channel.send(embed);        
        try {
            var response = await message.channel.awaitMessages(message2 => message2.content == 'ok', {
                maxMatches: 1,
                time: 100000000,
                errors: ['time']
            });
        } catch (err) {
            console.error(err);
        }
        if(response.first().content == 'ok') {
            const embed = new Discord.MessageEmbed()
                .setTitle("✨ Step 1")
                .setDescription("**Epic**, I just need to know where to send join and leave messages for users. Just send the channel tag, and we can move on to the next step. 👌")
                .setColor('#f1c40f')
                .setFooter("When tagging a channel, it should look like this #channel-name, or #general.", message.author.displayAvatarURL())
            const embed1 = await message.channel.send(embed);   
            try {
                var response1 = await message.channel.awaitMessages(message2 => message2.content, {
                    maxMatches: 1,
                    time: 100000000,
                    errors: ['time']
                });
            } catch (err) {
                console.error(err);
            } 
            var valid = response1.first().mentions.channels.first().id;
            if(valid !== null) {
                db.set(`welcomechannel-${message.guild.id}`, valid)
                const embed = new Discord.MessageEmbed()
                    .setTitle("✨ Step 2")
                    .setDescription("**Awesome**, would you like me to stop command spam? I will set a 3 second delay on all commands. 🤔")
                    .setColor('#f1c40f')
                    .setFooter("Respond with yes or no.", message.author.displayAvatarURL())
                const embed1 = await message.channel.send(embed);   
                try {
                    var response2 = await message.channel.awaitMessages(message2 => message2.content == 'yes' || message2.content == 'no', {
                        maxMatches: 1,
                        time: 100000000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                }  
                const em = message.member.guild.createRole({
                    name: "Ender Muted",
                    color: "#e67e22",
                    permissions: []
                }).then(role => {
                    message.member.guild.channels.forEach(function(guild) { 
                        guild.overwritePermissions(role, { SEND_MESSAGES: false, ADD_REACTIONS: false, CONNECT: false, SPEAK: false });
                     });
                })
                if(response2.first().content == 'yes') {
                    db.set(`spamfilter-${message.guild.id}`, true)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("✨ Step 3")
                        .setDescription("Perfect, what would you like the welcome message to say? You can use `{{user}}`, `{{discriminator}}`, `{{joined}}`, `{{server}}`, and `{{id}}` as variables in your welcome message.")
                        .setColor('#f1c40f')
                        .setFooter("You can always change this in 'settings'", message.author.displayAvatarURL())
                    const embed1 = await message.channel.send(embed); 
                    try {
                        var response3 = await message.channel.awaitMessages(message2 => message2.content, {
                            maxMatches: 1,
                            time: 100000000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                    }  
                    if(response3.first().content) {
                        db.set(`welcomemessage-${message.guild.id}`, response3.first().content)  
                        const embed = new Discord.MessageEmbed()
                            .setTitle("✨ Step 4")
                            .setDescription("Looking good, what role would you like me to give people when they join? Send the name of the role here, and make sure there isn't any roles with the same name, I might get confused!")
                            .setColor('#f1c40f')
                            .setFooter("Send the name of the role here.", message.author.displayAvatarURL())
                        const embed1 = await message.channel.send(embed); 
                        try {
                            var response4 = await message.channel.awaitMessages(message2 => message2.content, {
                                maxMatches: 1,
                                time: 100000000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                        }  
                        if(response4.first().content) {
                            if(response4.first().mentions.channels.first().id !== null) {
                                db.set(`joinrole-${message.guild.id}`, response4.first().mentions.channels.first().id) 
                                const embed = new Discord.MessageEmbed()
                                    .setTitle("✨ All done!")
                                    .setDescription("Perfect, I've created the \`@Ender Muted\` role, and everything you typed should be set! Enjoy using Ender.")
                                    .setColor('#f1c40f')
                                    .setFooter("All done :)", message.author.displayAvatarURL())
                                const embed1 = await message.channel.send(embed); 
                            }
                        }
                }
            }
                if(response2.first().content == 'no') {
                    db.set(`spamfilter-${message.guild.id}`, false)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("✨ Step 3")
                        .setDescription("Perfect, what would you like the welcome message to say? You can use `{{user}}`, `{{discriminator}}`, `{{joined}}`, `{{server}}`, `{{id}}` and `\n` as variables in your welcome message.")
                        .setColor('#f1c40f')
                        .setFooter("You can always change this in 'settings'", message.author.displayAvatarURL())
                    const embed1 = await message.channel.send(embed); 
                    try {
                        var response3 = await message.channel.awaitMessages(message2 => message2.content, {
                            maxMatches: 1,
                            time: 100000000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                    }  
                    if(response3.first().content) {
                        db.set(`welcomemessage-${message.guild.id}`, response3.first().content)  
                        const embed = new Discord.MessageEmbed()
                            .setTitle("✨ Step 4")
                            .setDescription("Looking good, what role would you like me to give people when they join? Send the name of the role here, and make sure there isn't any roles with the same name, I might get confused!")
                            .setColor('#f1c40f')
                            .setFooter("Send the name of the role here.", message.author.displayAvatarURL())
                        const embed1 = await message.channel.send(embed); 
                        try {
                            var response4 = await message.channel.awaitMessages(message2 => message2.content, {
                                maxMatches: 1,
                                time: 100000000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                        }  
                        if(response4.first().content) {
                            if(response4.first().mentions.channels.first().id !== null) {
                                db.set(`joinrole-${message.guild.id}`, response4.first().mentions.channels.first().id) 
                                const embed = new Discord.MessageEmbed()
                                    .setTitle("✨ All done!")
                                    .setDescription("Perfect, I've created the \`@Ender Muted\` role, and everything you typed should be set! Enjoy using Ender.")
                                    .setColor('#f1c40f')
                                    .setFooter("All done :)", message.author.displayAvatarURL())
                                const embed1 = await message.channel.send(embed); 
                            }
                        }
                    }
                    }
                }
            }
        }
    }
