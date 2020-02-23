const Discord = require('discord.js')

module.exports.run = (bot, message, args, tools) => {
 let member = message.mentions.members.first();
            if (member == null) { member = message.member; }
            let joined = new Date(member.joinedAt);
            let registered = new Date(member.user.createdAt);
            let embed = new Discord.RichEmbed();
            let perms = [];
            for (let [key, value] of Object.entries(member.permissions.serialize())) {
                if (value == true) {
                    perms.push(key);
                } else {
                    continue;
                }
            }
            embed.setAuthor(member.user.tag, member.user.avatarURL);
            embed.setThumbnail(member.user.avatarURL);
            embed.addField("ID", member.id, true);
            embed.addField("Nickname", (member.nickname != null ? member.nickname : "None"), true);
            embed.addField("Status", member.presence.status, true);
            embed.addField("Game", (member.presence.game != null ? member.presence.game.name : "None"), true);
            embed.addField("Joined", joined, true);
            embed.addField("Registered", registered, true);
            embed.addField("Roles", member.roles.map(x => x.name).join(", "), true);
            embed.addField("Permissions", perms.join(", ").toLowerCase(), true);
            message.channel.send({ embed }).catch(e => {
            });
            //console.log(Object.entries(Object.values(member.permissions.serialize()).filter(x => x == true)));
        }
module.exports.help = {
  name: "userinfo"
};
