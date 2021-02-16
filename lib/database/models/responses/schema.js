/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    guild: String,
    message: String,
    botMode: String,
});
