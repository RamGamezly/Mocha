const express = require('express');
const Discord = require('discord.js');
var fs = require('fs')
var https = require('https')
var app = express()
const port = 3000
const db = require('quick.db');
const fetch = require('node-fetch');
var crypto = require('crypto');
var i2b = require("imageurl-base64");
app.set('view engine', 'pug')
var Vibrant = require('node-vibrant')

const client = new Discord.Client();
client.login("MzcxNjg1NDI1MzUxMjI5NDQx.DpX5GA.NWVProSschY7TYXDzl6xDqLLQI8");

process.on('uncaughtException', function (err) {
    fs.writeFileSync("test.txt",  err, "utf8");    
})

app.get('/', async (req, res) => {
    console.log('GET Request to /')
    res.set({ 'content-type': 'application/json' });
    res.set({ 'teapot': 'true' });
    res.set({ 'teapot-': 'true' });
    res.set({ 'teapot--': 'true' });
    res.set({ 'teapot---': 'true' });
    res.set({ 'teapot----': 'true' });
    res.set({ 'teapot-----': 'true' });
    res.set({ 'teapot------': 'true' });
    res.set({ 'teapot-------': 'true' });
    res.set({ 'teapot--------': 'true' });
    res.set({ 'teapot---------': 'true' });
    res.set({ 'teapot----------': 'true' });
    res.set({ 'teapot-----------': 'true' });
    res.set({ 'teapot------------': 'true' });
    res.set({ 'teapot-------------': 'true' });
    res.set({ 'teapot--------------': 'true' });
    res.set({ 'teapot---------------': 'true' });
    res.set({ 'teapot----------------': 'true' });
    res.set({ 'teapot-----------------': 'true' });
    res.set({ 'teapot------------------': 'true' });
    res.set({ 'teapot-------------------': 'true' });
    res.set({ 'teapot--------------------': 'true' });
    var obj = { message: `I'm a teapot`, message2: `So am I!`, message3: `Really?`, message4: `Yeah!`, message5: `Woah that's awesome.`, message6: `Here's a teapot: https://api.ender.site/teapot` }; 
    var json = JSON.stringify(obj); 
    res.status(418).send(json);
})

app.get("/oauth/authorize/:token", async (req, res) => {
    fetch('https://discordapp.com/api/users/@me', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${req.params.token}` },
    }).then(async i => {
        res.set({ 'Authorization': `ENDER ${req.params.token}` });
        res.set({ 'x-ender-app': `true` });
        var data = await i.text();
        var json = JSON.parse(data)
        if(json.id !== undefined) {
            res.send(`${json.id} => ${json.username}#${json.discriminator}`)
        }
        else {
            res.send("Token not found.")
        }
    }).catch(err => console.error(err));
});

app.get("/oauth/create/new/:id", async (req, res) => {
    res.set({ 'content-type': 'application/json' });
    var auth = req.get('Authorization')
    fetch('https://discordapp.com/api/users/@me', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
    }).then(async i => {
        var data = await i.text()
        var json = JSON.parse(data)
            if(json.id) {
                var guildi = client.guilds.get(req.params.id);
                var fetched = await db.fetch(`dashhash-${guildi.id}`);
                if(fetched == null) {
                    var text = `${guildi.id}${json.id}`
                    var hash = crypto.createHash('md5').update(text).digest('hex');
                    var obj = { result: hash }
                    var json = JSON.stringify(obj)
                    db.set(`dashhash-${guildi.id}`, hash);
                    res.send(json);
                }
                else {
                    var obj = { result: fetched }
                    var json = JSON.stringify(obj)
                    res.send(json);                       
                }
            }
            else {
                res.send(data);
            }
    })
});

