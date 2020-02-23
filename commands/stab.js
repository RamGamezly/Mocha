const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
const mention = message.mentions.users.first();

        const randomAddon = Math.random() <= 0.25;

        if (!mention || mention.id === message.author.id) return message.channel.send(`${message.author} just stabbed themselves! :dagger::scream:${randomAddon ? ` Someone call the police!` : ""}`);
        message.channel.send(`${message.author} just stabbed ${mention}! :dagger::scream:${randomAddon ? ` Someone call the police!` : ""}`);
    }

module.exports.help = {
    name: "stab"
}
