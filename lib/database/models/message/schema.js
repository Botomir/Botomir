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
    id: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
