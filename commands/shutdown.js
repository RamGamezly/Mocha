const Discord = require('discord.js')

exports.run = (client, message, args, tools) => {

if (message.author.id === "316676396305088522") {
                client.destroy().then(() => {
                    console.log("Client destroyed");
                    process.exit(0);
                });
            }
        }
module.exports.help = {
    name: "shutdown"
}