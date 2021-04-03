/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');
const source = require('rfr');
const { snowflakeValidator } = source('models/util');

module.exports = new mongoose.Schema({
    guild:  {
        type: String,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    message: String,
    botMode: String,
});
