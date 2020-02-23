const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let embed = new Discord.RichEmbed();
  message.channel.fetchMessage(args[0]).then(msg => {
    msg.pin();
    embed.addField("Success", ":white_check_mark: Message pinned.");
    message.channel.send({ embed }).then(msg => msg);
  });
};
module.exports.help = {
  name: "pin"
};
