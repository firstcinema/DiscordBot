module.exports = {
    name: 'pause',
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

        let connection = voiceChannel.connection;

        let dispatcher = connection.dispatcher;

        if (dispatcher.paused) {
            message.reply('music player is already paused.');
            return;
        }

        dispatcher.pause();

        message.reply('Current track has been paused');
    }
}