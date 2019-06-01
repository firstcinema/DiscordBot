const { token } = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`[Cinema] Successfully logged in as ${client.user.tag}!`);
});

// Handling Commands
client.commands = new Discord.Collection();
require('./commands')(client);

client.login(token);