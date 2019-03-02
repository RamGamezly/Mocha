const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const db = require('quick.db');

const client = new Discord.Client();

module.exports = {
	name: 'reload',
	description: 'Reload a command file.',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`reload\``)
                .setDescription("Reload a command file. Ends in `.js`.")
                .addField("📘 Syntax", "`reload <filename>.js`")
                .setColor('#3498db')
        }
        else {
            if (message.author.id !== "217562587938816000") {
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle('❌ No permission!')
                    .setDescription(`You don't have permission to do this.`)
                    .setColor("#e74c3c");
                return message.channel.send(wEmbed);                 
            }
            else {
                try {
                    delete require.cache[require.resolve(`./${argu[1]}.js`)];
                    console.log(`Reloaded ${argu[1]}.js`);
                } catch (e) {
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`❌ Error while reloading \`${argu[1]}.js\``)
                        .setDescription(e)
                        .setColor("#e74c3c");
                    return message.channel.send(wEmbed);                 
                }
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`👌 Reloaded \`${argu[1]}.js\``)
                    .setColor("#f1c40f");
                return message.channel.send(wEmbed);   
            }
        }

    }}