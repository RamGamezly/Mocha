const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client();
const fs = require("fs");
const { Util } = require("discord.js");
const server = require('./server.js');
var request = require("superagent");
const ManagedGuild = require('./guild.js');
const Debug = require('debug');
const log = Debug('bot');
const statsLog = Debug('stats');
const inviteLog = Debug('invites');
const updateLog = Debug('bot-update');

client.commands = new Discord.Collection();

var prefix = "^"

client.on('rateLimit', (info, limit, timeDiff, path, method) => {
    log('bot hit rate limit', info)
})
client.on('error', err => {
    log('bot thrown error', err)
})
client.on('warn', warning => {
    log('bot thrown warning', warning)
})

function hasSendPermission (channel) {
    return channel.type === 'text' && channel.memberPermissions(channel.guild.me).has('SEND_MESSAGES')
}

function mainChannel (guild) {
    if (guild.systemChannelID) {
        const systemChannel = guild.channels.get(guild.systemChannelID)
        if (hasSendPermission(systemChannel)) {
            return systemChannel
        }
    }

    const general = guild.channels.find(channel => /^(general|main|chat)$/.test(channel.name))
    if (general && hasSendPermission(general)) {
        return general
    }

    const sorted = guild.channels.sort((chanA, chanB) => {
        if (!hasSendPermission(chanA)) return -1
        return chanA.position < chanB.position ? -1 : 1
    })
    const bestPossible = sorted.first()

    return bestPossible
}

client.on("ready", () => {
    console.log("Index2.js is online!.");
});
client.on('ready', () => {
    console.log("You are connected to " + client.guilds.size + " servers!");
});

client.on('disconnect', event => {
    log('bot disconnected from discord', event)
    process.exit(1)
})
client.on('guildCreate', guild => {
    log(`client joined guild ${guild.id} (${guild.name})`)
    mainChannel(guild).send({
        embed: new Discord.RichEmbed()
            .setTitle('Chole Chan')
            .setDescription(`Thanks for adding me to your Discord server!\nUse "^help" to get help using Me.`)
            .setFooter('Chole Chan HQ Server - https://discord.gg/DNYukjT')
    })
})

client.login(config.token)
  