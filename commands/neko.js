const Discord = require('discord.js'),
  	  db = require('quick.db');

exports.run = async (client, message, args, tools) => {

  // Create a new 'AFK' table w/ Quick.db
  const status = new db.table('AFKs');

  // Fetch user object from that table
  let afk = await status.fetch(message.author.id);

  // Form Embed
  const embed = new Discord.MessageEmbed()
    .setColor(0xffffff)

  if (!afk) { // Run if they are NOT afk, or afk is null
    embed.setFooter('You are now AFK.'); // Modify Embed
    // Add the user to the AFK pool
    status.set(message.author.id, args.join(' ') || `Sorry, ${message.author.username} is AFK.`);
  } else { // Run if they ARE afk
    embed.setFooter('You are no longer AFK.'); // Modify Embed
    // Remove the user from the AFK pool
    status.delete(message.author.id);
  }

  // Send Embed
  message.channel.send(embed);

}
 
const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
const uwu = message.content.split(" ").slice(1).join(" ");

var nkolve = [
"nya",
"mew",
"purrr",
"mrow",
"nyan",
"meow",
"neko looovvveee",
"i guess you like neko's too",
"neko powwweeerrr",
"yush yush yush",
"sooo kyuuttee",
"ugu"
];
let nko = nkolve[Math.floor(Math.random() * nkolve.length)];
var lwdnko = [
"ugu ... so lewd",
"you ... you lewdie!",
"HENTAI! BAKA BAKA BAKA BAKA HEENNNTAAII!!!",
"how could you?",
"ravioli ravioli dun lewd the neko loli",
"if you insist"
];
let lewdnko = lwdnko[Math.floor(Math.random() * lwdnko.length)];

const Neko = require("neko.js");

let nekoclient = new Neko.Client(); // default api key is defaulted :D

    let neko = await nekoclient.neko();	// logs to console the url for Neko picture  

    let why = await nekoclient.why(); // logs to console a funny why joke

    let LewdNeko = await nekoclient.LewdNeko();	// logs to console a LewdNeko image url
	
	let nsfwchan = message.guild.channels.find("name", "nsfw");

	if (!uwu){
    nekoclient.neko().then((neko) => {
		let nkobd = new Discord.RichEmbed()
		.setTitle(nko)
		.setImage(neko.neko)
	    .setColor(`${message.member.displayHexColor}`)
		message.channel.send({embed: nkobd})
		}); 
	}
	if (uwu == "why?"){
    nekoclient.why().then(why => message.channel.send(why.why)); // logs to console a funny why joke
	}
	if (uwu == "lewd"){
	if (!message.channel.nsfw)return message.channel.send("Don't do that here BAKA .. there are kids around");
	nekoclient.LewdNeko().then((LewdNeko) => {
		let lwdbd = new Discord.RichEmbed()
		.setTitle(lewdnko)
		.setImage(LewdNeko.neko)
	    .setColor(`${message.member.displayHexColor}`)
		message.channel.send({embed: lwdbd})
	  });
	}
}
module.exports.help = {
    name: "neko"
}