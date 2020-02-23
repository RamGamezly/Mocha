const Discord = require('discord.js');

module.exports.run = (client, message, args) => { 
  
  const progbar = ["▒▒▒▒▒▒▒▒▒▒","█▒▒▒▒▒▒▒▒▒","██▒▒▒▒▒▒▒▒","███▒▒▒▒▒▒▒","████▒▒▒▒▒▒", "█████▒▒▒▒▒", "██████▒▒▒▒", "███████▒▒▒", "████████▒▒", "█████████▒", "██████████"]
  var random = progbar[Math.floor(Math.random() * progbar.length)]
  var c = progbar.indexOf(random)
  if(c == 0) {var stat = "Worst!"}
  if(c > 0 && c <= 3) {var stat = "Awful"}
  if(c > 3 && c <= 5) {var stat = "Not Bad"}
  if(c > 5 && c <= 8) {var stat = "Good"}
  if(c > 8 && c <= 10) {var stat = "Perfect!"}
  
  
  let you = message.author;
  let matching = args.slice(1).join(' ');
  let special = "```"
  if(!args && !matching) return message.channel.send("Make ship to your couple. Wait, you can't ship yourself, try someone...");
  if(args == `<@${message.author.id}>` || args == `<@!${message.author.id}>`) return message.channel.send("Make ship to your couple. Wait, you can't ship yourself, try someone...");
  message.channel.send(`:revolving_hearts: **SHIPPING!** --- ${you} X ${args} \n\n`+random+"  "+c+"/10"+"  "+stat)
  
      //message.channel.send("Make ship to your couple. Wait, you can't ship yourself, try someone...")
             
    
}
module.exports.help = {
    name: "ship"
}