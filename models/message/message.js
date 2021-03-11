/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const MessageModel = mongoose.model('messages', schema);

class Message {
    constructor() {
        this._model = new MessageModel();
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
        return this._model.id;
    }

    get authorID() {
        return this._model.author;
    }

    get content() {
        return this._model.content;
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

    setChannel(channel) {
        if (typeof channel === 'string') {
            this._model.channel = channel;
        }
        return this;
    }

    setMessage(messsage) {
        if (typeof messsage === 'string') {
            this._model.id = messsage;
        }
        return this;
    }

    setAuthor(author) {
        if (typeof author === 'string') {
            this._model.author = author;
        }
        return this;
    }

    setContent(content) {
        if (typeof content === 'string') {
            this._model.content = content;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static count() {
        return MessageModel
            .count()
            .then((count) => ({
                database: Message.name,
                count,
            }));
    }
}

module.exports = {
    Message,
};
