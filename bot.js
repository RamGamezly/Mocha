const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    //message.channel.send("My brain hurts... I've been learning new stuff lately.");
});


client.on('message', message => {
    msg = message.content.toLowerCase();

    //
    //
    //Player Identify (with Question Mark)
    if (msg === 'who is ram?') {
    	message.channel.send('In the real world, Ram goes by the name R! He is the one that made me!');
      }
    if (msg === 'who is regularvibes?') {
    	message.channel.send('In the real world, RegularVibes goes by the name Josh! He is also an big pain in the ass!');
      }
    if (msg === 'who is maddy?') {
    	message.channel.send('maddy is the shortest little girl that your ever meet!');
      }
    if (msg === 'who is ryia?') {
    	message.channel.send('Ryia is the funnest person you will ever meet! She is the sister of Ram my Devoper!');
      }
    if (msg === 'who is ron?') {
    	message.channel.send('Ron is an Great frineds of Ram and Ryia.');
      }
    if (msg === 'who is friedorange?') {
    	message.channel.send('In the real world, FriedOrange goes by the name Brad! But you can also call him Pickle if you want.');
      }
    if (msg === 'who is glowe?') {
        message.channel.send('In the real world, Glowe goes by the name Michael!');
        message.channel.send('In the meme realm, Glowe is the lord of the hardest of memes.');
      }
    if (msg === 'who is guzzar?') {
    	message.channel.send('In the real world, Guzzar goes by the name Guy! He is the brother of Crutionix');
      }
    if (msg === 'who is johnny sprocket?') {
    	message.channel.send('In the real world, Johnny Sprocket goes by the name Nick! You can also call him Mechanic Mike.');
      }
    if (msg === 'who is lakoola?') {
    	message.channel.send('In the real world, Lakoola goes by the name Lyle!');
      }
    if (msg === 'who is silverfrost?') {
    	message.channel.send('In the real world, SilverFrost goes by the name Ben!');
      }
    if (msg === 'who is steamleopard?') {
    	message.channel.send('Hmm... all I know about Steamleopard is that he is a friend of Dragonlord. Note to self: Must find out name and update AI... woops! I mean... you heard nothing.');
      }
    if (msg === 'who is stuck in a box?') {
        message.channel.send('In the real world, Stuck in a box goes by the name Steven!');
        message.channel.send('Fun Fact: Stuck in a box was the inspiration behind Shithead`s Shipyard in Season 1 of Grimsever!');
    }
    if (msg === 'who is duckshit?') {
      message.channel.send('In the real world, duckshit goes by the name Phoenix!');
      message.channel.send('Fun Fact: Phoenix is a hedgehog.');
  }
    if (msg === 'who is chole chan?') {
      message.channel.send("Well, that's me!")
    }
    if (msg === 'who is fuck you and your donkey?') {
      message.channel.send('In the real world, Fuck you and your donkey (aka Johnny Sprocket) goes by the name Nick! You can also call him Mechanic Mike.');
      }
    //
    //
    //Player Identify (without Question Mark)
    if (msg === 'who is ram') {
    	message.channel.send('In the real world, Ram goes by the name R! He is the one that made me!');
      }
    if (msg === 'who is regularvibes') {
    	message.channel.send('In the real world, RegularVibes goes by the name Josh! He is also an big pain in the ass!.');
      }
    if (msg === 'who is maddy') {
    	message.channel.send('Maddy is the shortest little girl that your ever meet!');
      }
    if (msg === 'who is ryia') {
    	message.channel.send('Ryia is the funnest person you will ever meet! She is the sister of Ram my Devoper!');
      }
    if (msg === 'who is ron') {
    	message.channel.send('Ron is an Great frineds of Ram and Ryia.');
      }
    if (msg === 'who is friedorange') {
    	message.channel.send('In the real world, FriedOrange goes by the name Brad! But you can also call him Pickle if you want.');
      }
    if (msg === 'who is glowe') {
        message.channel.send('In the real world, Glowe goes by the name Michael!');
        message.channel.send('In the meme realm, Glowe is the lord of the hardest of memes.');
      }
    if (msg === 'who is guzzar') {
    	message.channel.send('In the real world, Guzzar goes by the name Guy! He is the brother of Crutionix');
      }
    if (msg === 'who is johnny sprocket') {
    	message.channel.send('In the real world, Johnny Sprocket goes by the name Nick! You can also call him Mechanic Mike.');
      }
    if (msg === 'who is fuck you and your donkey') {
        message.channel.send('In the real world, Fuck you and your donkey (aka Johnny Sprocket) goes by the name Nick! You can also call him Mechanic Mike.');
        }
    if (msg === 'who is lakoola') {
    	message.channel.send('In the real world, Lakoola goes by the name Lyle!');
      }
    if (msg === 'who is silverfrost') {
    	message.channel.send('In the real world, SilverFrost goes by the name Ben!');
      }
    if (msg === 'who is steamleopard') {
    	message.channel.send('Hmm... all I know about Steamleopard is that he is a friend of Dragonlord. Note to self: Must find out name and update AI... woops! I mean... you heard nothing.');
      }
    if (msg === 'who is stuck in a box') {
        message.channel.send('In the real world, Stuck in a box goes by the name Steven!');
        message.channel.send('Fun Fact: Stuck in a box was the inspiration behind Shithead`s Shipyard in Season 1 of Grimsever!');
    }
    if (msg === 'who is chole chan') {
      message.channel.send("Well, that's me!")
    }
    if (msg === 'who is illusiv3chick3n') {
      message.channel.send('In the real world, illusiv3chick3n goes by the name Jake! He is friends with Lakoola IRL!');
      }
      if (msg === 'who is illusiv3chick3n?') {
        message.channel.send('In the real world, illusiv3chick3n goes by the name Jake! He is friends with Lakoola IRL!');
        }
        if (msg === 'who is cassmus?') {
          message.channel.send('In the real world, Cassmus goes by the name Connor! I hear that Connor is the worst...');
          }
          if (msg === 'who is cassmus') {
            message.channel.send('In the real world, Cassmus goes by the name Connor! I hear that Connor is the worst...');
            }
            if (msg === 'who is duckshit') {
              message.channel.send('In the real world, Carlweezer96 (also known as duckshit) goes by the name Phoenix!');
              message.channel.send('Fun Fact: Phoenix is a hedgehog.');
          }
          if (msg === 'who is duckshit?') {
            message.channel.send('In the real world, Carlweezer96 (also known as duckshit) goes by the name Phoenix!');
            message.channel.send('Fun Fact: Phoenix is a hedgehog.');
        }
        if (msg === 'who is carlweezer96?') {
          message.channel.send('In the real world, Carlweezer96 (also known as duckshit) goes by the name Phoenix!');
          message.channel.send('Fun Fact: Phoenix is a hedgehog.');
      }
      if (msg === 'who is carlweezer96') {
        message.channel.send('In the real world, Carlweezer96 (also known as duckshit) goes by the name Phoenix!');
        message.channel.send('Fun Fact: Phoenix is a hedgehog.');
    }
    if (msg === 'who is llamguin') {
      message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
      message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
  }
  if (msg === 'who is llamguin?') {
    message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
    message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
}
if (msg === 'who is llamguin el spoop') {
  message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
  message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
}
if (msg === 'who is llamguin el spoop?') {
  message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
  message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
}
if (msg === 'who is llamguin el spööp') {
  message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
  message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
}
if (msg === 'who is llamguin el spööp?') {
  message.channel.send('In the real world, Llamguin (also known as Spööp) goes by the name Jess!');
  message.channel.send('Fun Fact: Jess is the girlfriend of Guzzar.');
}
    
    //
    //
    //General Dialog with R-Assistant
    if (msg === "how are you chole chan"){
      message.reply("I'm mighty fine thanks. Yourself?")}
    if (msg === "how are you chole chan?"){
      message.reply("I'm mighty fine thanks. Yourself?")}
    if (msg === "what's up chole chan"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}
    if (msg === "what's up chole chan?"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}
    if (msg === "whats up chole chan"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}
    if (msg === "whats up chole chan?"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}
    if (msg === "what are you doing chole chan"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}
    if (msg === "what are you doing chole chan?"){
      message.reply("Just sitting around waiting for an opportunity to say something.")}

      

    
    //
    //
    // Begin Bot Commands
    if (msg === '^summon') {
    	message.channel.send('No need to summon me! I\'m always here just waiting for an opportunity to provide information for you.');
    } 
    if (msg == '^debug'){
      message.channel.send("Boop Beep.");
    }
    if (msg == '^debug update status'){
      message.channel.send("Boop Beep.")
      message.channel.send("I was last updated on Febary 18, 2019 at 2:28pm.")
      message.channel.send("I last learned more content through machine learning on November 28, 2018 at 12:03am.");
    }
    if (msg == '^debug status'){
      message.channel.send("Boop Beep.");
      message.channel.send("All systems operational!")
      message.channel.send("Online and ready to help where I can!")
    }
    //
    //
    //Easter Eggs
    if (msg === 'feelsbadman.jpg') {
        message.channel.send('', {
            files: [ "https://i.warosu.org/data/tg/img/0316/76/1398321563797.jpg"]
        })
    }
    if (msg === 'moop'){
      //message.channel.send("🐮");
      message.react("🐮");
    }
    if (msg === 'lol'){
      //message.channel.send("🐮");
      message.react("😂");
    }
    if (msg === 'sad reacts only'){
      message.react("🙁");
    }
    if (msg === 'angry reacts only'){
      message.react("😡");
    }
    if (msg === 'angery reacts only'){
      message.react("😡");
    }
    if (msg === "jew"){
      message.react("✡");
    }
    var imagesarrary11 = ["src/AOE1.jpg", "src/AOE2.jpg", "src/AOE3.jpg", "src/AOE4.jpg", "src/AOE5.jpg", "src/AOE6.jpg", "src/AOE7.jpg", "src/AOE8.jpg"]
    if (msg === "11"){
      message.react("😂");
    }
    if (msg === "rip"){
      message.react("✝");
    }
    if (msg === "lol"){
      message.react("😂");
    }

    if (msg === "+joke"){
      var jokesArray = 
      ["Why did the chicken cross the road?      ...to get to the other side!",
       "Why didn't the skeleton cross the road?     ...he had no spine.",
       "Can a kangaroo jump higher than a house?     ...of course! a house can't jump at all!",
       "What is the difference between a snowman and a snowwoman?      ...snowballs.",
       "What do you get when you cross breed a cow and a shark?     ...I don't know, but I wouldn't try milking it!",
       "I invented a new word!    ...Plagiarism",
       "Why can’t you explain puns to kleptomaniacs?    ...they always take things literally.",
       "I'm single by choice... unfortunately it's just not MY choice."];
      var num = Math.floor(Math.random() * (jokesArray.length+1));
      message.channel.send(jokesArray[num])
    }
    if (msg === "+meme"){
      message.channel.send("I'm no Glowe. I only dabble in light memes!");
    }
    if (msg === "+memes"){
      message.channel.send("I'm no Glowe. I only dabble in light memes!");
    }
    if (msg === "who made you?"){
      message.channel.send("RamGamely");
    }
    if (msg === "kys"){
      message.channel.send("Well... that escalated quickly.", {
        files: ["src/e31.jpg"]
      })
    }
    if (msg === "wat"){
      message.channel.send("", {
        files: ["src/WAT.jpg"]
      })
    }
    if (msg === "kek"){
      message.react("😂")
      message.channel.send("I found this...")
      message.channel.send({embed:{
        color: 0xc00000,
        title: "Definition: KEK, kek",
        description: "Kek (KEK) is a phrase commonly used by players on World of Warcraft and League of Legends. It was made popular on World of Warcraft as an alternative to the abbrievation: 'LOL', which stands for Laugh out Loud.",
        }
      })
      message.channel.send("Isn't that fascinating?");
    }
    //
    //
    //Fortune Teller Command
    var fortunes = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes, Definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook: Good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "No.",
        "My sources say no.",
        "Outlook: Not good",
        "Very doubtful.",
    ]
    if (message.content.startsWith("+8ball")){
      var num = Math.floor(Math.random() * (fortunes.length+1));
      message.channel.send(fortunes[num])
    }
    if (msg === "me me"){
      message.channel.send("big boy"),
      message.channel.send("https://www.youtube.com/watch?v=aAr2urLA8gM")
    }
    if (msg === "me me big boy"){
      message.channel.send("me me? big boy."),
      message.channel.send("https://www.youtube.com/watch?v=aAr2urLA8gM")
    }
    //
    //
    //Query Command
    var query = [
      "+query what do you look like chole chan", //0
      "+query what do you look like chole chan?", //1
      "+query what is your favourite food chole chan", //2
      "+query what is your favourite food chole chan?", //3
      "+query what is your favourite colour chole chan", //4
      "+query what is your favourite colour chole chan?", //5
      "+query what is the meaning of life chole chan", //6
      "+query what is the meaning of life chole chan?" //7
    ]
    if (msg === query[0]){
      message.channel.send("I look like this!", {
        url: "https://cdn.discordapp.com/attachments/334753494604972032/672645459353010186/PSX_20200130_223104.jpg"
      })
    }
    if (msg === query[1]){
      message.channel.send("I look like this!", {
        files: "https://cdn.discordapp.com/attachments/334753494604972032/672645459353010186/PSX_20200130_223104.jpg"
      })
    }
    if (msg === query[2]){
      message.channel.send("I really like packets of data.")
    }
    if (msg === query[3]){
      message.channel.send("I really like packets of data.")
    }
    if (msg === query[4]){
      message.channel.send("My favourite colour is #C00000");
      message.channel.send("http://www.colorhexa.com/c00000")
    }
    if (msg === query[5]){
      message.channel.send("My favourite colour is #C00000");
      message.channel.send("http://www.colorhexa.com/c00000")
    }
    if (msg === query[6]){
      message.channel.send("I'm a bot. I can't comprehend such things. But if I find out, I'll let you know.")
    }
    if (msg === query[7]){
      message.channel.send("I'm a bot. I can't comprehend such things. But if I find out, I'll let you know.")
    }
    //
    //
    //
    var hello = ["Hey!","Hello!","Howdy!","Heya!","Hi!","Hiya!","Howdy-doodly!"]
    
    if (msg === "+query hey"){
      var num = Math.floor(Math.random() * (hello.length+1));
      message.channel.send(hello[num])
    }
    if (msg === "+query hi"){
      var num = Math.floor(Math.random() * (hello.length+1));
      message.channel.send(hello[num])
    }
    if (msg === "+query hello"){
      var num = Math.floor(Math.random() * (hello.length+1));
      message.channel.send(hello[num])
    }
    //
    //
    //
    var moodresponses = [
      "I'm not bad, thanks.","Could be worse!","Good, thanks!","I'm alright.","Had better days.","I'm okay.","Not the best, but thanks for asking","Honestly, not too good"
    ]
    if (msg === "+query how are you"){
      var num =Math.floor(Math.random() * (moodresponses.length+1));
      message.channel.send(moodresponses[num])
    }
    if (msg === "+query how are you?"){
      var num =Math.floor(Math.random() * (moodresponses.length+1));
      message.channel.send(moodresponses[num])
    }
    if (msg === "+query what's up"){
      message.channel.send("Just observing. Waiting, thinking... the usual.")
    }
    if (msg === "+query what's up?"){
      message.channel.send("Just observing. Waiting, thinking... the usual.")
    }
    if (msg === "+query whats up"){
      message.channel.send("Just observing. Waiting, thinking... the usual.")
    }
    if (msg === "+query whats up?"){
      message.channel.send("Just observing. Waiting, thinking... the usual.")
    }
    if (msg === "+query whats up?"){
      message.channel.send("Just observing. Waiting, thinking... the usual.")
    }
    if (msg === "+query who created you"){
      message.channel.send("I was developed primarily by SimplictyNode Which just so happens to be run by RamGamezly.")
    }
    if (msg === "+query who created you?"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly.")
    }
    if (msg === "+query who's your daddy?"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly.")
    }
    if (msg === "+query who is your daddy?"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly..")
    }
    if (msg === "+query whos your daddy?"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly..")
    }
    if (msg === "+query who's your daddy"){
      message.channel.send("I was developed primarily SimplictyNode. Which just so happens to be run by RamGamezly..")
    }
    if (msg === "+query whos your daddy"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly..")
    }
    if (msg === "+query who is your daddy"){
      message.channel.send("I was developed primarily by SimplictyNode. Which just so happens to be run by RamGamezly..")
    }
    //
    //
    //
    var shouldi = [
      "I don't see why not!", "Maybe", "That's really up to you.","It's entirely possible.","Yes. Definitely","Totally!","Better not."
    ]
    if (msg.startsWith("+query should i")){
      var sinum =Math.floor(Math.random() * (shouldi.length+1));
      message.channel.send(shouldi[sinum])
    }
    if (msg.startsWith("+query should we")){
      var sinum =Math.floor(Math.random() * (shouldi.length+1));
      message.channel.send(shouldi[sinum])
    }
    if (msg === "+query what do you do"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type ^commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg.startsWith("+query where is")){
      message.channel.send("Wouldn't you like to know...")
    }
    if (msg.startsWith("+query where are")){
      message.channel.send("Wouldn't you like to know...")
    }
    if (msg.startsWith("rise up")){
      message.channel.send("Rise! RISE UP! ..INTO THE ASS OF ELVES!")
    }
    if (msg === "+query what do you do?"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type +commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg === "+query what can you do"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type +commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg === "+query what can you do?"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type +commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg === "+query what are you capable of?"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type +commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg === "+query what are you capable of"){
      message.channel.send("I'm capable of doing many things and I'm always learning. Type +commands to see some awesome commands you can use with me. Otherwise, I'll just be waiting and listening to see if there's anything I can do or say that might help you or offer some sort of useful information.");
    }
    if (msg === "+query"){
      message.channel.send("You can use the +query command to address me when asking a question. Think of it as my version of tagging me with an '@' mention.");
      message.channel.send("However you must remember, I'm only learning. If I don't answer, it's because you've stumped me a little bit.");
      message.channel.send("Remember that some queries are best used with the +8ball command.")
    }
    if (msg.startsWith("+query who is")) {
      message.channel.send("As much as I love to see people using my commands, if you're wondering who someone is you don't need to +query. Just say 'who is' followed by the discord name of the player");
      }
    
    var headstails = ["Heads","Tails"]
    if (msg === "+query heads or tails"){
      var num =Math.floor(Math.random() * (headstails.length+1));
      message.channel.send(headstails[num])
    }
    if (msg === "+query heads or tails?"){
      var num =Math.floor(Math.random() * (headstails.length+1));
      message.channel.send(headstails[num])
    }
//
//
//Weather Query Commands
//Implemented by Machine Learning
//
//
    if (msg === "+query what is the weather like in wangaratta?"){
      message.channel.send("Here's the latest weather in Wangaratta:");
      message.channel.send("https://www.msn.com/en-au/weather/today/wangarattavictoriaaustralia/we-city?q=wangaratta-victoria&form=PRWLAS&iso=AU&el=RVvgToOHNVyA7y7xx1uYkA%3d%3d")}
    if (msg === "+query what is the weather like in wangaratta"){
      message.channel.send("Here's the latest weather in Wangaratta:");
      message.channel.send("https://www.msn.com/en-au/weather/today/wangarattavictoriaaustralia/we-city?q=wangaratta-victoria&form=PRWLAS&iso=AU&el=RVvgToOHNVyA7y7xx1uYkA%3d%3d")}
    if (msg === "+query what is the weather like in melbourne?"){
      message.channel.send("Here's the latest weather in Melbourne:");
      message.channel.send("https://www.msn.com/en-au/weather/today/Melbourne,VIC,Australia/we-city?iso=AU&el=1F8bFv0Z66nSZkTLU97OZw%3D%3D")}
    if (msg === "+query what is the weather like in melbourne"){
      message.channel.send("Here's the latest weather in Melbourne:");
      message.channel.send("https://www.msn.com/en-au/weather/today/Melbourne,VIC,Australia/we-city?iso=AU&el=1F8bFv0Z66nSZkTLU97OZw%3D%3D")}
    if (msg === "+query what is the weather like on the gold coast?"){
      message.channel.send("Here's the latest weather for the Gold Coast:");
      message.channel.send("https://www.msn.com/en-au/weather/today/gold-coastqueenslandaustralia/we-city?q=gold-coast-queensland&form=PRWLAS&iso=AU&el=tLJuupBZUdLc9sWTbG9ATw%3d%3d")}
    if (msg === "+query what is the weather like on the gold coast"){
      message.channel.send("Here's the latest weather for the Gold Coast:");
      message.channel.send("https://www.msn.com/en-au/weather/today/gold-coastqueenslandaustralia/we-city?q=gold-coast-queensland&form=PRWLAS&iso=AU&el=tLJuupBZUdLc9sWTbG9ATw%3d%3d")}
    if (msg === "+query what is the weather like in whorouly"){
      message.channel.send("Here's the latest weather in Whorouly:");
      message.channel.send("https://www.msn.com/en-au/weather/today/whoroulyvictoriaaustralia/we-city?q=whorouly-victoria&form=PRWLAS&iso=AU&el=jtah9nEzOvNx7k%2bdJ6OqBg%3d%3d")}
    if (msg === "+query what is the weather like in whorouly?"){
      message.channel.send("Here's the latest weather in Whorouly:");
      message.channel.send("https://www.msn.com/en-au/weather/today/whoroulyvictoriaaustralia/we-city?q=whorouly-victoria&form=PRWLAS&iso=AU&el=jtah9nEzOvNx7k%2bdJ6OqBg%3d%3d")}
    if (msg === "+query what is the weather in wangaratta?"){
      message.channel.send("Here's the latest weather in Wangaratta:");
      message.channel.send("https://www.msn.com/en-au/weather/today/wangarattavictoriaaustralia/we-city?q=wangaratta-victoria&form=PRWLAS&iso=AU&el=RVvgToOHNVyA7y7xx1uYkA%3d%3d")}
    if (msg === "+query what is the weather in wangaratta"){
      message.channel.send("Here's the latest weather in Wangaratta:");
      message.channel.send("https://www.msn.com/en-au/weather/today/wangarattavictoriaaustralia/we-city?q=wangaratta-victoria&form=PRWLAS&iso=AU&el=RVvgToOHNVyA7y7xx1uYkA%3d%3d")}
    if (msg === "+query what is the weather in melbourne?"){
      message.channel.send("Here's the latest weather in Melbourne:");
      message.channel.send("https://www.msn.com/en-au/weather/today/Melbourne,VIC,Australia/we-city?iso=AU&el=1F8bFv0Z66nSZkTLU97OZw%3D%3D")}
    if (msg === "+query what is the weather in melbourne"){
      message.channel.send("Here's the latest weather in Melbourne:");
      message.channel.send("https://www.msn.com/en-au/weather/today/Melbourne,VIC,Australia/we-city?iso=AU&el=1F8bFv0Z66nSZkTLU97OZw%3D%3D")}
    if (msg === "+query what is the weather on the gold coast?"){
      message.channel.send("Here's the latest weather for the Gold Coast:");
      message.channel.send("https://www.msn.com/en-au/weather/today/gold-coastqueenslandaustralia/we-city?q=gold-coast-queensland&form=PRWLAS&iso=AU&el=tLJuupBZUdLc9sWTbG9ATw%3d%3d")}
    if (msg === "+query what is the weather on the gold coast"){
      message.channel.send("Here's the latest weather for the Gold Coast:");
      message.channel.send("https://www.msn.com/en-au/weather/today/gold-coastqueenslandaustralia/we-city?q=gold-coast-queensland&form=PRWLAS&iso=AU&el=tLJuupBZUdLc9sWTbG9ATw%3d%3d")}
    if (msg === "+query what is the weather in whorouly?"){
      message.channel.send("Here's the latest weather in Whorouly:");
      message.channel.send("https://www.msn.com/en-au/weather/today/whoroulyvictoriaaustralia/we-city?q=whorouly-victoria&form=PRWLAS&iso=AU&el=jtah9nEzOvNx7k%2bdJ6OqBg%3d%3d")}
    if (msg === "+query what is the weather in whorouly"){
      message.channel.send("Here's the latest weather in Whorouly:");
      message.channel.send("https://www.msn.com/en-au/weather/today/whoroulyvictoriaaustralia/we-city?q=whorouly-victoria&form=PRWLAS&iso=AU&el=jtah9nEzOvNx7k%2bdJ6OqBg%3d%3d")
    }

    if (msg === "+coinflip"){
      var htnum =Math.floor(Math.random() * (headstails.length+1));
      message.channel.send(headstails[htnum])
    }

    var rps = ["✊","🤚","✌"]
    if (msg === "+rps"){
      var rpsnum =Math.floor(Math.random() * (rps.length+1));
      message.channel.send(rps[rpsnum])
    }
    if (msg === "+query rock paper scissors"){
      var rpsnum =Math.floor(Math.random() * (rps.length+1));
      message.channel.send(rps[rpsnum])
    }
    if (msg === "+query paper scissors rock"){
      var rpsnum =Math.floor(Math.random() * (rps.length+1));
      message.channel.send(rps[rpsnum])
    }
    if (msg === "+debug update notification"){
      message.delete();
      message.channel.send("I've been learning a lot lately! My brain hurts.")
    }
//
//
//
//
//
    if (msg === '+grimsever'){
      message.channel.send({embed:{
        color: 0x5b8b32,
        title: "Grimsever",
        description: "Grimsever is a friendly Minecraft Server played by members of the R-Portal community. ",
        fields: [{
            name: "+grimsever members",
            value: "See a list of past, current and future members of Grimsever"
        },
        {
          name: "+grimsever modpack",
          value: "Download the latest version of the modpack.",
        },
        {
            name: "+grimsever ip",
            value: "Display the IP address of Grimsever."
        },
        {
            name: "+grimsever news",
            value: "See the latest Grimsever news and announcements"
        },
        {
          name: "+grimsever projects",
          value: "View your assigned projects for the upcoming Grimsever Season 5"
        },
      ],
      thumbnail: {
        "url": "https://cdn.discordapp.com/app-icons/321980989167370240/c1efc3f41f2fd428a8d7d5e2bb773477.png"
      }

      }})
    }

    if (msg === "+grimsever members"){
      message.channel.send("To see a list of current and past Grimsever players, please go to http://mc.ryanwalpole.com/");
    }

    if (msg === "+grimsever modpack"){
      message.channel.send("You can download the Grimsever modpack easily by visiting http://connect.ryanwalpole.com/games/grimsever/#modpack");
    }

    if (msg === "+grimsever ip"){
      message.channel.send("The IP address for Grimsever is as follows >>>   rll.fluctis.com:26417");
    }

    if (msg === "+grimsever news"){
      message.channel.send("For the latest Grimsever news, please check the #announcements tab or view the Grimsever News on R-Connect at http://connect.ryanwalpole.com/games/grimsever/#news");
    }

    if (msg === "+grimsever projects"){
      message.channel.send("Check your assigned projects for Grimsever Season 5 by entering your username in the 'My Projects' page on R-Connect at http://connect.ryanwalpole.com/projects/");
    }

    if (msg === "+wb"){
      message.reply("Thanks! It's nice to be back.");
    }
    
    if (msg === "+stream"){
      message.channel.send("Here's some useful tools for streaming...")
      message.channel.send("http://connect.polegames/stream");
    }

    if (msg === "+record"){
      message.channel.send("Here's some useful tools for recording...")
      message.channel.send("http://conam");
    }

//
//
//
//
//
//

    //About
     if (msg === 'about'){
      message.channel.send({embed:{
        color: 0xc00000,
        title: "About",
        description: "I'm Chole Chan. I will offer you information and dialog whenever I hear something that I might be able to assist with. Here's some technical information about me:",
        fields: [{
            name: "Version",
            value: "v1.0.0"
        },
        {
            name: "Copyright",
            value: "Copyright 2019 - SimplictyNode"
        },
        {
            name: "Language",
            value:"EN-AU"
        },
        {
          name: "Commands",
          value: "^help should give you an idea of my commands and capabilities."
        },
        {
          name: "More Information",
          value: "You can Dm RamGamezly for more info"
        }
      ],
      thumbnail: {
        "url": "https://cdn.discordapp.com/attachments/334753494604972032/672645459353010186/PSX_20200130_223104.jpg"
      }

      }})
    }
    
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);