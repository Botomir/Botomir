/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');
const source = require('rfr');

const { snowflakeValidator } = source('models/util');

module.exports = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true,
    },
});
