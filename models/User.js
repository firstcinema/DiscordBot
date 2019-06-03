const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    discordId: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    levels: {
        lastReceived: {
            type: Date,
            default: Date.now
        },
        experience: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model('User', UserSchema);