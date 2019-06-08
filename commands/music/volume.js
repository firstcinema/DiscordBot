module.exports = {
    name: 'volume',
    aliases: ['vol'],
    guildOnly: true,
    voiceOnly: true,
    async execute(message, args) {
        let member = message.member;
        let voiceChannel = member.voiceChannel;

        if (!voiceChannel.connection) {
            return message.reply('I am currently not playing any music');
        }

        let connection = voiceChannel.connection;

        let dispatcher = connection.dispatcher;

        let musicModule = message.client.modules.get('Music');

        if (!args.length) {
            return message.reply(`The current volume is ${musicModule.data.volume}`);
        }

        if (isNaN(args[0])) {
            return message.reply('The volume must be a number');
        }

        let vol = parseInt(args[0]);

        if (vol < 1 || vol > 10) {
            return message.reply('The volume can only be set to a volume between 1 and 10');
        }

        musicModule.data.volume = vol;
        dispatcher.setVolumeLogarithmic(vol / 5);
        message.reply(`The volume is now set to ${vol}`);
    }
}