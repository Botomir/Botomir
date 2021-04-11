/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    command: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    event: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
});
