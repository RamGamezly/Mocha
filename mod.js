/***
    Discord utility bot built mostly by Ram.
    TODO:
    - Word filter
    - Better mute command, hooked up to server's DB.
    IDEAS:
    - Add modules to clean up this code!!!
    - Add a databse to manage server-specific data, then bot can be added to other servers and work
    - Management category
    - Should mod cmds be deleted?
    - Turn the roles channel into a bot controlled one
      Any comments that are not role giving commands are deleted, channel will only allow giving of roles
    - Have a report feature that deletes a post after 3-5 flags, only if user is able to
      Included with the above, a message can be approved with a reaction from staff
    - Bulk add roles to someone, at least 1, check if roles are different. addRoles <user> <roles, ...>
    - Server info
    - Roleinfo
    - Total number of msgs in server
    - Ping command
    - Channel info
    - Deletion logs
    - Unban cmd
    - Polls
    - View active invites for a server
    - Lock a channel
    - Return errors if bot doesn’t have right channels to post logs and stuff in
    - Binary convertor
    - Color info
    - Cmd to make bot react to given message, with given emoji
    - If message gets N downvotes, it can’t get to star board
    - For all the events, put them in an obj like the commands obj and loop through accordingly.
***/

// Require needed modules.
const Discord = require("discord.js");
const request = require("request");
const config = require("./config.json");
const main2 = require("./mainch.js");
const spam = require("./spam.js");
const DMN = require("./DMN.js");
// Set up client.
const client = new Discord.Client();

// Client settings.
let prefix = config.prefix;
const deleteDelay = 5000; // 5 second delete delay.
const creators = ["<@316676396305088522>"]; // Ram
const botAdmin = ["<@298112280963448832>"]; // Maybe fill this with IDs of users who can use eval.
const blacklisted = []; // IDs of blacklisted users.

// Embed colors.
const embedDefaultColor = "06ebf3"; // Mint Blue.
const embedRedColor = "ff6666"; // Red.
const embedGreenColor = "00b33c"; // Green.
const embedYellowColor = "e6e600"; // Yellow.

// Variables to be defined.
const DEV_MODE = process.env.DEV == 1;
const LOGS_ID = DEV_MODE ? process.env.LOGS_ID : "64685037120507087";
const JUNKYARD_ID = DEV_MODE ? process.env.JUNKYARD_ID : "64685037120507087";
const MUTED_ROLE = DEV_MODE ? process.env.MUTED_ROLE : "63131067408947609";

// Permissions checking functions.
const hasManageMessages = msg => {
  if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    return true;
  }
  return false;
};
const hasKickPerms = msg => {
  if (msg.member.hasPermission("KICK_MEMBERS")) {
    return true;
  }
  return false;
};
const hasBanPerms = msg => {
  if (msg.member.hasPermission("BAN_MEMBERS")) {
    return true;
  }
  return false;
};
const hasRolesPerms = msg => {
  if (msg.member.hasPermission("MANAGE_ROLES")) {
    return true;
  }
  return false;
};
const hasManageGuild = msg => {
  if (msg.member.hasPermission("MANAGE_GUILD")) {
    return true;
  }
  return false;
};

// Message sending functions.
const deleteMessage = msg => {
  msg.delete(deleteDelay);
};
const logMessage = (msg, obj) => {
  let embed = new Discord.RichEmbed();
  embed.setTimestamp();
  if (obj.serverChange) {
    embed.setColor(embedDefaultColor);
    embed.setThumbnail(client.user.avatarURL);
    embed.addField("Server Change", obj.serverChange);
    embed.addField("Change by", obj.byWho);
    embed.addField("Reason", obj.reason);
    msg.guild.channels.find("id", LOGS_ID).send({ embed });
  } else if (obj.modAction) {
    embed.setColor(embedRedColor);
    embed.setThumbnail(client.user.avatarURL);
    embed.addField("Staff Action", obj.modAction);
    embed.addField("User", obj.user);
    embed.addField("Action by", obj.byWho);
    embed.addField("Reason", obj.reason);
    msg.guild.channels.find("id", LOGS_ID).send({ embed });
  } else if (obj.flaggers) {
    embed.setColor(embedRedColor);
    embed.setThumbnail(
      "https://media.discordapp.net/attachments/479408863162925062/485630915586949163/unknown.png"
    );
    embed.addField("Message Author", obj.user);
    embed.addField("Message Content", obj.content);
    embed.addField("Flaggers", obj.flaggers);
    embed.addField("Posted in", obj.channel);
    msg.guild.channels
      .find("id", JUNKYARD_ID)
      .send({ embed })
      .then(m => m.react("🗑"));
  }
};
const sendDM = msg => {
  if (!DEV_MODE) {
    client.users.find("id", "665450423729258496").send(msg);
  }
};
const sendError = err => {
  let embed = new Discord.RichEmbed();
  embed.setColor("#1af3de");
  embed.setThumbnail(client.user.avatarURL);
  embed.setAuthor(
    "Error!",
    "https://media.discordapp.net/attachments/386537690260176897/418165473897611274/unknown.png"
  );
  embed.setDescription(err);
  embed.setTimestamp();
  sendDM({ embed });
};
const permError = msg => {
  msg.react("❌");
  msg.channel
    .send("You do not have permissions to use this command.")
    .then(m => deleteMessage(m));
};
const commandError = (msg, err) => {
  msg.react("❌");
  msg.channel.send(`:x: ${err}`).then(msg => msg.delete(deleteDelay));
};

