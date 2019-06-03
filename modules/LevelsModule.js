const User = require('../models/User');

const ONE_MINUTE = 60 * 1000;

module.exports = {
    name: 'Levels',
    description: '',
    events: {
        onMessage: async function(message) {
            if (message.author.bot) return;

            let author = message.author;

            let user = await User.findOne({ discordId: author.id });

            if (!user) {
                return;
            }

            let date = user.levels.lastReceived;
            if (((new Date) - date) < ONE_MINUTE) {
                return;
            }

            let inc = Math.floor(Math.random() * 25) + 15;

            console.log(inc);
            User.updateOne({
                discordId: author.id
            }, {
                levels: {
                    experience: user.levels.experience + inc,
                    lastReceived: Date.now()
                }
            }).exec();
        }
    }
}