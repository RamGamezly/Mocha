const db = require('quick.db');
const Discord = require('discord.js');
var Vibrant = require('node-vibrant')
const rgbHex = require('rgb-hex');

async function getVibrant(url) {

}

module.exports = {
    name: 'np',
    description: 'Now playing',
    async execute(message, client, args) {
        const np = db.fetch(`nowplaying-${message.guild.id}`);
        if(np.song) {
            Vibrant.from(np.song.thumbnail).getPalette()
            .then((palette) => {
                var r = palette.Vibrant._rgb[0]
                var g = palette.Vibrant._rgb[1]
                var b = palette.Vibrant._rgb[2]
                var hex = rgbHex(`rgb(${r}, ${g}, ${b})`);
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🎶 Now playing in \`${message.guild.name}\``)

                    .setDescription(`There are a total of \`${np.queuesize}\` tracks in the queue.`)
                    .setColor(`#${hex}`)
                    .setFooter(`Added by ${np.song.addedby.username}`, np.song.addedby.displayAvatarURL())
                    .setThumbnail(np.song.thumbnail)
                message.channel.send(embed);   
        });         
        }
        else {

        }
    }
}