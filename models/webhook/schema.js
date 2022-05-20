/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

const { v4: uuidv4 } = require('uuid');
const source = require('rfr');

const { snowflakeValidator } = source('models/util');

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    id: {
        type: String,
        required: true,
        default: () => uuidv4().replace(/-/g, ''),
    },
    channel: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    created_by: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    message_content: {
        type: String,
        required: true,
    },
    hook_provider: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        enum: ['GET', 'POST'],
        default: 'POST',
    },
    secret: {
        type: String,
        required: true,
        default: () => uuidv4().replace(/-/g, '').toUpperCase(),
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
