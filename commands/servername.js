const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = async (client,message,args) => {
        let output = '';
        client.guilds.forEach(function(guild){
            output += guild.name + ` - ${guild.memberCount} - ${guild.id}\n`;
        })
        return message.author.send(output);
}

module.exports.help = {
    names: ['servernames', 'sn'],
    usage: 'b-servernames',
    description: 'Get what servers I am in'
}