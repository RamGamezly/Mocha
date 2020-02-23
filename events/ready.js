const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const superagent = require("superagent")
const { createSQLDb } = require('../assets/handlers/createDb');
module.exports = async (client, guild, files) => {
    await createSQLDb();
    fs.readdir("./commands/", (err, files) => {
        const filez = files.length
        if (err) return console.error(err);
        console.log(`Loaded ${filez + 11} commands successfully!`)
    })
    console.log(`[READY] Logged in as ${client.user.tag}! (${client.user.id})`);
}