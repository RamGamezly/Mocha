const { Client, RichEmbed, version } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');

const client = new Discord.Client();

const jobantispam = new Set();

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

module.exports = {
	name: 'bank',
	description: 'Slot machine',
	async execute(message, args) {
        const argu = message.content.split(' ');
        if(argu[1] == 'help') {
            let eEmbed = new Discord.MessageEmbed()
                .setTitle(`Bank of Mocha`)
                .addField("Economy", "`bal, crime, withdraw, deposit, create`")
                .addField("Work", "`work, resign`")
                .setDescription(`All commands below start with \`bank\``)
                .setColor("#3498db")
            return message.channel.send(eEmbed);  
        }
        if(!argu[1]) {
            let eEmbed = new Discord.MessageEmbed()
                .setTitle(`Bank of Mocha`)
                .addField("Economy", "`bal, crime, withdraw, deposit, create`")
                .addField("Work", "`work, resign`")
                .setDescription(`All commands below start with \`bank\``)
                .setColor("#3498db")
            return message.channel.send(eEmbed);            
        }
        if(argu[1] == 'bal') {
            let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                    .setColor("#e74c3c")
                return message.channel.send(eEmbed); 
            }
            else {
                let fetched = await db.fetch(`balance-${message.member.id}`);
                let fetchedbank = await db.fetch(`bankbalance-${message.member.id}`);
                if (fetched === null) {
                    balance = 0;
                }
                else {
                    balance = fetched;
                }
                if (fetchedbank === null) {
                    var am = 10000;
                    db.set(`bankbalance-${message.author.id}`, am);
                }
                else {
                    bbalance = fetchedbank;
                }
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`Your bank balance and current balance are stated below.`)
                    .addField("Current", `$${balance.toLocaleString()}`, true)
                    .addField("In Bank Account", `$${fetchedbank.toLocaleString()}`, true)
                    .setColor("#2ecc71")
                    .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                message.channel.send(wEmbed);  
            }            
        }
        if(argu[1] == 'crime') {
            let accnum = await db.fetch(`bankaccnum-${message.member.id}`);
            let fetched = await db.fetch(`balance-${message.member.id}`);
            console.log(fetched)
            var reasons = ['smashed in a car window', 'pickpocketed some old lady', 'broke into a house', 'raided bins', 'robbed a bank', 'robbed a charity shop'];
            let reason = reasons[Math.floor((Math.random() * reasons.length))];
            var bal = Math.floor(Math.random() * 200);
            var chance = Math.floor(Math.random() * 2);
            if(fetched < 0) {
                var people = ['the police', 'the cops', 'the council']
                let p = people[Math.floor((Math.random() * people.length))];
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`${message.author.username}, ${p} found out about your debt, so they gave you a kind warning.`)
                    .setColor("#2ecc71")
                    .setFooter(`Your bank account number is ${accnum}`, message.author.displayAvatarURL())
                message.channel.send(wEmbed);                   
            }
            if(fetched > 0) {
                if(chance == 1) {
                    var amt = parseFloat(fetched) + parseFloat(bal);
                    db.set(`balance-${message.author.id}`, amt);
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`You **${reason}** and stole **$${bal}**`)
                        .setColor("#3498db")
                        .setFooter(`Your bank account number is ${accnum}`, message.author.displayAvatarURL())
                    message.channel.send(wEmbed);     
                }  
                if(chance == 0) {
                    var people = ['the police', 'the cops', 'the council']
                    let p = people[Math.floor((Math.random() * people.length))];
                    var lbal = Math.floor(Math.random() * 1000);
                    var amt = parseFloat(fetched) - parseFloat(lbal);
                    db.set(`balance-${message.author.id}`, amt);
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`${message.author.username}, **${p}** were called and you were fined **$${lbal}**`)
                        .setColor("#e74c3c")
                        .setFooter(`Your bank account number is ${accnum}`, message.author.displayAvatarURL())
                    message.channel.send(wEmbed);                  
                }  
            }    
        }
        if(argu[1] == 'create') {
            let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                var accnum = Math.floor(Math.random() * message.author.id);
                db.set(`bankaccnum-${message.author.id}`, accnum)
                var am = 10000;
                db.set(`bankbalance-${message.author.id}`, am);
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`${message.author.username}, your bank account has been created, and a +$10,000 bonus has been added to your bank account for joining!`)
                    .addField("Bank Account Number", `\`${accnum}\``, true)
                    .setColor("#3498db")
                    .setFooter(`Your bank account number is ${accnum}`, message.author.displayAvatarURL())
                message.channel.send(wEmbed);                   
            }
            else {
                let wEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`Hold up chief, you already got a bank account.`)
                    .setColor("#e74c3c")
                    .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                message.channel.send(wEmbed);               
            }
        }
        if(argu[1] == 'withdraw') {
            if(argu[2]) {
                var arg2 = argu[2]
                if(isNaN(arg2) == false) {
                    let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
                    if (bankno === null) {
                        let eEmbed = new Discord.MessageEmbed()
                            .setTitle(`Bank of Mocha`)
                            .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                            .setColor("#e74c3c")
                        return message.channel.send(eEmbed);              
                    }
                    else {
                        let fetched = await db.fetch(`balance-${message.member.id}`);
                        let bfetched = await db.fetch(`bankbalance-${message.member.id}`);
                        if (fetched === null) {
                            balance = 0;
                        }
                        else {
                            balance = fetched;
                        }    
                        
                        if (bfetched === null) {
                            bbalance = 0;
                        }
                        else {
                            bbalance = bfetched;
                        } 
                        console.log(bfetched)
                        console.log(fetched)
                        if(!bfetched) {
                            let wEmbed = new Discord.MessageEmbed()
                                .setTitle(`Bank of Mocha`)
                                .setDescription(`How did this happen! You have no money in your bank account to withdraw, try joining a job with \`bank work\`.`)
                                .setColor("#e74c3c")
                                .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                            message.channel.send(wEmbed);                    
                        }  
                    
                        if(bfetched) {
                            if(bfetched < arg2) {
                                let wEmbed = new Discord.MessageEmbed()
                                    .setTitle(`Bank of Mocha`)
                                    .setDescription(`You don't have enough money in your bank account to do this.`)
                                    .setColor("#e74c3c")
                                    .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                                message.channel.send(wEmbed);                                
                            }
                            else {
                                let dfetched = await db.fetch(`balance-${message.member.id}`);
                                var deducted = bbalance-arg2;
                                db.set(`bankbalance-${message.author.id}`, deducted);
                                var added = parseFloat(dfetched) + parseFloat(arg2);
                                db.set(`balance-${message.author.id}`, added);
                                let nfetched = await db.fetch(`balance-${message.member.id}`);
                                let nbfetched = await db.fetch(`bankbalance-${message.member.id}`);
                                if (nfetched === null) {
                                    nbalance = 0;
                                }
                                else {
                                    nbalance = nfetched;
                                }    
                                
                                if (nbfetched === null) {
                                    nbbalance = 0;
                                }
                                else {
                                    nbbalance = nbfetched;
                                } 
                                let wEmbed = new Discord.MessageEmbed()
                                    .setTitle(`Bank of Mocha`)
                                    .setDescription(`**$${arg2}** has been transferred from your bank balance to your current balance.`)
                                    .setColor("#e74c3c")
                                    .addField("Current", `$${added.toLocaleString()}`, true)
                                    .addField("In Bank Account", `$${deducted.toLocaleString()}`, true)
                                    .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                                message.channel.send(wEmbed);  
                            }
                        }            
                    }            
                }
                if(isNaN(arg2) == true) {
                    let weEmbed = new Discord.MessageEmbed()
                        .setTitle(`That's not a number.`)
                        .setDescription("That doesn't look like a number to me...")
                        .setColor("#e74c3c");
                    message.channel.send(weEmbed);
                }
            if(!argu[2]) {
                let weEmbed = new Discord.MessageEmbed()
                    .setTitle(`Missing argument!`)
                    .setDescription("You must specify the amount you want to withdraw.")
                    .addField("Syntax", "`bank withdraw <number>`")
                    .setColor("#e74c3c");
                message.channel.send(weEmbed);
            }
        }
    }
    if(argu[1] == 'deposit') {
        if(argu[2]) {
            var arg2 = argu[2]
            if(isNaN(arg2) == false) {
                let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
                if (bankno === null) {
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                        .setColor("#e74c3c")
                    return message.channel.send(eEmbed);              
                }
                else {
                    let fetched = await db.fetch(`balance-${message.member.id}`);
                    let bfetched = await db.fetch(`bankbalance-${message.member.id}`);
                    if (fetched === null) {
                        balance = 0;
                    }
                    else {
                        balance = fetched;
                    }    
                    
                    if (bfetched === null) {
                        bbalance = 0;
                    }
                    else {
                        bbalance = bfetched;
                    } 
                    console.log(bfetched)
                    console.log(fetched)
                    if(!bfetched) {
                        let wEmbed = new Discord.MessageEmbed()
                            .setTitle(`Bank of Mocha`)
                            .setDescription(`How did this happen! You have no money in your current account to withdraw, try joining a job with \`bank work\`.`)
                            .setColor("#e74c3c")
                            .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                        message.channel.send(wEmbed);                    
                    }  
                
                    if(bfetched) {
                        if(bfetched < arg2) {
                            let wEmbed = new Discord.MessageEmbed()
                                .setTitle(`Bank of Mocha`)
                                .setDescription(`You don't have enough money in your account to do this.`)
                                .setColor("#e74c3c")
                                .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                            message.channel.send(wEmbed);                                
                        }
                        else {
                            let dfetched = await db.fetch(`balance-${message.member.id}`);
                            var rem = dfetched-arg2;
                            db.set(`balance-${message.author.id}`, rem);
                            var add = parseFloat(bfetched) + parseFloat(arg2);
                            db.set(`bankbalance-${message.author.id}`, add);
                            let nfetched = await db.fetch(`balance-${message.member.id}`);
                            let nbfetched = await db.fetch(`bankbalance-${message.member.id}`);
                            if (nfetched === null) {
                                nbalance = 0;
                            }
                            else {
                                nbalance = nfetched;
                            }    
                            
                            if (nbfetched === null) {
                                nbbalance = 0;
                            }
                            else {
                                nbbalance = nbfetched;
                            } 
                            let wEmbed = new Discord.MessageEmbed()
                                .setTitle(`Bank of Mocha`)
                                .setDescription(`**$${arg2}** has been transferred from your current balance to your bank balance.`)
                                .setColor("#e74c3c")
                                .addField("Current", `$${rem.toLocaleString()}`, true)
                                .addField("In Bank Account", `$${add.toLocaleString()}`, true)
                                .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                            message.channel.send(wEmbed);  
                        }
                    }            
                }            
            }
            if(isNaN(arg2) == true) {
                let weEmbed = new Discord.MessageEmbed()
                    .setTitle(`That's not a number.`)
                    .setDescription("That doesn't look like a number to me...")
                    .setColor("#e74c3c");
                message.channel.send(weEmbed);
            }
        if(!argu[2]) {
            let weEmbed = new Discord.MessageEmbed()
                .setTitle(`Missing argument!`)
                .setDescription("You must specify the amount you want to withdraw.")
                .addField("Syntax", "`bank withdraw <number>`")
                .setColor("#e74c3c");
            message.channel.send(weEmbed);
        }
    }
}
        if(argu[1] == 'resign') {
            let job = await db.fetch(`job-${message.member.id}`);
            if(job) {
                db.delete(`job-${message.member.id}`);
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`You resigned at **${job}**`)
                    .setColor("#e74c3c")
                return message.channel.send(eEmbed);       
            }     
        }
        if(argu[1] == 'work') {
            let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                    .setColor("#e74c3c")
                return message.channel.send(eEmbed); 
            }
            else {
                let job = await db.fetch(`job-${message.member.id}`);   
                if(job === null) {
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Select a job from the list below, you will be able to resign at anytime by typing \`bank resign\`\n\n:one: Boogle Inc.\n:two: Miscord Corporation\n:three: Microhard Corporation\n:four: Ayymazon Ltd\n:five: Abay Inc.\n\nType: \`bank job <number>\``)
                        .setColor("#e74c3c")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    message.channel.send(wEmbed);             
                }
                else {
                    var chance = Math.floor(Math.random() * 2);
                    if (jobantispam.has(message.author.id)) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Chill out!")
                            .setColor("#e67e22")
                            .setDescription(`${message.author.username}, don't overwork yourself!`)
                        return message.channel.send({embed});
                    }
                    else {
                        if(chance == 0) {
                            var hrs = Math.floor(Math.random() * 10);
                            var amt = Math.floor(Math.random() * 100);
                            let fetched = await db.fetch(`balance-${message.member.id}`);
                            if (fetched === null) {
                                balance = 0;
                            }
                            else {
                                balance = fetched;
                            }
                            var newamt = amt+balance
                            db.set(`balance-${message.author.id}`, newamt)
                            let wEmbed = new Discord.MessageEmbed()
                                .setTitle(`Bank of Mocha`)
                                .setDescription(`You worked at **${job}** for **${hrs} hours** and earned **$${amt}**.`)
                                .setColor("#3498db")
                                .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                            message.channel.send(wEmbed);   
                            jobantispam.add(message.author.id);
                                setTimeout(() => {
                                    jobantispam.delete(message.author.id);
                                }, 3000);                          
                        }
                        if(chance == 1) {
                            var reasons = ['called in sick', 'wet the bed', 'broke your laptop', 'were tired', 'forgot to go to work', 'got brutally stabbed', 'were in hospital', 'were fine and just stayed as home', 'put a 1 tonne weight on you while you slept'];
                            let reason = reasons[Math.floor((Math.random() * reasons.length))];
                            let wEmbed = new Discord.MessageEmbed()
                                .setTitle(`Bank of Mocha`)
                                .setDescription(`You **${reason}** and couldn't come into work.`)
                                .setColor("#e67e22")
                                .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                            message.channel.send(wEmbed);  
                            jobantispam.add(message.author.id);
                                setTimeout(() => {
                                    jobantispam.delete(message.author.id);
                                }, 3000);                            
                        }
                    }
                }
            }        
        }
        if(argu[1] == 'job') {
            let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha)
                    .setDescription(`Oops! You don't have a bank account, type \`bank create\` to create one.`)
                    .setColor("#e74c3c")
                return message.channel.send(eEmbed); 
            }
            else {
                var epen = Math.floor(Math.random() * 100);
                let job = await db.fetch(`job-${message.member.id}`);
                if(job) {
                    let wEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`You must resign before switching jobs.`)
                        .setColor("#3498db")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    message.channel.send(wEmbed);  
                }
                if(!job) {
                    if(argu[2] == '1') {
                        db.set(`job-${message.author.id}`, "Boogle Inc.")
                        let eEmbed = new Discord.MessageEmbed()
                            .setTitle(`Bank of Mocha`)
                            .setDescription(`Welcome to **Boogle Inc**, **Employee #${epen}**! We want the best of the best here at **Boogle**.\n\n**Today's Agenda**\n - Delete Boogle+\n - Sell user identity to ~~hackers~~ nice people`)
                            .setColor("#e74c3c")
                            .setThumbnail("https://cdn-proxy.ender.site/img/boogle.png")
                            .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                        return message.channel.send("Get working on your new job with `bank work`!", eEmbed); 
                }
                if(argu[2] == '2') {
                    db.set(`job-${message.author.id}`, "Miscord Corporation")
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Welcome to **Miscord Corporation**, **Employee #${epen}**! Don't worry, we fired that 🦊 ages ago.\n\n**Today's Agenda**\n - Everyone is working on T&S\n - Get the FBI (urgent)`)
                        .setColor("#e74c3c")
                        .setThumbnail("https://cdn-proxy.ender.site/img/miscord.png")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    return message.channel.send("Get working on your new job with `bank work`!", eEmbed);                
                }
                if(argu[2] == '3') {
                    db.set(`job-${message.author.id}`, "Microhard Corporation")
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Welcome to **Microhard Corporation**, **Employee #${epen}**! Doors 11 soon™\n\n**Today's Agenda**\n - Make Bong default search engine on all browsers\n - Make license keys 100% more expensive`)
                        .setColor("#e74c3c")
                        .setThumbnail("https://cdn-proxy.ender.site/img/microhard.png")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    return message.channel.send("Get working on your new job with `bank work`!", eEmbed);                
                }
                if(argu[2] == '4') {
                    db.set(`job-${message.author.id}`, "Ayymazon Ltd")
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Welcome to **Ayymazon Ltd**, **Employee #${epen}**! All dank memes are sold here ayy boi\n\n**Today's Agenda**\n - Sell memes\n - Pray to Jeff Bozos`)
                        .setColor("#e74c3c")
                        .setThumbnail("https://cdn-proxy.ender.site/img/ayymazon.png")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    return message.channel.send("Get working on your new job with `bank work`!", eEmbed);                
                }
                if(argu[2] == '5') {
                    db.set(`job-${message.author.id}`, "Abay Inc.")
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`Bank of Mocha`)
                        .setDescription(`Welcome to **Abay Inc.**, **Employee #${epen}**! Cheap and nasty stuff from china!\n\n**Today's Agenda**\n - Convince the chinese to give us more junk\n - more 👏 paypal 👏 transactions 👏`)
                        .setColor("#e74c3c")
                        .setThumbnail("https://cdn-proxy.ender.site/img/abay.png")
                        .setFooter(`Your bank account number is ${bankno}`, message.author.displayAvatarURL())
                    return message.channel.send("Get working on your new job with `bank work`!", eEmbed);                
                }
            }
        }
    }
    if(argu[1] == 'hack') {
        if(argu[2]) {
            let bankno = await db.fetch(`bankaccnum-${message.member.id}`);
            if (bankno === null) {
                let eEmbed = new Discord.MessageEmbed()
                    .setTitle(`Bank of Mocha`)
                    .setDescription(`Oops! You don't have a bank account to use your hackerman skills, type \`bank create\` to create one.`)
                    .setColor("#e74c3c")
                return message.channel.send(eEmbed); 
            }
            else {
                var ran = Math.random();
                let aEmbed = new Discord.MessageEmbed()
                    .setTitle(`Warning!`)
                    .setDescription(`This hack will set you back \`$${Math.round((ran*200))}\` if the hack fails, type \`yes\` if you are okay with this or \`no\` if you aren't.`)
                    .setColor("#e74c3c")
                const e1 = await message.channel.send(aEmbed); 
                try {
                    var response = await message.channel.awaitMessages(message2 => message2.content == 'yes' || message2.content == 'no', {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${message.author.tag}, you didn't pick anything!`)
                        .setColor('#e74c3c')
                    return message.channel.send(embed)
                }
                if(response.first().content == 'yes') {
                    response.first().delete()
                    const muser = message.mentions.members.first();
                    var chance = Math.floor(Math.random());
                    let eEmbed = new Discord.MessageEmbed()
                        .setTitle(`B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                        .setDescription(`Hacking into the mainframe...`)
                        .setColor("#e74c3c")
                    await e1.edit(eEmbed); 
                    wait(1000);
                    let eEmbed2 = new Discord.MessageEmbed()
                        .setTitle(`🏦 B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                        .setDescription(`Performing a reverse connection check...`)
                        .setColor("#e74c3c")
                    await e1.edit(eEmbed2)   
                    wait(1050);  
                    let eEmbed3 = new Discord.MessageEmbed()
                        .setTitle(`🏦 B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                        .setDescription(`Rerouting all internal security measures...`)
                        .setColor("#e74c3c")
                    await e1.edit(eEmbed3) 
                    wait(1050);  
                    let eEmbed4 = new Discord.MessageEmbed()
                        .setTitle(`🏦 B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                        .setDescription(`Brute forcing silently...`)
                        .setColor("#e74c3c")
                    await e1.edit(eEmbed4)   
                    wait(3000);  
                    var per = Math.floor(Math.random() * ((100-90)+1) + 90);
                    if (ran > 0.9) {
                        let eEmbed5 = new Discord.MessageEmbed()
                            .setTitle(`🏦 B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                            .setDescription(`Hack success, \`$${Math.round((ran*200))}\` was salvaged from ${muser.user.username}#${muser.user.discriminator}'s bank account.`)
                            .setColor("#e74c3c")
                        await e1.edit(eEmbed5)
                    } 
                    else {
                        let eEmbed5 = new Discord.MessageEmbed()
                            .setTitle(`🏦 B̸͖͒a̸̯̿n̷̛̬k̴͂͜ ̶̗́ọ̴̉f̵̘̄ ̵̣͝Ę̴̃n̴͚̊d̴̮͑ȩ̷͌r̸̝̾`)
                            .setDescription(`Hack failed on ${muser.user.username}#${muser.user.discriminator}, another source closed the connection, \`$${Math.round((ran*200))}\` was lost.`)
                            .setColor("#e74c3c")
                            .setFooter(`There was a ${per}% chance of that hack failing.`, message.author.displayAvatarURL())
                        await e1.edit(eEmbed5)                    
                    }    
                }
                else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`Cancelled.`)
                            .setColor('#e74c3c')
                        return message.channel.send(embed)  
                }       
            }
        }
    }
}}
