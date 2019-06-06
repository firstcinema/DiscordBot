const Utils = require('../utils/Utils');
const { prefix } = require('../config/config.json');

module.exports = (client) => {

    let cmdFiles = Utils.getAllFiles(__dirname);

    for (const file of cmdFiles) {
        let command = require(file);
        client.commands.set(command.name, command);
        console.log(`Registering Command '${command.name}'`);
    }

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) {
            return;
        }

        let commands = client.commands;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            return;
        }

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('This command is only executable within the server.');
        }

        if (command.voiceOnly && !message.member.voiceChannel) {
            return message.reply('You must be in a voice channel to execute this command');
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    });
}