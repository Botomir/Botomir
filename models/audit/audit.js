/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const AuditModel = mongoose.model('audit_log', schema);

const STATUS_UNKOWN = 0;
const STATUS_SUCCESS = 1;
const STATUS_FAILED = 2;

class Audit {
    constructor() {
        this._model = new AuditModel();
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

    get userID() {
        return this._model.user;
    }

    get event() {
        return this._model.event;
    }

    get details() {
        return this._model.details;
    }

    get timestamp() {
        return this._model.timestamp;
    }

    get commandInvoked() {
        return this._model.command;
    }

    get status() {
        return this._model.status;
    }

    get statusLabel() {
        switch (this._model.status) {
        case STATUS_FAILED:
            return 'FAILED';
        case STATUS_SUCCESS:
            return 'SUCCESS';
        case STATUS_UNKOWN:
        default:
            return 'UNKOWN';
        }
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

    setUser(user) {
        if (typeof user === 'string') {
            this._model.user = user;
        }
        return this;
    }

    setEvent(event) {
        if (typeof event === 'string') {
            this._model.event = event;
        }
        return this;
    }

    setDetails(details) {
        if (typeof details === 'string') {
            this._model.details = details;
        }
        return this;
    }

    setSuccess() {
        this._model.status = STATUS_SUCCESS;
        return this;
    }

    setFailed() {
        this._model.status = STATUS_FAILED;
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static getServerLog(serverID) {
        return AuditModel.where({
            guild: serverID,
        })
            .sort({
                timestamp: -1,
            })
            .then((results) => results.map((r) => {
                const audit = new Audit();
                audit._model = r;
                return audit;
            }));
    }
}

const EventTypes = {
    MESSAGE_DELETED: 'MESSAGE_DELETED',
    BATCH_MESSAGES_DELETED: 'BATCH_MESSAGES_DELETED',
    USER_KICKED: 'USER_KICKED',
    USER_BANNED: 'USER_BANNED',
    AUDIT_CHECKED: 'AUDIT_CHECKED',
    SERVER_NAME_CHANGED: 'SERVER_NAME_CHANGED',
};

module.exports = {
    Audit,
    Events: Object.freeze(EventTypes),
};