app.get('/user/:userId', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site' })
    res.set({ 'content-type': 'application/json' });
    res.set({
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
        'Date': "0"
      });
    var userid = req.params.userId
    client.users.fetch(req.params.userId)
    .catch(err => { if(err == 'DiscordAPIError: Unknown User') { 
        var obj = { error: `Unknown User` }; 
        var json = JSON.stringify(obj); 
        res.send(json)  } else { var obj = { error: `${err}` }; 
        var json = JSON.stringify(obj); 
        res.send(json) } })
    .then(async result => { 
        var fetched = await db.fetch(`balance-${userid}`);
        var fetchedbank = await db.fetch(`bankbalance-${userid}`);
        var fetchedban = await db.fetch(`bankaccnum-${userid}`);
        var job = await db.fetch(`job-${userid}`);
        if(fetched == null) {
            fetched = 0
        }
        if(fetchedbank == null) {
            fetchedbank = 0
        }
        const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                      ];
        date = new Date(`${result.createdAt}`);
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
        if(job == null) {
            job = 'Unemployed'
        }
        if(fetchedban == null) {
            fetchedban = 0
        }
        var obj = { name: `${result.username}`, discrim: `${result.discriminator}`, avatar: `${result.avatarURL}`, bot: `${result.bot}`, economy: {}, accountCreated: `${dt} ${month} ${year} ${hr}:${mn}:${sc}`, spotify: {} }; 
        obj.economy.balance = `${fetched.toLocaleString()}`
        obj.economy.bank = `${fetchedbank.toLocaleString()}`
        obj.economy.accountnum = fetchedban
        obj.economy.job = `${job}`
        if(result.bot == true) {
            obj.robot = "🤖"
        }
        if(result.presence.game) {
            if(result.presence.game.name === 'Spotify') {
                obj.spotify.spotify = true
                obj.spotify.track = result.presence.game.details
                obj.spotify.artist = result.presence.game.state
                var trackid = result.presence.game.assets.largeImage.replace("spotify:", "")
                obj.spotify.album_art = `https://i.scdn.co/image/${trackid}`
                obj.spotify.link = `https://open.spotify.com/track/${result.presence.game.syncID}`
                var date1 = new Date(result.presence.game.timestamps.start);
                var date2 = new Date(result.presence.game.timestamps.end);
                var sec = (date2.getTime() / 1000.0) - (date1.getTime() / 1000.0);
                var hours = parseInt(sec / 60 / 60);
                sec = sec - hours * 60 * 60;
                var min = parseInt(sec / 60);
                var ses = sec - min * 60;
                obj.spotify.duration = `${Math.round(min)}:${Math.round(ses)}`
                var date11 = new Date(Date.now());
                var date21 = new Date(result.presence.game.timestamps.end);
                var sec = (date21.getTime() / 1000.0) - (date11.getTime() / 1000.0);
                var hours = parseInt(sec / 60 / 60);
                sec = sec - hours * 60 * 60;
                var min1 = parseInt(sec / 60);
                var ses1 = sec - min * 60;
                min = min1 + min
                ses = ses1 + ses
                obj.spotify.played = `${Math.round(min)}:${Math.round(ses)}`
            }
        }
        var json = JSON.stringify(obj); 
        res.send(json) 
    })})

app.get('/teapot', async (req, res) => {
    res.sendFile(__dirname+"/teapot.jpg");
});

app.get('/_/bulma.css', async (req, res) => {
    res.sendFile(__dirname+"/_/bulma.css");
});

app.options('/dash/:guildId', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site', 'Access-Control-Allow-Headers': 'authorization' })
    var auth = req.get('Authorization')
    fetch('https://discordapp.com/api/users/@me', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
    }).then(async i => {
        var data = await i.text()
        var json = JSON.parse(data)
            if(json.id) {
                    client.users.fetch(json.id)
                    .catch(err => { if(err == 'DiscordAPIError: Unknown User') { 
                        var obj = { error: `Unknown User` }; 
                        var json = JSON.stringify(obj); 
                        res.send(json)  } else { var obj = { error: `${err}` }; 
                        var json = JSON.stringify(obj); 
                        res.send(json) } })
                    .then(async result => { 
                        const g = client.guilds.get(req.params.guildId);
                        if(g) {
                            let hasperm = g
                            res.send(hasperm);
                        }
                        else {
                            res.sendFile(__dirname+"/routes/404.html");
                        }
                    });
            }
            else {
                res.send("Invalid Token")
            }
});    
})


