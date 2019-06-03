const mongoose = require("mongoose");
const { mongoURI, token } = require('./config/config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

// Mongoose
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 1000
});

mongoose.connection.on("connected", () => {
    console.log(`Discord: Successfully connected to database ${mongoURI}`);
});

mongoose.connection.on("error", err => {
    console.log(`Discord: Error Occurred ${err}`);
});


client.on('ready', () => {
    console.log(`[Discord] Successfully logged in as ${client.user.tag}!`);
});

// Handling Modules
client.modules = new Discord.Collection();
require('./modules')(client);

// Handling Commands
client.commands = new Discord.Collection();
require('./commands')(client);

client.login(token).then();