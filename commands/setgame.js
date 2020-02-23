const Discord = require("discord.js");

module.exports.run = async (client,message,args) => { 

  if (message.author.id === "316676396305088522" || message.author.id === "298112280963448832") {
                client.user.setPresence({ game: { name: args.join(" "), type: 0 } });
                message.channel.send(":white_check_mark: Game set to: `" + args.join(" ") + "`").then(msg => (msg));
            }
        }
module.exports.help = {
    names: 'setgame'
}