// Misc functions.
const millisToTime = function(milliseconds) {
  let x = milliseconds / 1000;
  let s = Math.floor(x % 60);
  x /= 60;
  let m = Math.floor(x % 60);
  x /= 60;
  let h = Math.floor(x % 24);

  return h + " Hours, " + m + " Minutes, " + s + " Seconds";
};
const otherFunctions = message => {
  var content = message.content.toLowerCase();
  if (
    content.includes("good night") ||
    content.includes("g'night") ||
    content.includes("goodnight") ||
    content.includes("g night")
  )
    message.react("🌙");
  if (
    message.author.id === "424656519511015425" ||
    message.author.id === "316676396305088522" ||
    message.author.id === "221285118608801802" ||
    message.author.id === "299150484218970113"
  ) {
    if (content == "blob") {
      message.channel
        .send("<a:rainbowBlob:402289443593125888>")
        .then(m => {
          message.delete();
          m.react("402289443593125888");
        })
        .catch(e => {
          sendError(e);
        });
    }
  }
  if (
    content.includes("Ram") ||
    content.includes("Ram") ||
    message.mentions.users.exists("id", "316676396305088522")
  ) {
    if (message.author.id != "316676396305088522") {
      let embed = new Discord.RichEmbed();
      embed.setColor(embedDefaultColor);
      embed.setAuthor("You were mentioned!", message.author.avatarURL);
      embed.addField("Content", message.content);
      embed.addField("Sender", message.author);
      embed.addField("Server", message.guild);
      embed.addField("Channel", message.channel, true);
      embed.addField(
        "Link",
        `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}?jump=${message.id}`,
        true
      );
      embed.setTimestamp();
      sendDM({ embed });
    }
  }
  // If bot is mentioned, react with thinking.
  if (message.mentions.users.exists("id", "316676396305088522"))
    message.react("🤔");
};

