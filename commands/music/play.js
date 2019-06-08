const ytdl = require('ytdl-core');
const youtube = require('../../utils/YoutubeUtil');
const { youtubeKey } = require('../../config/config.json');

/* eslint-disable no-useless-escape */
const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

function search(query) {
    return youtube.get('/search', {
        params: {
            q: query,
            part: 'snippet',
            maxResults: 1,
            key: youtubeKey
        }
    });
}

module.exports = {
    name: 'play',
    aliases: [],
    guildOnly: true,
    voiceOnly: true,
    async execute(message, args) {
        let member = message.member;
        let voiceChannel = member.voiceChannel;
        let permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has('CONNECT')) {
            return message.reply('I do not have permission to connect to that voice channel! :(');
        } else if (!permissions.has('SPEAK')) {
            return message.reply('I do not have permission to speak in that voice channel! :(');
        }

        if (!args.length) {

            if (!voiceChannel.connection) {
                message.reply('I am currently not playing any music');
                return;
            }

            let connection = voiceChannel.connection;

            let dispatcher = connection.dispatcher;

            if (!dispatcher.paused) {
                message.reply('music player is already playing.');
                return;
            }

            dispatcher.resume();

            message.reply('Current track has been resumed');
            return;
        }

        let url = args[0];

        if (!pattern.test(args[0])) {
            try {
                let response = await search(args.join(' '));
                url = response.data.items[0].id.videoId;
            } catch (error) {
                return message.reply('I could not find a track with this title, try manually inputting a `url`');
            }
        }

        let info = await ytdl.getInfo(url, { filter: 'audioonly' });

        let track = {
            title: info.title,
            videoId: info.video_id,
            author: info.author.name,
            duration: info.length_seconds,
            suggestedBy: `${message.author.username}#${message.author.discriminator}`
        };


        message.client.modules.get('Music').suggestTrack(voiceChannel, track);
    }
}