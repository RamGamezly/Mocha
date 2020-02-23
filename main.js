const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
const server = require("./server.js");
const { Util } = require("discord.js");
var request = require("superagent");
const ManagedGuild = require("./guild.js");
const Debug = require("debug");
const log = Debug("bot");
const statsLog = Debug("stats");
const inviteLog = Debug("invites");
const updateLog = Debug("bot-update");
const mod = require("./mod.js");
const main2 = require("./Main2.js");

client.commands = new Discord.Collection();

var prefix = "^";

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  if (message.channel.type === "dm") return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.on("ready", () => {
  client.user.setPresence({
    game: { name: `With Your Heart!`, type: 0 },
    status: "ilde"
  });
  console.log(
    "Chole Chan bot online! Created by RamGamezly AKA Rowan Alan Meier."
  );
});
client.on("ready", () => {
  console.log("You are connected to " + client.guilds.size + " servers!");
});

client.on("disconnect", event => {
  log("bot disconnected from discord", event);
  process.exit(1);
});
client.on("rateLimit", (info, limit, timeDiff, path, method) => {
  log("bot hit rate limit", info);
});
client.on("error", err => {
  log("bot thrown error", err);
});
client.on("warn", warning => {
  log("bot thrown warning", warning);
});

function hasSendPermission(channel) {
  return (
    channel.type === "text" &&
    channel.memberPermissions(channel.guild.me).has("SEND_MESSAGES")
  );
}

function mainChannel(guild) {
  if (guild.systemChannelID) {
    const systemChannel = guild.channels.get(guild.systemChannelID);
    if (hasSendPermission(systemChannel)) {
      return systemChannel;
    }
  }

  const general = guild.channels.find(channel =>
    /^(general|main|chat)$/.test(channel.name)
  );
  if (general && hasSendPermission(general)) {
    return general;
  }

  const sorted = guild.channels.sort((chanA, chanB) => {
    if (!hasSendPermission(chanA)) return -1;
    return chanA.position < chanB.position ? -1 : 1;
  });
  const bestPossible = sorted.first();

  return bestPossible;
}
let mentionRegex;

const paused = {
  /*
    <guild id>: <paused true/false>
    */
};
function updateAll() {
  for (const guild of client.guilds.array()) {
    if (paused[guild.id]) continue;
    updateLog(`updating guild ${guild.id} (${guild.name})`);
    const managed = ManagedGuild.get(guild);
    managed
      .update()
      .then(() =>
        updateLog(`completed guild update ${guild.id} (${guild.name})`)
      )
      .catch(err =>
        log(`failed to update guild ${guild.id} (${guild.name})`, err)
      );
  }
}
client.on("ready", () => {
  console.log("bot logged into discord servers");

  mentionRegex = new RegExp(`<@(!|)${client.user.id}>`);

  let stats =
    "connected to discord, currently participating in the following guilds:\n";
  client.guilds.forEach(guild => {
    stats += `(${guild.id}) ${
      guild.name
    } joined at ${guild.joinedAt.toISOString()}\n`;
    let admins = "";
    let users = "";
    guild.members.forEach(member => {
      const isAdmin = member.permissions.has(8);
      const info = `    ${isAdmin ? "admin" : "user "} ${member.user.tag}${
        member.nickname ? ` (${member.nickname})` : ""
      } with role ${member.highestRole.name}\n`;
      if (isAdmin) admins += info;
      else users += info;
    });
    stats += admins;
    stats += users;
    guild
      .fetchInvites()
      .then(invites =>
        invites.forEach(invite => {
          console.log(
            `(${guild.id}) ${guild.name} has invite ${invite.url} with ${invite.maxUses} max uses`
          );
        })
      )
      .catch(err =>
        statsLog(
          `error fetching invites for guild (${guild.id}) ${guild.name}`,
          err.message /* err */
        )
      );
  });
  statsLog(stats);
});
client.on("guildCreate", guild => {
  log(`client joined guild ${guild.id} (${guild.name})`);
  mainChannel(guild).send({
    embed: new Discord.RichEmbed()
      .setTitle("Chole Chan")
      .setDescription(
        `Thanks for adding me to your Discord server!\nUse "^help" to get help using Me.`
      )
      .setFooter("Chole Chan HQ Server - https://discord.gg/DNYukjT")
  });
});
client.on("ready", () => {
    console.log(`[Chole Chan] Playing with ${client.users.size} users.`);
    console.log(`[Chole Chan] Bot Invite: https://discordapp.com/api/oauth2/authorize?client_id=641798954098360340&permissions=2147483127&scope=bot`);
});
client.login(config.token);