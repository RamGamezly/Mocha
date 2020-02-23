const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const client = new Discord.Client();
const db = require('quick.db')

client.config = require("./config.js");

client.logger = require("./util/Logger.js");

require("./modules/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();

client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("Your Youtube Api Key");
const queue = new Map();

var servers = {};
client.on("message", async message => {
    // This code has been registered by 『RyansHDs』#4461
    // All this code was a modified version of original one with full fixes.
    // Thank you for using my code.
  const settings = message.settings = client.getGuildSettings(message.guild);
  var prefix = settings.prefix
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "ramplay":
    var voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.channel.send('You need to be in voice channel first!');
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
      const errorconnect = new Discord.RichEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't connect into your voice channel, Missing **CONNECT** Permission.`)
			return message.channel.send(errorconnect).then(message => {
        message.delete(10000)
      })
		}
		if (!permissions.has('SPEAK')) {
      const errorspeak = new Discord.RichEmbed()
      .setColor(`RED`)
      .setFooter(`This message will be deleted in 10 seconds..`)
      .setDescription(`I couldn't speak at your voice channel, Missing **SPEAK** Permission.`)
			return message.channel.send(errorspeak).then(message => {
        message.delete(10000)
      })
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
        const playlistembed = new Discord.RichEmbed()
        .setColor(`GREEN`)
        .setDescription(`✅ ${playlist.title} has been added to the queue!`)
			return message.channel.send(playlistembed);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 9);
					var index = 0;
          let selectionemb = new Discord.RichEmbed()
          .setTitle(`<:youtube:469420220688367616> Youtube video selection.`)
          .setDescription(`${videos.map(video2 => `**${++index} -** [${video2.title}](${video2.url})`).join('\n')}`)
          .setFooter('🔎 Please provide a number to select one of the search results ranging from 1-9.')
          .setColor('#0fe709')
					message.channel.send(selectionemb).then(message => {
            message.delete(11000)
          })
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 10, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
            let noinvemb = new Discord.RichEmbed()
            .setDescription('No or invalid value entered, cancelling video selection.')
            .setColor('#e41016')
						return message.channel.send(noinvemb).then(message => {
              message.delete(5000)
            })
					}
					var videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('Can\'t find the video');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
        break;
      case "ramskip":
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
        message.channel.send(':ok_hand: Skipped!')
		return undefined;
        break;
      case "ramstop":
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing right now');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
        message.channel.send(':ok_hand: Stopped!')
		return undefined;
break;
      case "ramvolume":
		if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel.');
		if (!serverQueue) return message.channel.send('There is nothing playing.');
        let currentvolumeemb = new Discord.RichEmbed()
        .setDescription(`The current volume is: **${serverQueue.volume}**`)
        .setColor('#27ce12')
		if (!args[1]) return message.channel.send(currentvolumeemb);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        let setvolumeemb = new Discord.RichEmbed()
        .setDescription(`I set the volume to: **${args[1]}**`)
        .setColor('#27ce12')
		return message.channel.send(setvolumeemb);
break;
      case "ramnp":
		if (!serverQueue) return message.channel.send('There is nothing playing.');
        let nowplayingemb = new Discord.RichEmbed()
        .setDescription(`🎶 Now playing: **${serverQueue.songs[0].title}**`)
        .setColor(`GREEN`)
		return message.channel.send(nowplayingemb);
break;
      case "ramqueue":
		if (!serverQueue) return message.channel.send('No music playing right now.');
        let queueemb = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} Queue list `)
        .setDescription(`${serverQueue.songs.map(song => `**•** [${song.title}](https://www.youtube.com/watch?v=${song.id}})`).join('\n')}\n\n🎶 **Now playing:** ${serverQueue.songs[0].title}`)
        .setColor(`GREEN`)
		return message.channel.send(queueemb)
break;
      case "rampause":
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Music paused');
		}
		return message.channel.send('There is nothing playing.');
break;
      case "ramresume":
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Music resumed');
		}
		return message.channel.send('There is nothing playing.');
	

	return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    durationm: video.duration.minutes,        
    durations: video.duration.seconds,
    durationh: video.duration.hours,
    publishedAt: video.publishedAt,
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
      let vcerr = client.channels.get('468793396970913812')
			vcerr.send(`I could not join the voice channel: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
    let queueemb = new Discord.RichEmbed()
    .setAuthor(`Added to ${message.guild.name} Queue list`, message.author.displayAvatarURL)
    .setColor(`#1ace18`)
    .addField(`Publisher:`, `${song.channel}`, true)
    .addField(`Video ID:`, song.id, true)
    .setFooter(`Video Published At ${song.publishedAt}`)
    .addField(`Duration:`, `**${song.durationh}** hours, **${song.durationm}** minutes, **${song.durations}** seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}})`)
    .setColor(`GREEN`)
		return message.channel.send(queueemb).then(msg => {
      message.delete(10000)
    })
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    let playingemb = new Discord.RichEmbed()
    .setTitle(`<:youtube:469420220688367616> Now playing`)
    .setColor(`GREEN`)
    .addField(`Publisher:`, `${song.channel}`, true)
    .addField(`Video ID:`, song.id, true)
    .setFooter(`Video Published At ${song.publishedAt}`)
    .addField(`Duration:`, `**${song.durationh}** hours, **${song.durationm}** minutes, **${song.durations}** seconds`, true)
    .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}})`)
    .setTimestamp()
	serverQueue.textChannel.send(playingemb);
}
});

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

};

init();