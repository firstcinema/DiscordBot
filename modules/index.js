const fs = require('fs');

module.exports = function(client) {
    const moduleFiles = fs.readdirSync('./modules/').filter(file =>
        file.endsWith('js') && !file.startsWith('index'));

    for (const moduleFile of moduleFiles) {
        let module = require(`./${moduleFile}`);
        client.modules.set(module.name, module);
        console.log(`Registering Module '${module.name}'`);
    }

    client.on('message', (message) => {
        client.modules.filter(module => module.events.hasOwnProperty('onMessage'))
            .forEach(module => module.events.onMessage(message));
    });

    client.on('ready', () => {
        client.modules.filter(module => module.events.hasOwnProperty('onReady'))
            .forEach(module => module.events.onReady(client));
    });

    client.on('guildMemberAdd', (member) => {
        client.modules.filter(module => module.events.hasOwnProperty('onJoin'))
            .forEach(module => module.events.onJoin(member));
    });
}