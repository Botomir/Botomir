/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const StatsModel = mongoose.model('stats', schema);

class Statistics {
    constructor() {
        this._model = new StatsModel();
    }

    get _mongoId() {
        return this._model._id;
    }

    get guildID() {
        return this._model.guild;
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

    setGuild(guild) {
        if (typeof guild === 'string') {
            this._model.guild = guild;
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

    save() {
        return this._model.save().then(() => this);
    }

    static countEvent(serverID, eventName) {
        return StatsModel.where({
            guild: serverID,
        })
            .where({
                event: eventName,
            })
            .count()
            .then((count) => ({
                event: eventName,
                count,
            }));
    }

    static totalEvents(eventName) {
        return StatsModel
            .where({
                event: eventName,
            })
            .count()
            .then((count) => ({
                event: eventName,
                count,
            }));
    }
}

const EventTypes = {
    PLAYLIST_CREATED: 'PLAYLIST_CREATED',
    ROLE_ASSIGNED: 'ROLE_ASSIGNED',
    ROLE_REMOVED: 'ROLE_REMOVED',
    COMMAND_EXECUTED: 'COMMAND_EXECUTED',
    GOOD_BOT: 'GOOD_BOT',
    BAD_BOT: 'BAD_BOT',
    PUPPYS_SHOWN: 'PUPPYS_SHOWN',
    MEMES_SENT: 'MEMES_SENT',
};

module.exports = {
    Statistics,
    EventTypes: Object.freeze(EventTypes),
};
