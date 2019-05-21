const { Client, RichEmbed } = require('discord.js');
const yt = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const Discord = require('discord.js');
const ytapi = require('simple-youtube-api');
const db = require("quick.db");
const log = require('../utils/logger')

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

var el = ['217562587938816000', '287698408855044097']

module.exports = {
    name: 'eval',
    description: '[DEV] Evaluate stuff',
    async execute(message, client, args) {
        if(el.includes(message.author.id)) {
            try {
                const code = args.join(" ");
                let evaled = eval(code);
 
                if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);
 
                message.channel.send(clean(evaled), {code:"xl"});
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
        if(!el.includes(message.author.id)) {
            const embed = new Discord.MessageEmbed()
                .setTitle("❌ Error!")
                .setColor('#eb4d4b')
                .setDescription(`No permission to perform that.`)
            message.channel.send(embed);    
        }   
    }
}