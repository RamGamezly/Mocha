const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
	
const uwu = message.content.split(" ").slice(1).join(" ");

if (!uwu && message.author.id !== "139213278571134977") {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`RPG Game Commands!`)
    .setDescription(`\nMore RPG commands coming soon`)
    .addField('**Day of the Dream Game:**', '`start` `stats` `dump` `combat` `event` `skills` `restart`')
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send({embed: RichEmbed});
    console.log(`Help command has been used by ${message.author.username} in ${message.channel.guild}`);
}
if (!uwu && message.author.id == "139213278571134977") {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`RPG Game Commands!`)
    .setDescription(`\nMore  RPG commands coming soon`)
    .addField('**Day of the Dream Game:**', '`start` `stats` `dump` `combat` `event` `skills` `restart`')
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send({embed: RichEmbed});
    console.log(`Help command has been used by ${message.author.username} in ${message.channel.guild}`);
}

}
module.exports.help = {
    name: "rpghelp",
	alias: "rpgh",
	type: "rpghelp"
}