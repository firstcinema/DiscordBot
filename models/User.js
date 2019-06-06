const mongoose = require("mongoose");

var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const UserSchema = mongoose.Schema({
    discordId: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
    economy: {
        lastDaily: {
            type: Date,
            default: yesterday
        },
        balance: {
            type: Number,
            default: 0
        }
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