// All bot commands.
const commands = {
  color: {
    name: "color",
    description: "Display a given hex color",
    category: "General",
    usage: `${prefix}color <hex>`,
    do: (message, client, args, Discord) => {
      // Add validation, regex
      if (args[0]) {
        let embed = new Discord.RichEmbed();
        embed.setThumbnail(
          `http://placehold.it/300x300.png/${args[0]}/000000&text=%20`
        );
        embed.setColor(args[0]);
        message.channel.send({ embed });
      } else {
        commandError(message, "Not a valid hex value.");
      }
    }
  },
  purge: {
    name: "purge",
    category: "Moderation",
    description: "Remove messages in bulk, 1-100.",
    usage: `${prefix}purge <number>`,
    do: (message, client, args, Discord) => {
      if (hasManageMessages(message)) {
        if (+args[0] <= 100 && +args[0] >= 1) {
          message.channel
            .bulkDelete(+args[0] + 1)
            .then(msgs => {
              message.channel
                .send(`:white_check_mark: Deleted ${msgs.size - 1} messages`)
                .then(msg => deleteMessage(msg));
            })
            .catch(e => {
              sendError(e);
            });
        } else {
          commandError(message, "Please provide a number ≤ 100 and ≥ 1.");
        }
      } else {
        permError(message);
      }
    }
  },
  kick: {
    name: "kick",
    description: "Kick a member.",
    category: "Moderation",
    usage: `${prefix}kick <member> <reason>`,
    do: (message, client, args, Discord) => {
      if (hasKickPerms(message)) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
        const userId = args[0];

        // This doesn't want to work when a user isn't in the guild.
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            if (reason) {
              member
                .kick(reason)
                .then(u => {
                  logMessage(message, {
                    modAction: "Kick User",
                    user: `<@${u.id}>`,
                    byWho: `<@${message.author.id}>`,
                    reason: reason
                  });
                })
                .catch(e => {
                  sendError(e);
                });
            } else {
              commandError(message, "You must provide a reason for kicking.");
            }
          } else {
            // The mentioned user isn't in this guild
            commandError(
              message,
              "That user isn't in this guild, try providing their user ID instead."
            );
          }
        } else {
          commandError(message, "You didn't identify a valid user.");
        }
      } else {
        permError(message);
      }
    }
  },
  ban: {
    name: "ban",
    description: "Ban a member.",
    category: "Moderation",
    usage: `${prefix}ban <member> <reason>`,
    do: (message, client, args, Discord) => {
      if (hasBanPerms(message)) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");
        const userId = args[0];

        // This doesn't want to work when a user isn't in the guild.
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            if (reason) {
              message.guild
                .ban(user, {
                  days: 0,
                  reason: reason
                })
                .then(u => {
                  logMessage(message, {
                    modAction: "Ban User",
                    user: `<@${u.id}>`,
                    byWho: `<@${message.author.id}>`,
                    reason: reason
                  });
                })
                .catch(e => {
                  sendError(e);
                });
            } else {
              commandError(message, "You must provide a reason for banning.");
            }
          } else {
            // The mentioned user isn't in this guild
            commandError(
              message,
              "That user isn't in this guild, try providing their user ID instead."
            );
          }
        } else {
          commandError(message, "You didn't identify a valid user.");
        }
      } else {
        permError(message);
      }
    }
  },
  unban: {
    name: "unban",
    description: "Unban a member.",
    category: "Moderation",
    usage: `${prefix}unban <member> <reason>`,
    do: (message, client, args, Discord) => {
      if (hasBanPerms(message)) {
        const reason = args.slice(1).join(" ");
        const user = message.mentions.members.first();
        const userId = args[0];
        console.log(userId);

        if (user || userId) {
          if (reason) {
            message.guild
              .unban(user || userId, reason)
              .then(u => {
                logMessage(message, {
                  modAction: "Unban User",
                  user: `<@${u.id}>`,
                  byWho: `<@${message.author.id}>`,
                  reason: reason
                });
              })
              .catch(e => {
                sendError(e);
              });
          } else {
            commandError(message, "You must provide a reason for unbanning.");
          }
        } else {
          commandError(message, "You didn't identify a valid user.");
        }
      } else {
        permError(message);
      }
    }
  },
  setwatch: {
    name: "setwatch",
    description: "Set stream of the bot.",
    category: "Moderation",
    usage: `${prefix}setWatch <game>`,
    do: (message, client, args, Discord) => {
      if (
        message.author.id === "316676396305088522" ||
        message.author.id === "298112280963448832"
      ) {
        client.user.setPresence({ game: { name: args.join(" "), type: 3 } });
        message.channel
          .send(":white_check_mark: Stream set to: " + args.join(" ") + "")
          .then(msg => deleteMessage(msg));
      } else {
        permError(message);
      }
    }
  },
  bans: {
    name: "bans",
    description: "View bans for this server",
    category: "Moderation",
    usage: `${prefix}bans`,
    do: (message, client, args, Discord) => {
      if (hasBanPerms(message)) {
        message.guild
          .fetchBans()
          .then(bans => {
            if (bans.size > 0) {
              let embed = new Discord.RichEmbed();
              embed.setColor(embedDefaultColor);
              embed.addField(
                "Bans",
                bans.array().reduce((acc, curr) => {
                  return acc + `${curr.tag}\n`;
                }, "")
              );
              message.channel.send({ embed });
            } else {
              commandError(message, "No bans for this server.");
            }
          })
          .catch(e => {
            sendError(e);
          });
      } else {
        permError(message);
      }
    }
  },
  RamBot: {
    name: "RamBot",
    category: "Moderation",
    description: "Evaluates JavaScript code.",
    usage: `${prefix}eval <code>`,
    do: (message, client, args, Discord) => {
      if (
        message.author.id === "316676396305088522" ||
        message.author.id === "424656519511015425"
      ) {
        function clean(text) {
          if (typeof text === "string")
            return text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
        }
        try {
          const code = args.join(" ");
          let evaled = eval(code);

          if (typeof evaled !== "string") {
            evaled = require("util").inspect(evaled);
          }

          message.channel.send(clean(evaled), { code: "xl" }).catch(e => {
            sendError(e);
          });
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      } else {
        permError(message);
      }
    }
  },
  msgEdits: {
    name: "msgEdits",
    description: "View edit history of a given message.",
    category: "Moderation",
    usage: `${prefix}msgEdits <messageID>`,
    do: (message, client, args, Discord) => {
      if (hasManageMessages(message)) {
        let edits = "";
        let embed = new Discord.RichEmbed();
        //embed.setThumbnail(client.user.avatarURL); Use this????
        embed.setColor(embedDefaultColor);
        message.channel
          .fetchMessage(args[0])
          .then(msg => {
            for (var i = 0; i < msg.edits.length; ++i) {
              edits += msg.edits[i] + ", ";
            }
            embed.addField("Content", msg.content);
            embed.addField("Edits", edits);
            message.channel.send({ embed });
          })
          .catch(e => {
            sendError(e);
          });
      } else {
        permError(message);
      }
    }
  },
  clearReactions: {
    name: "clearReactions",
    description: "Clear reactions for a given message.",
    category: "Moderation",
    usage: `${prefix}clearReactions <messageId>`,
    do: (message, client, args, Discord) => {
      if (hasManageMessages(message)) {
        let embed = new Discord.RichEmbed();
        embed.setColor(embedDefaultColor);
        message.channel
          .fetchMessage(args[0])
          .then(msg => {
            msg.clearReactions();
            embed.addField("Success", ":white_check_mark: Reactions cleared.");
            message.channel.send({ embed }).then(msg => deleteMessage(msg));
          })
          .catch(e => {
            sendError(e);
          });
      } else {
        permError(message);
      }
    }
  },
  servers: {
    name: "servers",
    description: "Get names and IDs of servers this bot is handling.",
    category: "Moderation",
    usage: `${prefix}servers`,
    do: (message, client, args, Discord) => {
      if (message.author.id === "316676396305088522") {
        let embed = new Discord.RichEmbed();
        embed.setColor(embedDefaultColor);
        embed.addField("Servers", client.guilds.map(guild => guild.name));
        embed.addField("IDs", client.guilds.map(guild => guild.id));
        embed.addField("Owners", client.guilds.map(guild => guild.owner));
        message.channel.send({ embed });
      } else {
        permError(message);
      }
    }
  },
  mute: {
    name: "mute",
    description: "Mutes a member",
    category: "Moderation",
    usage: `${prefix}mute <user> <reason>`,
    do: (message, client, args, Discord) => {
      if (hasRolesPerms(message)) {
        const user = message.mentions.users.first();
        const reason = args.slice(1).join(" ");

        if (user) {
          const member = message.guild.member(user);
          if (member) {
            if (reason) {
              let muteRole = message.guild.roles.find("id", MUTED_ROLE);
              if (muteRole) {
                member
                  .addRole(muteRole, reason)
                  .then(u => {
                    logMessage(message, {
                      modAction: "Mute User",
                      user: `<@${u.id}>`,
                      byWho: `<@${message.author.id}>`,
                      reason: reason
                    });
                  })
                  .catch(e => {
                    sendError(e);
                  });
              } else {
                commandError(message, "Muted role does not exist.");
              }
            } else {
              commandError(message, "Please provide a reason for this mute.");
            }
          } else {
            commandError(message, "This user isn't a member of this server.");
          }
        } else {
          commandError(message, "This user cannot be found.");
        }
      } else {
        permError(message);
      }
    }
  },
  invites: {
    name: "invites",
    description: "Show all invites for a server.",
    category: "Moderation",
    usage: `${prefix}invites`,
    do: (message, client, args, Discord) => {
      if (message.member.hasPermission("MANAGE_GUILD")) {
        message.guild
          .fetchInvites()
          .then(invites => {
            if (invites.size > 0) {
              let embed = new Discord.RichEmbed();
              embed.setColor(embedDefaultColor);
              embed.setThumbnail(client.user.avatarURL);
              embed.addField(
                "Invites",
                invites.array().reduce((acc, curr) => {
                  return (
                    acc +
                    `${curr.code} - ${curr.uses} (${curr.inviter.username}: <@${curr.inviter.id}>)\n`
                  );
                }, "")
              );
              message.channel.send({ embed });
            } else {
              commandError(message, "There are no invites.");
            }
          })
          .catch(e => {
            sendError(e);
          });
      }
    }
  },
  destroy: {
    name: "destroy",
    description: "Shut down the bot",
    category: "Moderation",
    usage: `${prefix}destroy`,
    do: (message, client, args, Discord) => {
      if (message.author.id === "316676396305088522") {
        client.destroy().then(() => {
          console.log("Client destroyed");
          process.exit(0);
        });
      } else {
        permError(message);
      }
    }
  },

  action: {
    name: "action",
    description: "Log a change to the server.",
    category: "Moderation",
    usage: `${prefix}action <description>`,
    do: (message, client, args, Discord) => {
      if (message.member.hasPermission("MANAGE_GUILD")) {
      }
    }
  }
  /*
    blacklist: {
        name: "User blacklist",
        description: "Add or remove member to blacklist, and view it.",
        usage: `${prefix}blacklist [add/remove] [member]`,
        do: (message, client, args, Discord) => {
            try {
                if (message.member.hasPermission("MANAGE_SERVER")) {
                    //let reason = args.slice(1).join(" ");
                    if (message.mentions.members.size !== 0) {
                        //message.mentions.members.first().ban(reason)
                        message.channel.send(`<@${message.mentions.users.first().id}> has been mentioned by <@${message.author.id}>.`);
                    } else {
                        message.channel.send("You didn"t identify a valid user");
                    }
                }
            } catch(e) {
                console.log(e);
            }
        }
    }*/
};

