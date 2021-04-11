/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const { rand: Random } = require('true-random');

const generator = new Random();

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        default: () => uuidv4().replaceAll('-', ''),
    },
    channel: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    message_content: {
        type: String,
        required: true,
    },
    hook_provider: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
        default: () => generator.integers(1, 16, 24).map((r) => Math.trunc(r).toString(16).toUpperCase()).join(''),
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

});
