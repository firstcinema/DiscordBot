module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
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

        let { currentTrack } = musicModule.data;

        message.channel.send(`Now Playing: \`${currentTrack.title}\``);
    }
}