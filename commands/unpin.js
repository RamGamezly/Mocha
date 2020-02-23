const Discord = require('discord.js')

exports.run = (bot, message, args, tools) => {
  
                let embed = new Discord.RichEmbed();
                message.channel.fetchMessage(args[0]).then(msg => {
                    msg.unpin();
                    embed.addField("Success", ":white_check_mark: Message unpinned.");
                    message.channel.send({ embed }).then(msg => (msg));
                                });
            }     
  module.exports.help = {
name: "unpin"
}
