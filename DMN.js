// Require needed modules.
const Discord = require("discord.js");
const config = require("./config.json");
// Set up client.
const client = new Discord.Client();

// Client settings.
const prefix = "^";
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

// Message sending functions.
const deleteMessage = msg => {
  msg.delete(deleteDelay);
};
const sendDM = msg => {
  if (!DEV_MODE) {
    client.users.find("id", "316676396305088522").send(msg);
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
  if (message.mentions.users.exists("id", "641798954098360340"))
    message.react("🤔");
};

// Client events.
client.on("ready", () => {
  console.log(`DM Nofication is Online!`);
});

client.on("guildCreate", guild => {
  sendDM(
    `:inbox_tray: New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
});
client.on("guildDelete", guild => {
  sendDM(
    `:outbox_tray: I have been removed from: ${guild.name} (id: ${guild.id}), it had ${guild.memberCount} members.`
  );
});
client.on("warn", e => {
  console.log("\nWARNING:\n\n", e);
});
client.on("error", e => {
  console.log("\nERROR:\n\n", e);
});
client.on("message", message => {
  if (message.content.toLowerCase() == "ping") {
    message.channel.send("pong!");
  } else if (message.content.toLowerCase() == "^all") {
    message.channel.send("All deserves Darkness");
  } else if (message.content.toLowerCase() == "^Ram") {
    message.channel.send("EXCALIBAHHHHHHHHHH");
  } else if (message.content.toLowerCase() == "^abbaa121") {
    message.channel.send("Cheat Code Activated!");
  }
});
client.login(config.token);
