const fs = require('fs');
const { prefix } = require('../config/config.json');

module.exports = (client) => {
    const cmdFiles = fs.readdirSync('./commands/').filter(file => {
        return file.endsWith('js') && !file.startsWith('index')
    });

    for (const file of cmdFiles) {
        let command = require(`./${file}`);
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

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
        }
    });
}