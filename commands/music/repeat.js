module.exports = {
    name: 'repeat',
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

        musicModule.data.repeat = !musicModule.data.repeat;

        message.channel.send(`Now Repeating: \`${musicModule.data.currentTrack.title}\``);
    }
}