const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    receivedMessage.channel.send("Message received: " + receivedMessage.content)
})

client.login("NjQxNzk4OTU0MDk4MzYwMzQw.XkCg2A.f1_18Jsx_o5eUK2DEGxIQQzC4a4")