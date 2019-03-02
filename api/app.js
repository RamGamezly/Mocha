const express = require('express');
const Discord = require('discord.js');
var fs = require('fs')
var https = require('https')
var app = express()
const port = 3000
const db = require('quick.db');

const client = new Discord.Client();
client.login("MzcxNjg1NDI1MzUxMjI5NDQx.DpX5GA.NWVProSschY7TYXDzl6xDqLLQI8");

process.on('uncaughtException', function (err) {
    fs.writeFileSync("test.txt",  err, "utf8");    
})

app.get('/', async (req, res) => {
    console.log('GET Request to /')
    res.set({ 'content-type': 'application/json' });
    var obj = { message: `I'm a teapot`, message2: `So am I!`, message3: `Really?`, message4: `Yeah!`, message5: `Woah that's awesome.`, message6: `Here's a teapot: https://api.ender.site/teapot` }; 
    var json = JSON.stringify(obj); 
    res.status(418).send(json);
})

app.get("/oauth/authorize/:token", async (req, res) => {
    const oauth = new Discord.Client();
    oauth.login(req.params.token);    
    res.send(`Your ID is ${oauth.user.id}`)
});

app.get('/user/:userId', async (req, res) => {
    res.set({ 'content-type': 'application/json' });
    res.set({
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
        'Date': "0"
      });
    var userid = req.params.userId
    client.fetchUser (req.params.userId)
    .catch(err => { if(err == 'DiscordAPIError: Unknown User') { 
        var obj = { error: `Unknown User` }; 
        var json = JSON.stringify(obj); 
        res.send(json)  } else { var obj = { error: `${err}` }; 
        var json = JSON.stringify(obj); 
        res.send(json) } })
    .then(async result => { 
        var fetched = await db.fetch(`balance-${userid}`);
        var fetchedbank = await db.fetch(`bankbalance-${userid}`);
        var obj = { name: `${result.username}`, discrim: `${result.discriminator}`, avatar: `${result.avatarURL}`, balance: `${fetched}`, bankbalance: `${fetchedbank}` }; 
        var json = JSON.stringify(obj); 
        res.send(json) 
    })})

app.get('/teapot', async (req, res) => {
    res.sendFile(__dirname+"/teapot.jpg");
});

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  