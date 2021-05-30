/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const RoleModel = mongoose.model('roleMappings', schema);

class Role {
    constructor() {
        this._model = new RoleModel();
    }

    get _mongoId() {
        return this._model._id;
    }

    get guildID() {
        return this._model.guild;
    }

    get channelID() {
        return this._model.channel;
    }

    get messageID() {
        return this._model.message;
    }

    get emoji() {
        return this._model.emoji_name;
    }

    get roleID() {
        return this._model.role;
    }

    get roleName() {
        return this._model.role_name;
    }

    setGuild(guild) {
        if (typeof guild === 'string') {
            this._model.guild = guild;
        }
        return this;
    }

    setChannel(channel) {
        if (typeof channel === 'string') {
            this._model.channel = channel;
        }
        return this;
    }

    setMessage(message) {
        if (typeof message === 'string') {
            this._model.message = message;
        }
        return this;
    }

    setEmoji(emoji) {
        if (typeof emoji === 'string') {
            this._model.emoji_name = emoji;
        }
        return this;
    }

    setRoleID(role) {
        if (typeof role === 'string') {
            this._model.role = role;
        }
        return this;
    }

    setRole(role) {
        if (typeof role === 'string') {
            this._model.role_name = role;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static findRole(serverID, channelID, messageID, emoji) {
        return RoleModel.findOne({
            guild: serverID,
            channel: channelID,
            message: messageID,
            emoji_name: emoji,
        })
            .then((res) => {
                if (res === null) return null;
                const s = new Role();
                s._model = res;
                return s;
            });
    }

    static isWatchMessage(serverID, channelID, messageID) {
        return RoleModel.findOne({
            guild: serverID,
            channel: channelID,
            message: messageID,
        })
            .then((res) => res !== null);
    }

    static removeWatchedMessage(serverID, channelID, messageID) {
        return RoleModel.deleteMany({
            guild: serverID,
            channel: channelID,
            message: messageID,
        });
    }

    static count() {
        return RoleModel
            .count()
            .then((count) => ({
                database: Role.name,
                count,
            }));
    }
}

module.exports = {
    Role,
};
