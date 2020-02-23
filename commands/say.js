const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (
    message.author.id === "316676396305088522" ||
    message.author.id === "298112280963448832" ||
    message.author.id === "326081557250965505"
  ) {
    message.delete().then(() => {
      message.channel.send(args.join(" "));
    });
  }
};

module.exports.help = {
  name: "say"
};
