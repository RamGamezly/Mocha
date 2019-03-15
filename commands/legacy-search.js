const Discord = require('discord.js');
const { client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyBHsqdn_YMOCMFnu7nj8xCYFGT0c7eEV2c'); // This token is now very past invalid.
const ytdl = require('ytdl-core');
const numWords = require('num-words');
const db = require('quick.db');

const queue = new Map();
var botname = "Ender"

module.exports = {
	name: 'legacy-play',
	description: 'Search and play a track',
	async execute(message, args) {
        const voiceChannel = message.member.voiceChannel; //Grabbing the queue for that guild.
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            const embed = new Discord.MessageEmbed()
                .setTitle(`⁉ Help for \`search\``)
                .setDescription("Search and play a track")
                .addField("📘 Syntax", "`search <query>`")
                .setColor('#3498db')
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            return message.channel.send(embed)   
        }
        const serverQueue = queue.get(message.guild.id);
        const searchString = argu.slice(1).join(' ');
        const url = argu[1] ? argu[1].replace(/<(.+)>/g, '$1') : '';
        const permissions = message.channel.permissionsFor(message.client.user);
		if (!message.member.voiceChannel){
            const embed = new Discord.MessageEmbed()
                .setTitle("🤔 Join a voice channel before playing music.")
                .setColor('#eb4d4b')
            message.channel.send(embed);
            console.error(`[${botname}] ${message.author.username}#${message.author.discriminator} tried to play music in ${message.guild} but wasn't in a voice channel.`)
        }
        if(message.member.voiceChannel) {
            if (!message.member.guild.me.hasPermission('CONNECT')) {
                const embed = new Discord.MessageEmbed()
                     .setTitle("❌ No permissions!")
                     .setDescription("I don't have permission to join that channel. Make sure you setup the permissions correctly for me.")
                     .setColor('#e74c3c')
                 return message.channel.send(embed);
             }
             if (!message.member.guild.me.hasPermission('SPEAK')) {
                 const embed = new Discord.MessageEmbed()
                     .setTitle("❌ No permissions!")
                     .setDescription("I don't have permission to speak in that channel. Make sure you setup the permissions correctly for me.")
                     .setColor('#e74c3c')
                 return message.channel.send(embed);
             }
             if (message.member.guild.me.hasPermission('SPEAK')) {
                 if (message.member.guild.me.hasPermission('CONNECT')) {
                     if(url) {
                         try {
                             var video = await youtube.getVideo(url);
                         } catch (error) {
                             try {
                                 var videos = await youtube.searchVideos(searchString, 5);
                                 let index = 0;
                                 var videoz = videos.map(video2 => `:${numWords(++index)}: ${video2.title} - [Watch Video](https://www.youtube.com/watch?v=${video2.id})`).join('\n');
                                 message.channel.startTyping()
                                 const embed = new Discord.MessageEmbed()
                                     .setTitle(`🔎 Searched for '${searchString}'`)
                                     .setDescription(`${videoz}`)
                                     .setColor('#3498db')
                                     .setThumbnail(message.author.displayAvatarURL())
                                     .setImage(`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`)
                                     .setFooter("Type which track you would like to play, for example typing '1' would play track one.", message.author.displayAvatarURL())
                                 message.channel.send(embed)
                                 message.channel.stopTyping()
                                 try {
                                     var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 6 || message2.content == 'cancel', {
                                         maxMatches: 1,
                                         time: 10000,
                                         errors: ['time']
                                     });
                                 } catch (err) {
                                     message.delete();
                                     console.error(err);
                                     const embed = new Discord.MessageEmbed()
                                         .setTitle(`🤦 ${message.author.tag}, invalid option or you didn't type anything.`)
                                         .setColor('#e74c3c')
                                     return message.channel.send(embed)
                                 }
                                 const voiceChannel = message.author.voiceChannel;
                                 if(response.first().content == 'cancel') {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle(`❌ Cancelled search.`)
                                        .setColor('#e74c3c')
                                    return message.channel.send(embed)                              
                                 }
                                 else {
                                    const videoIndex = parseInt(response.first().content);
                                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                                 }
                             } catch (err) {
                                 console.error(err);
                                 const embed = new Discord.MessageEmbed()
                                     .setTitle(`❌ Nothing found for '${searchString}'`)
                                     .setColor('#e74c3c')
                                 return message.channel.send(embed)
                             }
                         }           
             
                 return handleVideo(video, message, voiceChannel);
                     }
                     async function handleVideo(video, msg, voiceChannel, playlist = false) {
                        const serverQueue = queue.get(msg.guild.id);
                        var numberFormat = function(number, width) {
                            return new Array(width + 1 - (number + '').length).join('0') + number;
                        }

                        var hours = numberFormat(video.duration.days, 2)
                        var min = numberFormat(video.duration.minutes, 2)
                        var sec = numberFormat(video.duration.seconds, 2)
                        const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ];
                      
                      date = new Date(`${video.publishedAt}`);
                      year = date.getFullYear();
                      month = monthNames[date.getMonth()];
                      dt = date.getDate();
                      hr = date.getHours()-1;
                      mn = date.getMinutes();
                      sc = date.getSeconds();
                      
                      
                      if (dt < 10) {
                        dt = '0' + dt;
                      }
                      if (month < 10) {
                        month = '0' + month;
                      }
                      if (hr < 10) {
                        hr = '0' + hr;
                      }
                      if (mn < 10) {
                        mn = '0' + mn;
                      }
                      if (sc < 10) {
                        sc = '0' + sc;
                      }
                        const song = {
                            id: video.id,
                            description: video.description,
                            channel: video.channel.title,
                            channelid: video.channel.id,
                            uploaded: `${dt} ${month} ${year} ${hr}:${mn}:${sc}`,
                            duration: `${hours}:${min}:${sec}`,
                            thumbnail: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
                            title: Util.escapeMarkdown(video.title),
                            url: `https://www.youtube.com/watch?v=${video.id}`,
                            user: message.author,
                            guild: message.guild
                        };
                        if (!serverQueue) {
                            const queueConstruct = {
                                textChannel: msg.channel,
                                voiceChannel: voiceChannel,
                                connection: null,
                                songs: [],
                                volume: 5,
                                playing: true
                            };
                            queue.set(msg.guild.id, queueConstruct);
                    
                            queueConstruct.songs.push(song);
                    
                            try {
                                var connection = await voiceChannel.join();
                                queueConstruct.connection = connection;
                                play(msg.guild, queueConstruct.songs[0]);
                            } catch (error) {
                                console.error(`I could not join the voice channel: ${error}`);
                                queue.delete(msg.guild.id);
                                return msg.channel.send(`I could not join the voice channel: ${error}`);
                            }
                        } 
                        else {
                            serverQueue.songs.push(song);
                            const embed = new Discord.MessageEmbed().setTitle(`👌 ${song.title} has been added to the queue`, song.url).setColor('#e74c3c').setFooter(`Requested by ${song.user.username}`, song.user.displayAvatarURL())
                            if (playlist) return undefined;
                            else return msg.channel.send(embed)
                        }
                        return undefined;
                    }
                        
                    async function play(guild, song) {
                        const serverQueue = queue.get(guild.id);
                    
                        if (!song) {
                            serverQueue.voiceChannel.leave();
                            queue.delete(guild.id);
                            return;
                        }
                    
                        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                            .on('end', reason => {
                                if(serverQueue.songs.size == 0) {
                                    db.set(`nowplaying-${song.guild.id}`, { song: { } })
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle("👋 Queue Finished, leaving voice channel.")
                                        .setDescription("You can always add another track to the queue by typing `!play` followed by a search query.")
                                        .setColor('#3498db')
                                        .setThumbnail("https://cdn-proxy.ender.site/enderbot.png")
                                    message.channel.send(embed);
                                }
                                else console.log(reason);
                                serverQueue.songs.shift();
                                play(guild, serverQueue.songs[0]);
                            })
                            .on('error', error => console.error(error));
                        dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
                    
                        const embed = {
                            "title": `🎶 ${song.title}`,
                            "description": `Requested by ${song.user}.`,
                            "url": `${song.url}`,
                            "color": 3447003,
                            "thumbnail": {
                              "url": song.user.displayAvatarURL()
                            },
                            "image": {
                              "url": song.thumbnail
                            },
                            "fields": [
                              {
                                "name": "🎞 Channel",
                                "value": `[${song.channel}](https://youtube.com/channel/${song.channelid})`
                              },
                              {
                                "name": "🕒 Duration",
                                "value": `${song.duration}`
                              },
                              {
                                "name": "🗓 Published",
                                "value": `${song.uploaded}`
                              }
                            ],
                            "footer": {
                                "text": `Requested by ${song.user.username}`,
                                "icon_url": song.user.displayAvatarURL()
                            }
                          };
                          serverQueue.textChannel.send(`🎶 **${song.title}** is now playing`, { embed });
                          db.set(`nowplaying-${song.guild.id}`, { song: { title: `${song.title}`, channel: `${song.channel}`, channelurl: `https://youtube.com/channel/${song.channelid}`, thumbnail: song.thumbnail, addedby: { username: song.user.username, avatarURL: song.user.displayAvatarURL() } }, queuesize: queueConstruct.songs.size })
                    }     
                     }
     
                 }
        }

        }
    }

