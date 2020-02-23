const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (client, message, args) => {
        let results = ['Love will lead the way.',
        'If your desires are not extravagant, they will be rewarded.',
        'A new outlook brightens your image and brings new friends.',
        'You are not judged by your efforts you put in; you are judged on your performance.',
        'Sometimes you just need to lay on the floor.',
        'Integrity is the essence of everything successful.',
        'You have an unusually magnetic personality.',
        'Let your fantasies unwind...',
        'Accept what comes to you each day.',
        'Joys are often the shadows, cast by sorrows.',
        'You will always be successful in your professional career',
        'Don\'t bother looking for fault. The reward for finding it is low.',
        'Keep your eye out for someone special.',
        'Follow your bliss and the Universe will open doors where there were once only walls.'];
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}'s Fortune`)
        .setColor('#50BB7C')
        .addField('Fortune', results[Math.floor(Math.random() * results.length)])
        .addFooter(embed, client, message, args);
        return message.channel.send(embed);
}

module.exports.help = {
    names: 'fortuneteller'
}