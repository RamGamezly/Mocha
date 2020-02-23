const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message, args) => {
  if(!message.channel.guild) return message.reply('this command is for guilds only!');
  let user = message.mentions.users.first();
  if(!user) return message.channel.send('Select someone you want to kill ');
  if (!user) {
  /**
  * The command was ran with invalid parameters.
  * @fires commandUsage
  */
  return message.emit('commandUsage', message, this.help);
  }
  
  let kill = [
  'http://h16free.com/wp-content/uploads/2016/01/gifa-kill-it-with-fire.gif',
  'http://gifimage.net/wp-content/uploads/2017/09/anime-kill-gif.gif',
  'https://i.gifer.com/W9e.gif',
  'https://media.giphy.com/media/zRvRW19XW6ioo/giphy.gif',
  'https://pa1.narvii.com/6293/eceed6b41aad2d1169d2258ee309ddc44bb689ba_hq.gif',
  'https://pa1.narvii.com/5779/5f3d0760e67869e6d63fb282680d8ef6bdc24954_hq.gif',
  'https://media1.tenor.com/images/eb7fc71c616347e556ab2b4c813700d1/tenor.gif?itemid=5840101',
  'http://gifimage.net/wp-content/uploads/2018/04/kill-me-baby-gif-8.gif',
  'https://orig00.deviantart.net/d7b7/f/2012/036/a/f/kill_me_baby_by_oneiros1987-d4oq69w.gif',
  'https://media.giphy.com/media/lBI5jHb8X168g/giphy.gif',
  'https://media.giphy.com/media/3o6Zt7xWCLZD8f5ZsY/giphy.gif',
  'https://i.imgur.com/Bc7PjbT.gif',
  'http://gifimage.net/wp-content/uploads/2017/08/tom-and-jerry-gif-24.gif',
  'http://gifimage.net/wp-content/uploads/2017/02/Kill-la-kill-gif-image-30.gif',
  'http://gifimage.net/wp-content/uploads/2017/02/Kill-la-kill-gif-image-15.gif',
  'http://gifimage.net/wp-content/uploads/2017/02/Kill-la-kill-gif-image-5.gif',
  'http://gifimage.net/wp-content/uploads/2017/02/Kill-la-kill-gif-image-9.gif'
  ];
  
  message.channel.send({
  embed: {
  description: `${message.author.username} kill 🔪 ${user.username} 30 years in prison `,
  image: {
    url: kill[Math.floor(Math.random() * kill.length)]
  }
  }
  }).catch(e => {
  client.log.error(e);
  })
} 