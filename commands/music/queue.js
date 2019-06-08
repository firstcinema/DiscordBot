module.exports = {
    name: 'queue',
    aliases: ['q'],
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

        let { queue } = musicModule.data;

        if (!queue.length) {
            return message.reply('There currently isn\'t any music queue');
        }

        let list = queue.map(track => `__*${track.title}*__\n*Suggested by:* **${track.suggestedBy}**`).join('\n\n')

        message.channel.send(`**Music Queue [${queue.length}]:**\n${list}`);
    }
}