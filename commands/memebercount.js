const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed();
  embed.addField("Members", message.guild.memberCount);
  message.channel.send({ embed });
};

module.exports.help = {
  name: "memebercount"
};
