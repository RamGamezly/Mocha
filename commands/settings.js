const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

module.exports = {
	name: 'settings',
	description: 'Server settings',
	async execute(message, client, args) {
        if(args[0] === 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⚙ Server Settings`)
                .setDescription("Modify settings for this server.")
                .addField("❗ Prefix", "You can edit the prefix for all commands by typing `settings prefix <value>`, to add spaces use `__` as a space.")
                .addField("🕒 Antispam", "You can toggle antispam by typing `settings antispam`")
                .addField("👋 Welcome Message", "You can edit the welcome message by typing `settings joinmsg`")
                .addField("#⃣ Welcome Channel", "You can edit the join message channel by typing `settings joinchannel <channel>`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        if(!args[0]) {
            let wc = await db.fetch(`welcomechannel-${message.guild.id}`);
            let wmsg = await db.fetch(`welcomemessage-${message.guild.id}`);
            let prefix = await db.fetch(`prefix-${message.guild.id}`);
            let as = await db.fetch(`spamfilter-${message.guild.id}`);
            if(as == true) {
                as = "**Anti Spam** is enabled."
            }
            else {
                as = "**Anti Spam** is disabled."
            }
            nwmsg = wmsg.replace(/`/g, "'")
            const embed = new Discord.MessageEmbed()
                .setTitle(`⚙ Server Config`)
                .setDescription("The current configuration for this server. You can type `settings help` for a list of commands.")
                .addField("❗ Prefix", `\`${prefix}\``)
                .addField("🕒 Antispam", `${as}`)
                .addField("👋 Welcome Message", `\`\`\`vbs\n${nwmsg}\`\`\``)
                .addField("#⃣ Welcome Channel", `<#${wc}>`)
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            message.channel.send(embed)             
        }
        if(message.author.id !== '217562587938816000') {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle('❌ No permission!')
                    .setDescription(`You don't have permission to change this server's settings.`)
                    .setColor("#e74c3c");
                return message.channel.send(wEmbed);           
            }              
        }
        if(args[0] == 'prefix') {
            if(args[1]) {
                var prefix = args[1];
                var newprefix = prefix.replace(/"/g, " ");
                db.set(`prefix-${message.guild.id}`, newprefix)
                message.guild.me.setNickname(`Ender [${newprefix}]`)
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`👍 Prefix is now set to \`${newprefix}\``)
                    .setColor("#f1c40f");
                message.channel.send(wEmbed);                     
            }
            if(!args[1]) {
                let weEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Missing argument!`)
                    .setDescription("You must specify something you want to change this server's prefix to.")
                    .addField("📘 Syntax", "`settings prefix <prefix>`")
                    .setColor("#e74c3c");
                message.channel.send(weEmbed);                 
            }
        }
        if(args[0] == 'antispam') {
            let spamfilter = await db.fetch(`spamfilter-${message.guild.id}`);
            if(spamfilter == false) {
                var value = true;
                db.set(`spamfilter-${message.guild.id}`, value)
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`👍 Antispam is now enabled on commands.`)
                        .setColor("#f1c40f");
                    return message.channel.send(wEmbed);   
            }
            if(spamfilter == true) {
                var value = false;
                db.set(`spamfilter-${message.guild.id}`, value)
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`👍 Antispam is now disabled on commands.`)
                        .setColor("#f1c40f");
                    return message.channel.send(wEmbed);   
            }
            if(spamfilter == null) {
                var value = true;
                db.set(`spamfilter-${message.guild.id}`, value)
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`👍 Antispam is now enabled on commands.`)
                        .setColor("#f1c40f");
                    return message.channel.send(wEmbed);  
            }
        }
        if(args[0] == 'joinmsg') {
            if(!args[1]) {
            const embed = new Discord.MessageEmbed()
                .setTitle("👋 Join Message")
                .setDescription("You can specify your join message by typing `settings joinmsg <message>`. You can also use all them variables below in your message.")
                .addField("<:nametag:536559485381246996> `{{user}}`", `Returns '${message.author.username}'`, true)
                .addField("<:nametag:536559485381246996> `{{discriminator}}`", `Returns '${message.author.discriminator}'`, true)
                .addField("<:nametag:536559485381246996> `{{joined}}`", `Returns '${message.author.createdAt.toGMTString()}'`)
                .addField("<:nametag:536559485381246996> `{{server}}`", `Returns '${message.guild.name}'`)
                .addField("<:nametag:536559485381246996> `{{id}}`", `Returns '${message.author.id}'`)
                .addField("<:nametag:536559485381246996> `{{membercount}}`", `Returns '${message.guild.memberCount}'`)
                .addField("<:nametag:536559485381246996> `\\n`", `Returns a new line`)
                .setColor('#f1c40f')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            const embed1 = await message.channel.send(embed);  
            }          
        if(args[1]) {
            var pprefix = db.fetch(`prefix-${message.guild.id}`)
            var fargs = args.splice(2);
            var fargsss = fargs.join(" ");
            var fargss = `${fargsss}`
            var fwmsg = fargss.replace(/{{user}}/g, message.author.username)
            var fwmsg1 = fwmsg.replace(/{{discriminator}}/g, message.author.discriminator)
            var fwmsg2 = fwmsg1.replace(/{{joined}}/g, message.author.createdAt.toGMTString())
            var fwmsg3 = fwmsg2.replace(/{{server}}/g, message.guild.name)
            var fwmsg4 = fwmsg3.replace(/{{id}}/g, message.author.id)
            var fwmsg5 = fwmsg4.replace(/{{membercount}}/g, message.guild.memberCount)
            var fwmsg6 = fwmsg5.replace(/\n/g, "\n")
            db.set(`welcomemessage-${message.guild.id}`, fargss)
            let wEmbed = new Discord.MessageEmbed()
                .setTitle(`👍 Join Message has been set.`)
                .addField("🇵 Preview", fwmsg6)
                .setColor("#f1c40f");
            message.channel.send(wEmbed);             
        }
    }
    if(args[0] == 'joinchannel') {
        if(args[1]) {
            var regex = /<#([0-9]+)>/g;
            var result = args[1].match(regex);
            if(result) {
                var a = args[1].replace("<#", "")
                var b = a.replace(">", "")
                db.set(`welcomechannel-${message.guild.id}`, b)
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`👍 Join Channel has been set.`)
                    .setColor("#f1c40f");
                return message.channel.send(wEmbed);   
            }
            else {
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ That doesn't look like a channel.`)
                    .setColor("#e74c3c");
                return message.channel.send(wEmbed);  
            }
        }
    }
    }
}