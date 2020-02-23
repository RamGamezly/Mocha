const Discord = require("discord.js");
const client = new Discord.Client();
const superagent = require("superagent");
exports.run = async (client, message, args) => {
  if (!message.channel.guild)
    return message.reply("this command is for guilds only!");
  let color = "0xffffff";
  const { body } = await superagent.get("https://yesno.wtf/api/");
  if (body.answer === "yes") color = "0x01DF01";
  if (body.answer === "no") color = "0xFF0000";
  const embed = new Discord.RichEmbed()
    .setColor(color)
    .setImage(`${body.image}`);
  message.channel.send(`**i say 🤔** **${body.answer}**`, { embed });
};
