const User = require('../models/User');

function handleMembers(members) {
    members.forEach(member => {
        if (!member.user.bot) {
            handleUser(member.user);
        }
    });
}

async function handleUser(member) {
    let user = await User.findOne({ discordId: member.id });
    if (user) return;
    let newUser = new User({
        discordId: member.id
    });
    newUser.save();
}

module.exports = {
    name: "Core",
    description: "FirstCinema's Core Module",
    events: {
        async onReady(client) {
            client.guilds.forEach(guild => {
                handleMembers(guild.members);
            });
        },
        async onJoin(member) {
            handleUser(member.user);
        }
    }
}