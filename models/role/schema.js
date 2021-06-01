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
    message: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    emoji_name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false, // make this required once the transition happens
        maxLength: 20,
        validate: snowflakeValidator,
    },
    role_name: {
        type: String,
        required: true,
    },
});
