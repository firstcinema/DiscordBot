const User = require('../models/User');
const LevelsUtil = require('../utils/LevelsUtils');

const ONE_MINUTE = 60 * 1000;

module.exports = {
    name: 'Levels',
    description: '',
    events: {
        async onMessage(message) {
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

            let exp = user.levels.experience + inc;

            let level = LevelsUtil.getLevel(user.levels.experience);

            let newLevel = LevelsUtil.getLevel(exp);

            User.updateOne({ discordId: author.id }, {
                levels: {
                    experience: exp,
                    lastReceived: Date.now()
                }
            }).exec((error) => {
                // To be replaced with a webhook message
                if (error) console.error(error);
                if (level !== newLevel) {
                    message.reply(' has leveled up');
                }
            });
        }
    }
}