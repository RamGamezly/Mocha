const Discord = require('discord.js');

module.exports.run = (client, message, args) => { 
  
const mention = message.mentions.users.first();

        const randomAddonNum = Math.random();
        const randomAddon = randomAddonNum <= 0.1 ? " Someone call the police!" :
            randomAddonNum <= 0.2 && randomAddonNum > 0.1 ? " Wait! They missed!" :
                randomAddonNum <= 0.3 && randomAddonNum > 0.2 ? " Bam! Headshot!" : null;

        if (!mention || mention.id === message.author.id) return message.channel.send(`${message.author} just shot at themselves! :scream:${randomAddon || ""}`);
        message.channel.send(`${message.author} just shot at ${mention}! :scream:${randomAddon || ""}`);
    }
module.exports.help = {
    name: "shoot"
}