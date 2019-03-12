const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Delete a certain amount of messages',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`purge\``)
                .setDescription("Delete a certain amount of messages")
                .addField("📘 Syntax", "`purge [@User] <amount>`")
                .addField("👑 Permission Needed", "`Manage Messages`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            const user = message.mentions.users.first();
            // Parse Amount
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
            if (!amount) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`❌ Missing arguments!`)
                    .setDescription("You must specify an amount of messages to delete, or the amount you typed was not a number.")
                    .addField("📘 Syntax", "`purge [@User] <amount>`")
                    .setColor('#e74c3c')
                return message.channel.send(embed)           
            }
            if (!amount && !user) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`❌ Missing arguments!`)
                    .setDescription("You must specify an amount of messages to delete, or the amount you typed was not a number.")
                    .addField("📘 Syntax", "`purge [@User] <amount>`")
                    .setColor('#e74c3c')
                return message.channel.send(embed)               
            }
            // Fetch 100 messages (will be filtered and lowered up to max amount requested)
            message.channel.messages.fetch({
             limit: amount,
            }).then((messages) => {
             if (user) {
             const filterBy = user ? user.id : Client.user.id;
             messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
             message.channel.bulkDelete(messages).catch(error => console.log(error.stack)).then(i => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🗑 Deleted \`${amount}\` messages from \`${user.username}#${user.discriminator}\` in \`#${message.channel.name}\``)
                    .setColor('#ecf0f1')
                return message.channel.send(embed).then(msg => {
                    msg.delete(5000)
                  })                 
             });        
             }
             else {
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack)).then(i => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🗑 Deleted \`${amount}\` messages in \`#${message.channel.name}\``)
                        .setColor('#ecf0f1')
                    return message.channel.send(embed).then(msg => {
                        msg.delete(5000)
                      })             
                 });
             }
            })
            .catch(error => {
                if(error.message == 'Invalid Form Body\nlimit: int value should be less than or equal to 100.') {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`❌ You cannot delete more than 100 messages at a time.`)
                        .setColor('#e74c3c')
                    return message.channel.send(embed)                   
                }
                else { console.log(error) }
            })
        }
        else {
            const embed = new Discord.MessageEmbed()
                .setTitle(`❌ No permission!`)
                .setDescription("You must have the `Manage Messages` permission to perform this command.")
                .setColor('#e74c3c')
            return message.channel.send(embed)            
        }

    }
}