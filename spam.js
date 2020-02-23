var Discord = require("discord.js");
var bot = new Discord.Client();
const ownerID = "316676396305088522";
var config = require("./config.json");
var prefix = config.prefix;
bot.on("message", msg => {
  var suffix = msg.content.split(" ").slice(1);
  //CMDS
  if (msg.content.startsWith(prefix + "spamhelp")) {
    if (msg.author.id !== ownerID) return;
    var help = suffix[0];
    if (!help) {
      msg.channel.send([
        "```js" +
          "\nCOMMANDS:" +
          `\n${prefix}spam` +
          `\n${prefix}dspam` +
          `\n${prefix}pmspam` +
          `\n${prefix}dpmspam` +
          `\n${prefix}cspam` +
          "```"
      ]);
    } else {
      if (help === "spam") {
        msg.channel.send([
          "```js\nSpams something you said." +
            `\n${prefix}spam | NUMBER | TO SPAM\`\`\``
        ]);
      }
      //PMSPAM
      else if (help === "pmspam") {
        msg.channel.send([
          "```js\nPM Spams someone." +
            `\n${prefix}pmspam | @USERNAME | NUMBER | TO SPAM\`\`\``
        ]);
      }
      //DSPAM
      else if (help === "dspam") {
        msg.channel.send([
          "```js\nSpams something you said, but then deletes." +
            `\n${prefix}dspam | NUMBER | TO SPAM\`\`\``
        ]);
      }
      //DPMSPAM
      else if (help === "dpmspam") {
        msg.channel.send([
          "```js\nSpams someone, then deletes messages." +
            `\n${prefix}dpmspam | @USERNAME | NUMBER | TOSPAM\`\`\``
        ]);
      }
      //CHANNEL SPAM
      else if (help === "cspam") {
        msg.channel.send([
          "```js\nSpams in a specific channel." +
            `\n${prefix}cspam | #CHANNEL | NUMBER | TOSPAM\`\`\``
        ]);
      }
    }
  }
  //SPAM
  else if (msg.content.startsWith(prefix + "spam")) {
    try {
      if (msg.author.id !== ownerID) return;
      var timesRun = 0;
      var numberspam = suffix[0];
      console.log(numberspam);
      var tospam = msg.content
        .split(" ")
        .slice(2)
        .join(" ");
      console.log(tospam);
      let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
      var interval = setInterval(function() {
        msg.channel.send(tospam);
        timesRun += 1;
        if (timesRun === messagecount) {
          clearInterval(interval);
        }
      }, 1);
      msg.channel.send(interval.length);
    } catch (err) {
      console.log(err);
    }
  }
  //DELETESPAM
  else if (msg.content.startsWith(prefix + "dspam")) {
    try {
      if (msg.author.id !== ownerID) return;
      var timesRun = 0;
      var numberspam = suffix[0];
      console.log(numberspam);
      var tospam = msg.content
        .split(" ")
        .slice(2)
        .join(" ");
      console.log(tospam);
      let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
      var interval = setInterval(function() {
        msg.channel.send(tospam).then(m => {
          m.delete();
        });
        timesRun += 1;
        if (timesRun === messagecount) {
          clearInterval(interval);
        }
      }, 1);
      msg.channel.send(interval.length);
    } catch (err) {
      console.log(err);
    }
  }
  //PM
  else if (msg.content.startsWith(prefix + "pmspam")) {
    try {
      if (msg.author.id !== ownerID) return;
      var usertospam = msg.mentions.users.first();
      var timesRun = 0;
      var numberspam = suffix[1];
      console.log(numberspam);
      var tospam = msg.content
        .split(" ")
        .slice(3)
        .join(" ");
      console.log(tospam);
      let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
      var interval = setInterval(function() {
        usertospam.send(tospam);
        timesRun += 1;
        if (timesRun === messagecount) {
          clearInterval(interval);
        }
      }, 1);
      usertospam.send(interval.length);
    } catch (err) {
      msg.channel.send("Error, user not found.");
    }
  }
  //PMDELETE
  else if (msg.content.startsWith(prefix + "dpmspam")) {
    try {
      if (msg.author.id !== ownerID) return;
      var usertospam = msg.mentions.users.first();
      var timesRun = 0;
      var numberspam = suffix[1];
      console.log(numberspam);
      var tospam = msg.content
        .split(" ")
        .slice(3)
        .join(" ");
      console.log(tospam);
      let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
      var interval = setInterval(function() {
        usertospam.send(tospam).then(m => {
          m.delete();
        });
        timesRun += 1;
        if (timesRun === messagecount) {
          clearInterval(interval);
        }
      }, 1);
      usertospam.send(interval.length);
    } catch (err) {
      msg.channel.send("Error, user not found.");
    }
  }
  //CHANNEL SPAM
  else if (msg.content.startsWith(prefix + "cspam")) {
    try {
      if (msg.author.id !== ownerID) return;
      var channel = msg.mentions.channels.first();
      var timesRun = 0;
      var numberspam = suffix[1];
      console.log(numberspam);
      var tospam = msg.content
        .split(" ")
        .slice(2)
        .join(" ");
      console.log(tospam);
      let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
      var interval = setInterval(function() {
        bot.channels.get(channel.id).send(tospam);
        timesRun += 1;
        if (timesRun === messagecount) {
          clearInterval(interval);
        }
      }, 1);
      bot.channels.get(channel.id).send(interval.length);
    } catch (err) {
      console.log(err);
    }
  }
});
bot.login(config.token);

//UNHANDLED REJECTION
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
bot.on("ready", () => {
  console.log("spam.js online! Created by Ram.");
});