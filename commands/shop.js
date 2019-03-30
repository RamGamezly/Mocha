const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');

const client = new Discord.Client();

module.exports = {
	name: 'shop',
	description: 'Purchase loot boxes and cosmetics',
	async execute(message, client, args) {
        let bal = await db.fetch(`balance-${message.member.id}`);
        if(args[0] == 'help' || !args[0]) {
            let bankno = db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`🛒 Store`)
                    .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                    .setColor("#c1694f")
                return message.channel.send(eEmbed); 
            }
            let eEmbed = new Discord.MessageEmbed()
                .setTitle(`🛒 Store`)
                .addField("📦 Loot boxes", "Purchase loot boxes")
                .addField("🍹 Boosters", "Buy coin multipliers when working")
                .setDescription(`Your current balance is \`$${bal.toLocaleString()}\`.`)
                .setColor("#c1694f")
            const shop = await message.channel.send(eEmbed);  

            shop.react('📦').then(() => shop.react('🍹'));

            const filter = (reaction, user) => {
                return ['📦', '🍹'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            shop.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '📦') {
                        shop.edit("Loot chests")
                        shop.reactions.removeAll()
                    }
                    if (reaction.emoji.name === '🍹') {
                        shop.edit("Boosters")
                        shop.reactions.removeAll()
                    }
                });
        }
        if(args[0]) {

        }

    }
}