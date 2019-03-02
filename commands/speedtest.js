const Discord = require('discord.js');
var speedTest = require('speedtest-net');
const client = new Discord.Client();

module.exports = {
	name: 'speedtest',
	description: 'run a speedtest',
	async execute(message, args) {
    var exec = require('child_process').exec;
    const awaitt = await message.channel.send(`⌛ Running Speedtest...`);

    exec('speedtest-cli --share', function (error, stdOut, stdErr) {
        var res = stdOut.split("Share results: ");
        let wEmbed = new Discord.MessageEmbed()
        .setColor("#2ecc71")
        .setImage(res[1])
        awaitt.edit(wEmbed)
    });
    }
}

