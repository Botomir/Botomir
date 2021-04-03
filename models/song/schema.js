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
    messsage: {
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
    trackURI: {
        type: String,
        required: true,
        maxLength: 36,
        minLength: 36,
        validate: (uri) => /^spotify:track:[0-9a-zA-Z]{22}$/.test(uri),
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

});