app.options('/selectGuild', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site', 'Access-Control-Allow-Headers': 'authorization' })
    return res.status(200).json({});
})

app.get('/selectGuild', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site', 'Access-Control-Allow-Headers': 'authorization' })
    var auth = req.get('Authorization')
    if(auth) {
        fetch('https://discordapp.com/api/users/@me', {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
        }).then(async i => {
            var data = await i.text()
            var json = JSON.parse(data)
                if(json.id) {
                        client.users.fetch(json.id)
                        .catch(err => { if(err == 'DiscordAPIError: Unknown User') { 
                            var obj = { error: `Unknown User` }; 
                            var json = JSON.stringify(obj); 
                            res.send(json)  } else { var obj = { error: `${err}` }; 
                            var json = JSON.stringify(obj); 
                            res.send(json) } })
                        .then(async result => { 
                            res.render('selectguild', { user: { name: `${result.username}` }, title: 'Dashboard • Select Guild' })
                        });
                    }
                });
    }
    else {
        res.status(403).json({
            message: 'Missing authorization'
        });        
    }
})

app.post('/bot/:guildId', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site' })
    const g = client.guilds.get(req.params.guildId);
    if(g !== undefined) {
        g.members.forEach(function(member) {
            var members = 0
            members = member.id + ` ${members}`
            if(members.indexOf("371685425351229441") > -1) {
                res.json({ bot: 1 });
            }
        })  
    } 
    if(g == undefined) {
        res.json({ bot: 0 });
    } 
})


app.get('/dash/:guildId', async (req, res) => {
    res.set({ 'Access-Control-Allow-Origin': 'https://bot.ender.site', 'Access-Control-Allow-Headers': 'authorization' })
    var auth = req.get('Authorization')
    if(auth) {
        fetch('https://discordapp.com/api/users/@me', {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth}` },
        }).then(async i => {
            var data = await i.text()
            var json = JSON.parse(data)
                if(json.id) {
                        client.users.fetch(json.id)
                        .catch(err => { if(err == 'DiscordAPIError: Unknown User') { 
                            var obj = { error: `Unknown User` }; 
                            var json = JSON.stringify(obj); 
                            res.send(json)  } else { var obj = { error: `${err}` }; 
                            var json = JSON.stringify(obj); 
                            res.send(json) } })
                        .then(async result => { 
                            const g = client.guilds.get(req.params.guildId);
                            if(g) {
                                const nu = g.members.get(result.id);
                                if(nu !== undefined) {
                                    const p = nu.hasPermission("MANAGE_GUILD");
                                    if(p == true) {
                                        var gic = g.iconURL({format: "png"})
                                        if(gic == null) {
                                            gic = 'https://cdn.discordapp.com/embed/avatars/0.png'
                                        }
                                        Vibrant.from(gic).getPalette()
                                            .then((palette) => {
                                        res.render('index', { guild: { name: `${g.name}`, icon: `${gic}`, vibrant: `rgb(${palette.Vibrant._rgb[0]}, ${palette.Vibrant._rgb[1]}, ${palette.Vibrant._rgb[2]})` }, title: `Dashboard • ${g.name}`, user: { name: `${nu.user.username}`, avatar: `https://cdn.discordapp.com/avatars/${nu.user.id}/${nu.user.avatar}.png?size=1024` } })
                                    }) }
                                    else {
                                        res.render('errors/403', { title: 'Dashboard • No permission' })
                                    }
                                }
                                else {
                                    res.render('errors/404-user', { title: 'Dashboard • User not found' })
                                }
                            }
                            else {
                                res.render('errors/404-server', { title: 'Dashboard • Server not found' })
                            }
                        });
                }
                else {
                    res.render('errors/400', { title: 'Dashboard • Invalid Token' })
                }
    });
    }
    else {
        res.status(403).json({
            message: 'Missing authorization'
        });
    }
});

    app.listen(port, () => {
        process.title = `API`
        console.log(`App listening on port ${port}!`)
    })
  