const config = require("./config.json");
const Discord = require("discord.js");
const bottext = require("./bot.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let prefix = config.prefix;
const ownerID = "316676396305088522";
var derp = 0;
var colorEmbed = "#7000CD";

var letters = [
  "🇦",
  "🇧",
  "🇨",
  "🇩",
  "🇪",
  "🇫",
  "🇬",
  "🇭",
  "🇮",
  "🇯",
  "🇰",
  "🇱",
  "🇲",
  "🇳",
  "🇴",
  "🇵",
  "🇶",
  "🇷",
  "🇸",
  "🇹",
  "🇺",
  "🇻",
  "🇼",
  "🇽",
  "🇾",
  "🇿"
];
var unicode = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

var games = [];

var stages = [
  `\`\`\`
/---|
|   
|
|
|
\`\`\`
`,
  `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`,
  `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`,
  `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`,
  `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`,
  `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`,
  `\`\`\`
/---|
|   o ~ ur gay
|  /|\\
|  / \\
|
\`\`\`
`
];
function generateMessage(phrase, guesses) {
  var s = "";
  for (var i = 0; i < phrase.length; i++) {
    if (phrase[i] == " ") s += " ";
    else {
      var c = phrase[i];
      if (guesses.indexOf(c) == -1) c = "\\_";
      s += "__" + c + "__ ";
    }
  }
  return s;
}

function nextLetter(message, index, word) {
  message.react(letters[index]).then(r => {
    index++;
    if (index < letters.length) {
      if (index == 13) {
        message.channel.send(generateMessage(word, [])).then(m => {
          games.push({
            stage: 0,
            msg0: message,
            msg1: m,
            phrase: word,
            guesses: []
          });
          nextLetter(m, index);
        });
      } else {
        nextLetter(message, index, word);
      }
    }
  });
}

bot.on("messageReactionAdd", (reaction, user) => {
  var msg = reaction.message;
  if (!user.bot) {
    for (var i = 0; i < games.length; i++) {
      var game = games[i];
      if (
        (msg.id == game.msg0.id || msg.id == game.msg1.id) &&
        game.stage < stages.length
      ) {
        var letter = unicode[letters.indexOf(reaction.emoji.name)];

        reaction.fetchUsers().then(usrs => {
          var reactors = usrs.array();
          var remove_next = function(index) {
            if (index < reactors.length)
              reaction
                .remove(reactors[index])
                .then(() => remove_next(index + 1));
          };

          remove_next(0);
        });

        if (game.guesses.indexOf(letter) == -1) {
          game.guesses.push(letter);
          if (game.phrase.indexOf(letter) == -1) {
            game.stage++;
            game.msg0.edit(stages[game.stage]);
          } else {
            var sik = true;
            for (var j = 0; j < game.phrase.length; j++) {
              var c = game.phrase[j];
              if (c != " " && game.guesses.indexOf(c) == -1) {
                sik = false;
              }
            }

            if (sik) {
              game.msg0.edit(
                stages[game.stage].replace("o", "o ~ ur not gay.. for now")
              );
            }

            game.msg1.edit(generateMessage(game.phrase, game.guesses));
          }
        }
      }
      games[i] = game;
    }
  }
});

//bot is on
bot.on("ready", () => {
  console.log("Main2.js is online");
  bot.user.setActivity(`on ${bot.guilds.size} Servers | ${config.prefix}help`, {
    type: "STREAMING"
  });
  setInterval(function() {
    var u, user;
    for (u in bot.users) {
      user = bot.users[u];
      if (user instanceof Discord.User)
        console.log("[" + u + "]" + user.username);
    }
  }, 10000);
});

bot.on("message", async message => {
  const perms = message.member.permissions;
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const member = message.mentions.members.first();
  const user = message.mentions.users.first();
  const channel = message.mentions.channels.first();
  const role = message.mentions.roles.first();
  //comands

  if (command === "hello") {
    message.channel.send("Hello!");
  }
  if (command === "status") {
    if (message.author.id !== ownerID) return;
    bot.user.setActivity(`${args.join(" ")}`);
    message.channel.send(":white_check_mark: Successfully changed status");
  }
  if (command === "statusdef") {
    if (message.author.id !== ownerID) return;
    bot.user.setActivity(
      `Over ${bot.guilds.size} Servers | ${config.prefix}help`,
      { type: "WATCHING" }
    );
    message.channel.send(":white_check_mark: Successfully reset bot status");
  }
  if (command === "reset") {
    if (message.author.id !== ownerID) return;
    resetBot(message.channel);
    function resetBot(channel) {
      message.channel.send("Bot is restarting");
      bot.user.setActivity(`Restarting......`);
      message
        .reply(":white_check_mark: Bot has been restarted successfully!")
        .then(msg => bot.destroy())
        .then(() => bot.login(process.env.TOKEN));
    }
  }
  if (command === "devcommands") {
    if (message.author.id !== ownerID) return;
    const devCommandsEmbed = new Discord.RichEmbed()
      .setColor(colorEmbed)
      .setDescription(
        "status: changes the status of the bot.\nstatus_def: changes the status to default. \nreset: resets bot.\nderp_reset: resets the derp counter.\ndmme <message>: dms yourself a message.\ndm <message>: dms a person a message."
      )
      .setAuthor("Developer Commands");
    message.channel.send(devCommandsEmbed);
  } else if (command === "user_info") {
    message.channel.reply(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
  }
  if (command === "derp") {
    derp += 1;
    message.channel.send(`Derp Counter: ${derp}`);
  }
  if (command === "derpreset") {
    if (message.author.id !== ownerID) return;
    derp = 0;
    message.channel.send("Derp Counter has now been reset!");
  }
  if (command === "derpview") {
    message.channel.send(`Derp Counter: ${derp}`);
  }

  if (command === "oof") {
    message.channel.send(
      "Oof!\nhttps://giphy.com/gifs/landonmoss-landon-moss-3oz8xz12ps500JuWnC"
    );
  }
  if (command === "av") {
    function getUserFromMention(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        return bot.users.get(mention);
      }
    }
    if (args[0]) {
      const user = getUserFromMention(args[0]);
      if (!user) {
        return message.reply(
          "Please use a proper mention if you want to see someone else's avatar."
        );
      }

      return message.channel.send(
        `${user.username}'s avatar: ${user.displayAvatarURL}`
      );
    }

    return message.channel.send(
      `${message.author.username}, your avatar: ${message.author.displayAvatarURL}`
    );
  }

  if (command === "fortnitememe") {
    var minmm = 1;
    var maxmm = 10;
    var randommm = Math.floor(Math.random() * (+maxmm - +minmm)) + +minmm;
    if (randommm === 1) {
      message.channel.send(
        "http://freeaddon.com/wp-content/uploads/2018/12/top-50-fortnite-memes-05.jpg"
      );
    } else if (randommm === 2) {
      message.channel.send(
        "data:image/jpeg;base64,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"
      );
    } else if (randommm === 3) {
      message.channel.send(
        "https://res.cloudinary.com/lmn/image/upload/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/3/4/5/345c1d5a9b9b50c.jpeg"
      );
    } else if (randommm === 4) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrL4y6R4qgGV29yemCdbyhd1T3TnIqjOppTHrB_9XAve0p0xcvIw"
      );
    }
    if (randommm === 5) {
      message.channel.send(
        "http://cupheadmemes.com/wp-content/uploads/2018/07/Best-Funny-Fortnite-Memes-015.jpg"
      );
    }
    if (randommm === 6) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl6Rl7ZhFxRapO91VJP3nWDbK8lmNPUGK0uKKPhUm9lYDKejeXPA"
      );
    }
    if (randommm === 7) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZIBl5Ap9XMz_f72ggktZ18OC8MLD7NZK40ZqfnPDjkfZ96aNZQ"
      );
    }
    if (randommm === 8) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuxvsXBZcyKkX9J4sn07jq_znsSkger5FcPdsKWt4hkzwoI28HnA"
      );
    }
    if (randommm === 9) {
      message.channel.send(
        "https://www.dailydot.com/wp-content/uploads/2018/03/DT_HWx6X0AADobi.jpg-large.jpeg"
      );
    }
    if (randommm === 10) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2Lbso7Jv5uFlMEgmdAoXMF5ZrZ2rPXXS7-YwiQ9uYBM4-I_Cqw"
      );
    }
  }
  if (command === "pjmeme") {
    var minpj = 1;
    var maxpj = 10;
    var randompj = Math.floor(Math.random() * (+maxpj - +minpj)) + +minpj;
    if (randompj === 1) {
      message.channel.send(
        "https://pics.me.me/percy-jackson-vs-hercules-hercules-yeah-i-m-a-demigod-18669850.png"
      );
    }
    if (randompj === 2) {
      message.channel.send(
        "data:image/jpeg;base64,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"
      );
    }
    if (randompj === 3) {
      message.channel.send(
        "data:image/png;base64,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"
      );
    }
    if (randompj === 4) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhMelXFNQkeDzC4sNKNfgs8N5GjCdFrzYvOM9UDUKCpBdkCHSkw"
      );
    }
    if (randompj === 5) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6xUEE1YtVH26Njr8fx45n0T38yO2Z0f-vBRkGT0pJLi8h0Wb"
      );
    }
    if (randompj === 6) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAae_2rtef1rNZI1cXpBYSR55Gu9oSFoRN4pg3oeYzpTv0nJVd6Q"
      );
    }
    if (randompj === 7) {
      message.channel.send(
        "https://data.whicdn.com/images/304633400/large.jpg"
      );
    }
    if (randompj === 8) {
      message.channel.send(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0hpN2GQMU3YQpmv1lBsP30v8f9lEolgGb8r0YnrlBcHjREW2YrQ"
      );
    }
    if (randompj === 9) {
      message.channel.send(
        "data:image/jpeg;base64,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"
      );
    }
    if (randompj === 10) {
      message.channel.send(
        "https://d.wattpad.com/story_parts/605517907/images/154281b7e22c6ad8802325845899.jpg"
      );
    }
  }
  if (command == "ht") {
    function doRandHT() {
      var rand = ["HEADS!", "TAILS!"];

      return rand[Math.floor(Math.random() * rand.length)];
    }

    const embed = {
      title: `Here is the winner!`,
      description: doRandHT(),
      color: 7584788
    };
    message.channel.send({ embed });
  }
  if (command === "8ball") {
    let question = message.content
      .split(/\s+/g)
      .slice(1)
      .join(" ");
    if (!question) {
      return message.channel.send(`You must provide a question.`);
    }
    var answer = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ];
    const ballEmbed = new Discord.RichEmbed()
      .setAuthor(question)
      .setDescription(
        answer[Math.round(Math.random() * (answer.length - 1))] + "."
      )
      .setColor(colorEmbed)
      .setTimestamp();
    message.channel.send(ballEmbed);
  }
  if (command === "eval") {
    if (message.author.id == ownerID) {
      try {
        const code = args.join(" ");
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        console.log();
        evaled, { code: "xl" };
      } catch (err) {
        console.log(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
    }
  }
  if (command === "react") {
    message.react("😄");
  }
  if (command === "reaction_test") {
    message.react("👍").then(() => message.react("👎"));

    const filter = (reaction, user) => {
      return (
        ["👍", "👎"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === "👍") {
          message.reply("you reacted with a thumbs up.");
        } else {
          message.reply("you reacted with a thumbs down.");
        }
      })
      .catch(collected => {
        message.reply(
          "you reacted with neither a thumbs up, nor a thumbs down."
        );
      });
  }
  if (command === "quote") {
    var quotemin = 1;
    var quotemax = 11;
    var quote = Math.floor(Math.random() * (+quotemax - +quotemin)) + +quotemin;
    if (quote === 1) {
      const quote1Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://cdn.discordapp.com/attachments/603406384012328983/603885960068857856/quote_2.jpg"
        );
      message.channel.send(quote1Embed);
    }
    if (quote === 2) {
      const quote2Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://cdn.discordapp.com/attachments/603406384012328983/603885515938332683/quote_1.jpg"
        );
      message.channel.send(quote2Embed);
    }
    if (quote === 3) {
      const quote3Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605942614881075230/lol.png?width=200&height=300"
        );
      message.channel.send(quote3Embed);
    }
    if (quote === 4) {
      const quote4Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605942878748803128/lol1.jpg"
        );
      message.channel.send(quote4Embed);
    }
    if (quote === 5) {
      const quote5Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605943282501156875/lol2.jpg"
        );
      message.channel.send(quote5Embed);
    }
    if (quote === 6) {
      const quote6Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605943869942792192/lol3.jpg?width=246&height=300"
        );
      message.channel.send(quote6Embed);
    }
    if (quote === 7) {
      const quote7Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605944762901594163/lol4.jpg?width=223&height=300"
        );
      message.channel.send(quote7Embed);
    }
    if (quote === 8) {
      const quote8Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605945176816615465/lol5.jpg?width=221&height=300"
        );
      message.channel.send(quote8Embed);
    }
    if (quote === 9) {
      const quote9Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605948481001226250/lol6.png?width=200&height=300"
        );
      message.channel.send(quote9Embed);
    }
    if (quote === 10) {
      const quote10Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605948478966857760/lol7.jpg"
        );
      message.channel.send(quote10Embed);
    }
    if (quote === 11) {
      const quote11Embed = new Discord.RichEmbed()
        .setColor(colorEmbed)
        .setAuthor("Inspirational Quote")
        .setImage(
          "https://media.discordapp.net/attachments/603406384012328983/605949345103216650/lol8.jpg?width=300&height=300"
        );
      message.channel.send(quote11Embed);
    }
  }
  if (command === "serverinfo") {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    let verifLevels = [
      "None",
      "Low",
      "Medium",
      "(╯°□°）╯︵  ┻━┻",
      "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
    ];
    let region = {
      brazil: ":flag_br: Brazil",
      "eu-central": ":flag_eu: Central Europe",
      singapore: ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      sydney: ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      london: ":flag_gb: London",
      amsterdam: ":flag_nl: Amsterdam",
      hongkong: ":flag_hk: Hong Kong",
      russia: ":flag_ru: Russia",
      southafrica: ":flag_za:  South Africa"
    };
    const embed = new Discord.RichEmbed()
      .setColor(colorEmbed)
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("Name", message.guild.name, true)
      .addField("ID", message.guild.id, true)
      .addField(
        "Owner",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
        true
      )
      .addField("Region", region[message.guild.region], true)
      .addField(
        "Total | Humans | Bots",
        `${message.guild.members.size} | ${
          message.guild.members.filter(member => !member.user.bot).size
        } | ${message.guild.members.filter(member => member.user.bot).size}`,
        true
      )
      .addField(
        "Verification Level",
        verifLevels[message.guild.verificationLevel],
        true
      )
      .addField("Channels", message.guild.channels.size, true)
      .addField("Roles", message.guild.roles.size, true)
      .addField(
        "Creation Date",
        `${message.channel.guild.createdAt
          .toUTCString()
          .substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`,
        true
      )
      .setThumbnail(message.guild.iconURL);
    message.channel.send({ embed });
  }
  if (command === "dmme") {
    if (message.author.id !== ownerID) return;
    let user = message.author;
    let say = args.join(" ");
    user.send(say);
  }
  if (command === "dm") {
    if (message.author.id == ownerID) {
      let user = message.mentions.members.first();
      let say = args.slice(1).join(" ");
      user.send(say);
    }
  }
  if (command === "ynpoll") {
    let question = args.join(" ");
    message.channel.send(question).then(m => m.react("❎").then(m.react("✅")));
    message.delete(command);
  }
  if (command === "embed") {
    message.delete();
    let say = args.slice(1).join(" ");
    let colour = args[0];
    const embedEmbed = new Discord.RichEmbed()
      .setColor(colour)
      .setDescription(say);
    message.channel.send(embedEmbed);
  }
  if (command === "chnnlsetslowmode") {
    const hasMngChannels = perms.has("MANAGE_CHANNELS");
    if (hasMngChannels) {
      if (!args[0]) return;
      let slowmodeTime = args[1];
      let channelSlowmode = message.mentions.channels.first();
      channelSlowmode.setRateLimitPerUser(slowmodeTime);
      message.channel.send(
        `${channelSlowmode} now has ${slowmodeTime} second(s) of Slowmode.`
      );
    } else {
      message.channel.send("You do not have the `Manage Channels` permission.");
    }
  }
  if (command === "chnnldel") {
    const hasMngChannels = perms.has("MANAGE_CHANNELS");
    if (hasMngChannels) {
      if (!args[0]) return;
      let channelDelete = message.mentions.channels.first();
      channelDelete.delete();
      message.channel.send(`${channelDelete.name} has been deleted.`);
    } else {
      message.channel.send("You do not have the `Manage Channels` permission");
    }
  }
  if (command === "chnnlsetname") {
    const hasMngChannels = perms.has("MANAGE_CHANNELS");
    if (hasMngChannels) {
      if (!args[0]) return;
      let channelName = message.mentions.channels.first();
      let textName = channelName.name;
      let name = args[1];
      if (args[2]) message.channel.send("Please join name with `-`.");
      if (!args[2]) {
        channelName.setName(name);
        message.channel.send(`${textName}\'s name has been changed to ${name}`);
      }
    } else {
      message.channel.send("You do not have the `Manage Channels` permission.");
    }
  }
  if (command === "chnnlcreate") {
    const hasMngChannels = perms.has("MANAGE_CHANNELS");
    if (hasMngChannels) {
      if (!args[0]) return;
      if (args[1]) {
        message.channel.send("Please join name with `-`.");
        return;
      }
      let name = args[0];
      message.guild.createChannel(name);
    }
  }
  if (command === "chnnlsettopic") {
    const hasMngChannels = perms.has("MANAGE_CHANNELS");
    if (hasMngChannels) {
      if (!args[0]) return;
      let channelTopic = message.mentions.channels.first();
      let topic = args.slice(1).join(" ");
      channelTopic.setTopic(topic);
      message.channel.send(
        `${channelTopic}'s topic has been changed to \n\`${topic}\`.`
      );
    }
  }
  if (command === "chnnlclone") {
    if (perms.has("MANAGE_CHANNELS")) {
      if (!args[0]) return;
      let channelClone = message.mentions.channels.first();
      channelClone.clone(
        channelClone.name,
        true,
        true,
        `Needed a Clone for ${channelClone.name}`
      );
      message.channel.send(`${channelClone} has been cloned.`);
      console.log(`${channelClone.name} has been cloned.`);
    }
  }
  if (command === "chnnlperms") {
    if (!args[0]) return;
    let member = message.mentions.members.first();
    let channelPermissions = message.mentions.channels.first();
    let say = channelPermissions.memberPermissions(member);
    message.channel.send(say);
    console.log(
      `${member.username}'s permissions in ${channelPermissions.name} has been stated.`
    );
  }
  if (command === "setreport") {
    const hasAdmin = perms.has("ADMINISTRATOR");
    if (hasAdmin) {
      message.guild.createChannel("reports");
    } else {
      message.channel.send("You do not have the `Administrator` permission.");
    }
  }
  if (command === "report") {
    let report = args.join(" ");
    let reportChannel = message.guild.channels.find(c => c.name === "reports");
    let reportEmbed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username} (${message.author.id})`)
      .setDescription(report)
      .setColor(colorEmbed);
    reportChannel.send(reportEmbed);
  }
  if (command === "addroleadmin") {
    let hasAdmin = perms.has("ADMINISTRATOR");
    if (hasAdmin) {
      message.guild.createRole({
        name: "Admin",
        permissions: [
          "MANAGE_MESSAGES",
          "KICK_MEMBERS",
          "ADMINISTRATOR",
          "MANAGE_ROLES",
          "MANAGE_CHANNELS",
          "BAN_MEMBERS",
          "SEND_MESSAGES",
          "CHANGE_NICKNAME",
          "MANAGE_NICKNAMES",
          "READ_MESSAGE_HISTORY",
          "MENTION_EVERYONE",
          "VIEW_CHANNEL"
        ]
      });
      message.channel.send("The `Admin` role has been created.");
    } else {
      message.channel.send("You do not have the `Administrator` permission.");
    }
  }
  if (command === "addrolemod") {
    let hasAdmin = perms.has("ADMINISTRATOR");
    if (hasAdmin) {
      message.guild.createRole({
        name: "Mod",
        permissions: [
          "MANAGE_MESSAGES",
          "KICK_MEMBERS",
          "BAN_MEMBERS",
          "SEND_MESSAGES",
          ""
        ]
      });
    }
  }
  if (command === "creeper") {
    const embedCreeper = new Discord.RichEmbed()
      .setColor(colorEmbed)
      .setAuthor("Creeper")
      .setTitle("The Music Video")
      .setURL("https://youtu.be/cPJUBQd-PNM")
      .addField("Intro (TryHardNinja)", "Creeper\nAw man", false)
      .addField(
        "Verse 1 (TryHardNinja)",
        "So we back in the mine\nGot our pickaxe swinging from side to side\nSide-side to side\nThis task, a grueling one\nHope to find some diamonds tonight, night, night\nDiamonds tonight",
        false
      )
      .addField(
        "Pre-Chorus (TryHardNinja)",
        "Heads up\nYou hear a sound, turn around and look up\nTotal shock fills your body\nOh, no, it's you again\nI can never forget those eyes, eyes, eyes\nEyes-eye-eyes",
        false
      )
      .addField(
        "Chorus (TryHardNinja",
        "'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again\n'Cause, baby, tonight\nYou grab your pick, shovel, and bolt again (Bolt again-gain)\nAnd run, run until it's done, done\nUntil the sun comes up in the morn'\n'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again (Stuff again-gain)",
        false
      )
      .addField(
        "Verse 2 (TryHardNinja)",
        "Just when you think you're safe\nOverhear some hissing from right behind\nRight-right behind\nThat's a nice life you have\nShame it's gotta end at this time, time, time\nTime-time-time-time",
        false
      )
      .addField(
        "Pre-Chorus (TryHardNinja",
        "Blows up\nThen your health bar drops and you could use a one-up\nGet inside, don't be tardy\nSo, now you're stuck in there\nHalf a heart is left, but don't die, die, die\nDie-die-die",
        false
      )
      .addField(
        "Chorus (TryHardNinja)",
        "'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again\n'Cause, baby, tonight\nYou grab your pick, shovel, and bolt again (Bolt again-gain)\nAnd run, run until it's done, done\nUntil the sun comes up in the morn'\n'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again",
        false
      )
      .addField(
        "Verse 3 (CaptainSparklez)",
        "(Creepers, you're mine, haha)\nDig up diamonds and craft those diamonds\nAnd make some armor, get it, baby\nGo and forge that like you so MLG pro\nThe sword's made of diamonds, so come at me, bro, huh\nTraining in your room under the torchlight\nHone that form to get you ready for the big fight\nEvery single day and the whole night\nCreeper's out prowlin', hoo, alright\nLook at me, look at you\nTake my revenge, that's what I'm gonna do\nI'm a warrior, baby, what else is new?\nAnd my blade's gonna tear through you, bring it",
        false
      )
      .addField(
        "Bridge (TryHardNinja & CaptainSparklez)",
        "'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again\n(Gather your stuff, yeah, let's take back the world)\nYeah, baby, tonight (Haha)\nGrab your sword, armor and go (It's on)\nTake your revenge (Woo), oh-oh, oh-oh\nSo fight, fight, like it's the last, last night\nOf your life, life, show them your bite (Woo)",
        false
      )
      .addField(
        "Chorus (TryHardNinja & CaptainSparklez)",
        "'Cause, baby, tonight\nThe creeper's tryna steal all our stuff again\n'Cause, baby, tonight\nYou grab your pick, shovel and bolt again (Bolt again-gain, woo)\nAnd run, run until it's done, done\nUntil the sun comes up in the morn'\n'Cause, baby, tonight (Come on, swing your sword up high)\nThe creeper's tryna steal all our stuff again (Come on, jab your sword down low)\n(Woo)",
        false
      )
      .setFooter("by TryHardNinja & Captain Sparklez");
    message.channel.send(embedCreeper);
  }
  if ((command = "addrole")) {
    let hasMngRoles = perms.has("MANAGE_ROLES");
    if (hasMngRoles) {
      let roleName = args[0];
      message.guild.createRole({
        name: roleName,
        permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "VIEW_CHANNEL"]
      });
      message.channel.send(`The role ${roleName} has been created.`);
    } else {
      message.channel.send("You do not have the `Manage Roles` permission.");
    }
  }
  if (command === "nick") {
    if (!perms.has("MANAGE_NICKNAMES")) {
      return message.channel.send(
        "You do not have the `Manage Nicknames`permission."
      );
    }
    let memberNick = message.mentions.members.first();
    let nick = args[1];
    if (!memberNick) return;
    if (!nick) return;
    memberNick.setNickname(nick);
  }
  if (command === "inv") {
    const args = message.content.split(" ").slice(1);
    bot.guilds
      .get(args[0])
      .channels.filter(c => c.type == "text")
      .first()
      .createInvite()
      .then(inv =>
        message.channel.send(`${bot.guilds.get(args[0]).name} | ${inv.url}`)
      );
  }
  if (command === "invs") {
    message.guild.fetchInvites().then(invite => message.channel.send(invite));
  }
  if (command === "chnnlinfo") {
    let channelInfo = message.mentions.channels.first();
    if (!channelInfo) return;
    let userCreated = channelInfo.client;
    let timeCreated = channelInfo.createdAt;
    let channelID = channelInfo.id;
    let channelType = channelInfo.type;
    const chnnlinfoEmbed = new Discord.RichEmbed()
      .setColor(colorEmbed)
      .setAuthor(channelInfo.name, message.guild.iconURL)
      .addField("Channel Description", channelInfo.topic, true)
      .addField("Channel ID", channelID, true)
      .addField("Channel Position", channelInfo.position, true)
      .addField("User Who Created Channel", userCreated, true)
      .addField("Time Created", timeCreated, true)
      .addField("Channel Type", channelType, true)
      .addField("Category", channelInfo.parent, true)
      .addField("Category ID", channelInfo.parentID, true)
      .setThumbnail(message.guild.iconURL);
    message.channel.send(chnnlinfoEmbed);
    console.log(`${channelInfo.name}'s details has been stated.`);
  }
  if (command === "rps") {
    let userChoice = args[0];
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
      computerChoice = "rock";
    } else if (computerChoice <= 0.67) {
      computerChoice = "paper";
    } else {
      computerChoice = "scissors";
    }
    var compare = function(choice1, choice2) {
      if (choice1 === choice2) {
        return "The result is a tie!";
      }
      if (choice1 === "rock") {
        if (choice2 === "scissors") {
          return "rock wins";
        } else {
          return "paper wins";
        }
      }
      if (choice1 === "paper") {
        if (choice2 === "rock") {
          return "paper wins";
        } else {
          if (choice2 === "scissors") {
            return "scissors wins";
          }
        }
        if (choice1 === "scissors") {
          if (choice2 === "rock") {
            return "rock wins";
          } else {
            if (choice2 === "paper") {
              return "scissors wins";
            }
          }
        }
      }
    };
    console.log("User Choice: " + userChoice);
    console.log("Computer Choice: " + computerChoice);
    compare(userChoice, computerChoice);
  }
  if (command === "cursedmcmeme") {
    var answer = [
      "https://pics.me.me/damn-last-cursed-minecraft-image-for-now-44105772.png",
      "data:image/jpeg;base64,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",
      "http://pm1.narvii.com/7156/269eedff18685d9d84c7cd2dc3bbdf58315dec14r1-563-544v2_uhq.jpg",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,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",
      "http://pm1.narvii.com/7156/269eedff18685d9d84c7cd2dc3bbdf58315dec14r1-563-544v2_uhq.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVDPTwWHhVafGM0b0p9CaPHcGOKdZ-dUK1HldPW56ufILHA6OS",
      "https://i.kym-cdn.com/photos/images/newsfeed/001/468/272/4bc.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8e2yHgRPOWyKjpRtyYgQ1oqyJhM0eP1fnzP5BKT6pjtKpPH6bsQ",
      "https://cdn130.picsart.com/291352069010201.jpg?r1024x1024",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Ywkos9qjHmOxr1cnmjaxX8VFJSsL6Px_FSnLtlRHM5rG-dcl",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwRocYjGnuBCL--S-oxK66RxCgG2qe2moZHmPkLV6ceFR7s64POQ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXMEKHjsireJd3Bzn28WG_gvlAl8_VF2fmUNjJA7CHQN5KGtA",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsMgHLE5ALvG-UjnFyfRuGZvN8JpRLhXRINGJW38k5IvuENw7p1A",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTW3TaZhjD7STuoWzJCXoIhIcwt6w5Y3TH33gF0zIIZN8hLFf05w",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHdJSmAFwBVOl-ulM-YfJQUzHaZfamglNZKVsx3tmfYoXJ3xYoug",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2L_wf-IoeUgB5zsMidN-RLhvj1-qoefZbOYZNs3RWdSrLh9-JQg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaqpktH-MX5xwXuoyCDVSjGQdB2dBNbnm64VoW_kl_50RcNhHfGA",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MB_W0ZEHPeNy5Cf_3HMvSUAK50eucTW-l3jJOamFjEMbreJp",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGNfhQEmzw5sN-13LTgyPTVL54ra4COkBVpBXgqLywm8RvJShM4g"
    ];
    const cursedMcMemeEmbed = new Discord.RichEmbed()
      .setAuthor("Cursed Minecraft Memes")
      .setImage(answer[Math.round(Math.random() * (answer.length - 1))] + ".")
      .setColor(colorEmbed)
      .setTimestamp();
    message.channel.send(cursedMcMemeEmbed);
  }
  if (command === "hangman") {
    var usage = "`$hangman <your phrase>`\n`Example: $hangman hangman`";
    var words = args.split("\n")[0].split(" ");
    if (words.length < 1) {
      message.channel.send(usage);
    } else {
      var word = words
        .join(" ")
        .toLowerCase()
        .replace(/[^a-z\s:]/g, "");
    }
  }
}); //bot login to application
bot.login(config.token);
