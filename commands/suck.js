const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("you can't suck nobody")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${message.author.username} sucks ${user}`,{
                embed: {
                    image: {
                        url: "https://media.discordapp.net/attachments/334753494604972032/674388016176824381/1483380940_ice.gif?width=400&height=224"
                    }
                }
            })
}
module.exports.help = {
    name: "suck"
}
