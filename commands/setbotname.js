const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {

let name = message.content.split(" ").slice(2).join(" ");
	if (!message.author.id == "316676396305088522")return;
	if (message.author.id == "316676396305088522"){
	  message.guild.me.client.user.setUsername(name);
	message.channel.send(`You set my new name to ${name}!`);  
	}
	console.log(`${message.author.username} set my new name to ${name}`);

}

module.exports.help = {
    name: "setbotname"
}