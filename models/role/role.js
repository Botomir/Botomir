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
                if (res === null) return null;
                const s = new Role();
                s._model = res;
                return s;
            });
    }

    static removeServerRoles(serverID) {
        return RoleModel.deleteMany({
            guild: serverID,
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
