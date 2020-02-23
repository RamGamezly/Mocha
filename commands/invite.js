const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
    message.channel.send(`You can invite me with this link:\nhttps://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2147483127&scope=bot`)
}
module.exports.help = {
    name: "invite"
}