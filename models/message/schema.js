/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');
const source = require('rfr');

const { snowflakeValidator } = source('models/util');

const updateSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    editedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

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
    id: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    author: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    updates: {
        type: [updateSchema],
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
