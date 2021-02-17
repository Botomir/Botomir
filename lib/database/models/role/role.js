/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const source = require('rfr');

const schema = require('./schema.js');

const logger = source('lib/utils/logger');

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

    get emoji() {
        return this._model.emoji_name;
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

    setEmoji(emoji) {
        if (typeof emoji === 'string') {
            this._model.emoji_name = emoji;
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

    static findRole(serverID, emoji) {
        return RoleModel.findOne({
            guild: serverID, emoji_name: emoji,
        })
            .then((res) => {
                const s = new Role();
                s._model = res;
                return s;
            });
    }

    static insertRole(serverID, emoji, role) {
        const mapping = new Role()
            .setGuild(serverID)
            .setEmoji(emoji)
            .setRole(role);

        return mapping.save().then((r) => {
            logger.log(`Successfully written the role mapping to database: ${r}`);
            return this;
        });
    }

    static removeServerRoles(serverID) {
        return RoleModel.deleteMany({
            guild: serverID,
        });
    }
}

module.exports = {
    Role,
};
