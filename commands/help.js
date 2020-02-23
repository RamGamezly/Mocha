const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
	
const uwu = message.content.split(" ").slice(1).join(" ");

if (!uwu && message.author.id !== "139213278571134977") {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`Help ${client.user.username}!`)
    .setDescription(`\nMore Commands coming soon`)
    .addField('**Genral commands:**', '`ping` `remindme` `weather` `invite` `pin` `unpin` `derp` `derpview` `oof` `quote` `issue` `lenny` `shortenurl` `shrug` `support` `tableflip` `unflip` `tranlate` `notes`  `embed` `startcolor` `stopcolor` `backup create` `backup load` `wave` `dance`')
    .addField('**Fun commands:**', '`neko` `dog` `bunny` `pat` `pout` `cry` `hug` `kiss` `slap` `punch` `fortuneteller` `8ball` `meme` `ship` `ht` `rps` `hack` `dice` `stab` `shoot` `rape` `sexyrate` `tackle` `flipcoin` `potatoes` `rr` `suck` `cuddle` `hold-hands` `high-five` `stare` `scared` `blush` `bite` `tackle` `would-you-rather`')
    .addField('**Moderation commands:**', '`kick` `ban` `purge` `chnnlsetslowmode` `chnnldel` `chnnlsetname` `chnnlcreate` `chnnlclone` `nick` `createrrole` `hackban` `cybernuke` `lockdown` `warn`')
    .addField('**Information commands:**', '`serverinfo` `botinfo` `membercount` `userinfo` `avatar` `math` `urban` `wiki` `roblox` `credits` `nytimes` `booksearch` `math` `percentage`  `poll` `reddit` `roleinfo` `roleall`')
    .addField('**Music commands:**', '`play` `skip` `np` `volume` `stop` `resume` `queue` `pause` `loop`')
    .addField('**Card Games:**', '`apples-to-apples` `cards-against-humanity`')
    .addField('**Random Commands:**', `zodiac-sign`  `gender-analyze`)
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send({embed: RichEmbed});
    console.log(`Help command has been used by ${message.author.username} in ${message.channel.guild}`);    
}
if (!uwu && message.author.id == "139213278571134977") {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`Help ${client.user.username}!`)
    .setDescription(`\nMore Commands coming soon`)
    .addField('**Genral commands:**', '`ping` `remindme` `weather` `invite` `pin` `unpin` `derp` `derpview` `oof` `quote` `credits`')
    .addField('**Fun commands:**', '`neko` `dog` `bunny` `pat` `pout` `cry` `hug` `kiss` `slap` `punch` `fortuneteller` `8ball` `meme` `ship` `ht` `rps` `hack` `rape`')
    .addField('**Moderation commands:**', '`kick` `ban` `purge` `chnnlsetslowmode` `chnnldel` `chnnlsetname` `chnnlcreate` `chnnlclone` `nick`')
    .addField('**Information commands:**', '`serverinfo` `botinfo` `membercount`')
    .addField('**Music commands:**', '`play` `skip` `np` `volume` `stop` `resume` `queue` `pause` `loop`')
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send({embed: RichEmbed});
    console.log(`Help command has been used by ${message.author.username} in ${message.channel.guild}`);
}
if (message.author.id === "316676396305088522") {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`Owner Commands!`)
    .addField('**Owner Commands:**', '`say` `dmme` `dm` `shutdown` `statusdef` `derpreset` `setwatch` `RamBot` `servers` `setbotname` `credits` `reboot` `reload` `spam` `pmspam` `setusername` `setnickname` `cspam` `setavartar`')
    message.channel.send({embed: RichEmbed});
    }

}
module.exports.help = {
    name: "help",
	alias: "h",
	type: "help"
}