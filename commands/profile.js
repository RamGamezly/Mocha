const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
var Vibrant = require('node-vibrant');
const rgbHex = require('rgb-hex');
const db = require("quick.db");

module.exports = {
    name: 'p',
    description: 'View a user\'s profile',
    aliases: ['profile', 'user', 'userinfo'],
	async execute(message, client, args) {
        const palette = await Vibrant.from(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`).getPalette();
        var hex = rgbHex(`rgb(${palette.Vibrant._rgb[0]}, ${palette.Vibrant._rgb[1]}, ${palette.Vibrant._rgb[2]})`);
        let status = {
            online: `<:online:313956277808005120> Online`,
            idle: `<:away:313956277808005120> Away`,
            dnd: `<:dnd:313956276893646850> Do not disturb`,
            offline: `<:offline:313956277808005120> Offline`
        }
        const balance = db.fetch(`balance-${message.author.id}`)
        const bbalance = db.fetch(`bankbalance-${message.author.id}`)
        const user = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("✨ User Profile")
            .setColor(`#${hex}`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=1024`)
            .addField("🏷 Username", `**${message.author.username}**#${message.author.discriminator}`)
            .addField("⭐ Status", status[message.member.presence.status])
            .addField("💸 Balance", `$${balance.toLocaleString()}`, true)
            .addField("🏦 Bank Balance", `$${bbalance.toLocaleString()}`, true)
        const embed = await message.channel.send(user)
        if(message.member.presence.activity && message.member.presence.activity.name === 'Spotify') {
            embed.react("🎧")
        }

        const filter = (reaction, user) => {
            return '🎧'.includes(reaction.emoji.name) && user.id === message.author.id;
        };

        embed.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '🎧') {
                const spotify = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle("🎧 Listening to Spotify")
                    .setColor(`#${hex}`)
                    .setThumbnail(message.member.presence.activity.assets.largeImageURL())
                    .addField("💿 Song Title", message.member.presence.activity.details)
                    .addField("🎼 Song Author", `by ${message.member.presence.activity.state}`)
                    .addField("💽 Song Album", message.member.presence.activity.assets.largeText)
                embed.edit(spotify)
                embed.reactions.removeAll()
            }
        })


    }
}