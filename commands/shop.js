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
                .then(async collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '📦') {
                        const shop_loot_chests = new Discord.MessageEmbed()
                            .setTitle("📦 Loot boxes")
                            .setDescription("Purchase loot boxes and unlock goods. To buy, click the loot box reaction you want to buy.")
                            .addField("<:common_package:561666741256847360> Common", `Price - \`$1,500\``)
                            .addField("<:rare_package:561666550633988142> Rare", `Price - \`$5,000\``)
                            .addField("<:epic_package:561666549933670432> Epic", `Price - \`$10,000\``)
                            .addField("<:legendary_package:561666550222815233> Legendary", `Price - \`$20,000\``)
                            .addField("<:divine_package:561666550684450836> Divine", `Price - \`$50,000\``)
                            .setColor("#c1694f")
                            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                        const shop_lb = await shop.edit(shop_loot_chests)
                        shop_lb.reactions.removeAll()
                        shop_lb.react('561666741256847360');
                        shop_lb.react('561666550633988142');
                        shop_lb.react('561666549933670432');
                        shop_lb.react('561666550222815233');
                        shop_lb.react('561666550684450836');

                        const lb_filter = (reaction, user) => {
                            user.id === message.author.id;
                        };

                        shop_lb.awaitReactions(lb_filter, { time: 60000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();

                                const bal = db.fetch(`balance-${message.user.id}`)

                                if (reaction.emoji.id === '561666741256847360') { //common loot box
                                    if(Math.sign(bal - 1500) !== -1) {
                                        db.remove(`balance-${message.user.id}`, 1500)
                                        message.reply("Purchased a common loot box")
                                    }
                                    else {
                                        const insufficient_funds = new Discord.MessageEmbed()
                                            .setTitle("⚠ Insufficient funds")
                                            .setDescription("You cannot afford a Common Loot Box.")
                                        shop_lb.edit(insufficient_funds)
                                    }
                                }
                            
                                if (reaction.emoji.id === '561666550633988142') { //rare loot box
                                    if(Math.sign(bal - 5000) !== -1) {
                                        db.remove(`balance-${message.user.id}`, 5000)
                                        message.reply("Purchased a rare loot box")
                                    }
                                    else {
                                        const insufficient_funds = new Discord.MessageEmbed()
                                            .setTitle("⚠ Insufficient funds")
                                            .setDescription("You cannot afford a Rare Loot Box.")
                                        shop_lb.edit(insufficient_funds)
                                    }                                    
                                }
                            
                                if (reaction.emoji.id === '561666549933670432') { //epic loot box
                                    if(Math.sign(bal - 10000) !== -1) {
                                        db.remove(`balance-${message.user.id}`, 10000)
                                        message.reply("Purchased an Epic loot box")
                                    }
                                    else {
                                        const insufficient_funds = new Discord.MessageEmbed()
                                            .setTitle("⚠ Insufficient funds")
                                            .setDescription("You cannot afford an Epic Loot Box.")
                                        shop_lb.edit(insufficient_funds)
                                    }                                     
                                }
                            
                                if (reaction.emoji.id === '561666550222815233') { //legendary loot box
                                    if(Math.sign(bal - 20000) !== -1) {
                                        db.remove(`balance-${message.user.id}`, 20000)
                                        message.reply("Purchased a Legendary loot box")
                                    }
                                    else {
                                        const insufficient_funds = new Discord.MessageEmbed()
                                            .setTitle("⚠ Insufficient funds")
                                            .setDescription("You cannot afford a Legendary Loot Box.")
                                        shop_lb.edit(insufficient_funds)
                                    }                                     
                                }
                            
                                if (reaction.emoji.id === '561666550684450836') { //divine loot box + how tf do u have that much money
                                    if(Math.sign(bal - 50000) !== -1) {
                                        db.remove(`balance-${message.user.id}`, 50000)
                                        message.reply("Purchased a Divine loot box")
                                    }
                                    else {
                                        const insufficient_funds = new Discord.MessageEmbed()
                                            .setTitle("⚠ Insufficient funds")
                                            .setDescription("You cannot afford a Divine Loot Box.")
                                        shop_lb.edit(insufficient_funds)
                                    }                                     
                                }
                            }
                        );
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