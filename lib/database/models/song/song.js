/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const SongModel = mongoose.model('songs', schema);

class Song {
    constructor() {
        this._model = new SongModel();
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

    get authorID() {
        return this._model.author;
    }

    get trackURI() {
        return this._model.trackURI;
    }

    get timestamp() {
        return this._model.timestamp;
    }

    get messageID() {
        return this._model.messsage;
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

    setMessage(messsage) {
        if (typeof messsage === 'string') {
            this._model.messsage = messsage;
        }
        return this;
    }

    setAuthor(author) {
        if (typeof author === 'string') {
            this._model.author = author;
        }
        return this;
    }

    setTrack(uri) {
        if (typeof uri === 'string') {
            this._model.trackURI = uri;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static findSince(time) {
        return SongModel.where('timestamp').gte(time)
            .then((results) => results.map((r) => {
                const s = new Song();
                s._model = r;
                return s;
            }));
    }
}

module.exports = {
    Song,
};
