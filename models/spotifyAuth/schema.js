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
        maxLength: 20,
        validate: snowflakeValidator,
    },
    access_token: String,
    refresh_token: String,
    expires_at: Date,
});
