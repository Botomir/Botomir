/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');
const source = require('rfr');
const { snowflakeValidator } = source('models/util');

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    channel: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    user: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
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