// Client events.
client.on("ready", () => {
  console.log(`Mod.js is Online`);

  let embed = new Discord.RichEmbed();
  embed.setColor(embedDefaultColor);
  embed.setThumbnail(client.user.avatarURL);
  embed.setAuthor(
    "Ready!",
    "https://media.discordapp.net/attachments/307975805357522944/392142646618882060/image.png"
  );
  embed.setDescription("I am idle and Ready for you Ram!");
  embed.setTimestamp();
  sendDM({ embed });
});
client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type !== "dm") {
  }
  otherFunctions(message);

  if (!message.content.startsWith(prefix)) return;
  let args = message.content.split(" ").splice(1);
  let command = message.content.substring(prefix.length).split(" ");
  for (let i in commands) {
    if (command[0].toLowerCase() === commands[i].name.toLowerCase()) {
      try {
        commands[i].do(message, client, args, Discord);
      } catch (e) {
        sendError(e);
      }
    }
  }
});
client.on("messageUpdate", (oldMsg, newMsg) => {
  if (newMsg.channel.type !== "dm" && newMsg.content) {
    console.log("Message edited:");
    console.log(`Old content: ${oldMsg.content}`);
    console.log(`New content: ${newMsg.content}`);
  }
});
client.on("messageReactionAdd", (reaction, user) => {
  const msgChannelId = reaction.message.channel.id;

  // If emoji is the KA flag...
  if (reaction.emoji.id === "485490810071285809") {
    // and user is not blacklisted, and user isn't flagging their own msg...
    if (
      blacklisted.indexOf(user.id) !== -1 ||
      user.id === reaction.message.author.id
    ) {
      // Remove user if so.
      reaction.remove(user);
    } else {
      // log the flagged message.
      logMessage(reaction.message, {
        user: `<@${reaction.message.author.id}>`,
        flaggers: reaction.users
          .array()
          .map(u => `<@${u.id}>`)
          .join(", "),
        content: reaction.message.content,
        channel: `<#${msgChannelId}>`
      });
    }
  }
  switch (reaction.emoji.name) {
    case "🗑":
      // If user has manage message perms...
      if (
        reaction.message.guild.members
          .find("id", user.id)
          .hasPermission("MANAGE_MESSAGES") &&
        user.id !== "372013264453894154"
      ) {
        // and the channel is not any official one...
        if (
          msgChannelId !== "473520957022142484" &&
          msgChannelId !== "473521399210835989" &&
          msgChannelId !== "479828958498783243" &&
          msgChannelId !== "479420816963141690"
        ) {
          // delete the message!
          reaction.message.delete();
        } else {
          reaction.remove(user);
        }
      }
      break;
    // case "📌":
    //     if (reaction.count >= 6) {
    //         reaction.message.pin();
    //     }
    // break;
  }
});

client.login(config.token);
