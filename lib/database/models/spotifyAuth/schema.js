/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    user: String,
    access_token: String,
    refresh_token: String,
    expires_at: Date,
});
