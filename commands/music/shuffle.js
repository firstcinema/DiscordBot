module.exports = {
    name: 'shuffle',
    aliases: [],
    guildOnly: true,
    voiceOnly: true,
    async execute(message) {
        let member = message.member;
        let voiceChannel = member.voiceChannel;

        if (!voiceChannel.connection) {
            message.reply('I am currently not playing any music');
            return;
        }

        let musicModule = message.client.modules.get('Music');

        if (!musicModule.data.queue.length) {
            return message.reply('the music queue is currently empty. :(');
        }

        message.client.modules.get('Music').shuffleQueue();
        message.reply('the music queue has been shuffled.');
    }
}