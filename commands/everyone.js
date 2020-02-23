const Discord = module.require("discord.js");
const ownerID = "316676396305088522";
module.exports.run = async (client, message, args) => {
  try {
    if (message.author.id !== ownerID) return;
    message.channel.send("@everyone listen to this man.");
    message.delete(1000);
  } catch (e) {
    console.log(e.stack);
  }
};

module.exports.help = {
  name: "everyone"
};
