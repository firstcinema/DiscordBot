const ytdl = require('ytdl-core');
const { musicChannelId } = require('../config/config.json');
var data = {
    volume: 5,
    repeat: false,
    currentTrack: {},
    queue: []
};

async function playTrack(voiceChannel) {
    let connection = await voiceChannel.join();

    let musicChannel = connection.client.channels.get(musicChannelId);


    if (connection.speaking) {
        return musicChannel.send(`There is currently a song playing, \`${data.queue[data.queue.length - 1].title}\` has been offered to the queue.`);
    }

    let track = ((data.repeat && data.currentTrack) ? data.currentTrack : data.queue.shift());
    data.currentTrack = track;

    if (!track) {
        musicChannel.send('There are no more songs in the queue, leaving voice channel...').then(() => {
            voiceChannel.leave();
        });
        return;
    }

    let stream = ytdl(track.videoId, { filter: 'audioonly' });

    let dispatcher = connection.playStream(stream, {
        volume: data.volume / 5
    });


    let { title, author, duration, suggestedBy } = track;
    musicChannel.send(`Now Playing: ${title} suggested by ${suggestedBy}\nAuthor: ${author}\nDuration: ${duration}`);

    dispatcher.on('end', (reason) => {
        musicChannel.send(reason ? reason : 'Song has ended, playing next track!').then(() => {
            if (!data.queue.length && !data.repeat) {
                musicChannel.send('Music stopped, queue is empty.');
                voiceChannel.leave();
            } else {
                playTrack(voiceChannel);
            }
        });
    });
}

module.exports = {
    name: 'Music',
    description: '',
    events: {},
    data: data,
    async suggestTrack(voiceChannel, track) {
        data.queue.push(track);
        playTrack(voiceChannel);
    },
    shuffleQueue() {
        data.queue.sort(() => Math.random() - 0.5);
    },
    skipTrack(dispatcher, startIndex) {
        let client = dispatcher.player.voiceConnection.client;
        let musicChannel = client.channels.get(musicChannelId);

        let givenIndex = 1;
        if (startIndex) {
            givenIndex = parseInt(startIndex);
            if (givenIndex < 1) {
                return musicChannel.send('Please choose a number greater than or equal to 1');
            } else if (data.queue.length < givenIndex) {
                return musicChannel.send(`You can only skip between tracks numbers 1 and ${data.queue.length}`);
            }
        }

        if (givenIndex != 1) {
            let list = data.queue.splice(givenIndex - 1, 1);
            let formattedString = list.map(track => `__*${track.title}*__\n*Suggested by:* **${track.suggestedBy}**`)
                .join('\n\n')
            return musicChannel.send(`**Tracks Skipped Queue [${list.length}]:**\n${formattedString}`);
        }

        dispatcher.end('Song Skipped');
    }
}