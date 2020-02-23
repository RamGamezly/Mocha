const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {   

        const sides = args[1] || 6;

        if (sides < 2 || sides > 100 || sides % 1 !== 0) return message.error(`Invalid number of sides. The number must be an integer greater than 1 and no more than 100.`);

        message.reply(`I rolled a **__${Math.floor(Math.random() * sides) + 1}__**.`);
    }
module.exports.help = {
    name: "dice"
}
