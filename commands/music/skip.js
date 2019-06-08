module.exports = {
    name: 'skip',
    aliases: [],
    guildOnly: true,
    voiceOnly: true,
    async execute(message, args) {
        let member = message.member;
        let voiceChannel = member.voiceChannel;

        if (!voiceChannel.connection) {
            message.reply('I am currently not playing any music');
            return;
        }

        let connection = voiceChannel.connection;

        let dispatcher = connection.dispatcher;

        message.client.modules.get('Music').skipTrack(dispatcher, args[0]);
    }
}