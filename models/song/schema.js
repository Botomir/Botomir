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
    messsage: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    trackURI: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

});
