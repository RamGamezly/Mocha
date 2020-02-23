const Discord = require("discord.js");
const config = require("./config.json");

const shardingManager = new Discord.ShardingManager("./rainbow.js", {
  token: config.token
});

shardingManager
  .spawn()
  .then(() => {
    console.info(
      `[ShardManager] Started ${shardingManager.totalShards} shards`
    );
  })
  .catch(error => {
    console.error(error);
});