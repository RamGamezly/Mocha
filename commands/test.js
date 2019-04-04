const { createCanvas, loadImage, registerFont, } = require('canvas')
const { Client, RichEmbed, MessageAttachment } = require('discord.js');
const snekfetch = require('snekfetch');
registerFont('utils/welcome-card/roboto.ttf', { family: 'Roboto' })

module.exports = {
	name: 'test',
	description: 'Search and play a track',
	async execute(message, args) {

		const canvas = createCanvas(600, 350)
		const ctx = canvas.getContext('2d')

		// Draw cat with lime helmet
		loadImage('C:/Users/Administrator/Documents/Ender/Bot/Ender/utils/welcome-card/wc-2.gif').then(async (image) => {
		ctx.drawImage(image, 0, 0, 599, 349)

		var usrname = `${message.author.username}`
		const usdsplit = ctx.measureText(usrname).width;
		if(usdsplit <= 330) {
			var index = 600
			while (true) {
				index = --index
				var fontsize = `${index}px`
				ctx.font = `${fontsize} Roboto`;
				if (ctx.measureText(message.author.username).width >= 330) {            
					break;
				} 
			}
		}
		else {
			var fontsize = "60px"
		}
		ctx.font = `${fontsize} Roboto`;
		ctx.fillStyle = "#111111"
		ctx.fillText(usrname, 232, 198); 

		console.log(usdsplit)

		ctx.font = "37px Roboto";
		ctx.fillStyle = "#6e6e6e"
		ctx.fillText(`#${message.author.discriminator}`, usdsplit + 235, 199); 

		ctx.beginPath();
		// Start the arc to form a circle
		ctx.arc(106, 170, 67, 0, 2 * Math.PI);
		ctx.stroke(); 
		ctx.closePath();
		// Clip off the region you drew on
		ctx.clip();
	
		const { body: buffer } = await snekfetch.get(message.author.displayAvatarURL({ format: "png" }));
		loadImage(buffer).then(async (image) => {
			ctx.drawImage(image, 36, 100, 140, 140);

			const attachment = new MessageAttachment(canvas.toBuffer(), `welcome-${message.author.username}.png`);
			message.channel.send(attachment);
		});

		})
    }
}