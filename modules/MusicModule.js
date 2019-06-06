const ytdl = require('ytdl-core');
const { musicChannelId } = require('../config/config.json');
const queue = [];

async function playTrack(voiceChannel) {
    let connection = await voiceChannel.join();

    let musicChannel = connection.client.channels.get(musicChannelId);

    if (connection.speaking) {
        return musicChannel.send(`There is currently a song playing, \`${queue[queue.length - 1].title}\` has been offered to the queue.`);
    }

    let track = queue.shift();
    let stream = ytdl(track.videoId, { filter: 'audioonly' });

    let dispatcher = connection.playStream(stream);


    let { title, author, duration, suggestedBy } = track;
    musicChannel.send(`Now Playing: ${title} suggested by ${suggestedBy}\nAuthor: ${author}\nDuration: ${duration}`);

    dispatcher.on('end', () => {
        musicChannel.send('Song has ended, playing next track!').then(() => {
            if (!queue.length) {
                voiceChannel.leave();
            } else {
                playTrack(voiceChannel, queue.shift);
            }
        });
    });
}

module.exports = {
    name: 'Music',
    description: '',
    events: {},
    async suggestTrack(voiceChannel, track) {

        queue.push(track);

        playTrack(voiceChannel);
    }
}