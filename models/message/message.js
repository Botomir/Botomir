/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema');

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

    get edits() {
        return this._model.updates.map((edit) => ({
            content: edit.content, editedAt: edit.editedAt,
        }));
    }

    get deletedAt() {
        return this._model.deletedAt;
    }

    get deleted() {
        return this._model.deletedAt !== undefined;
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
            this._model.id = message;
        }
        return this;
    }

    setAuthor(author) {
        if (typeof author === 'string') {
            this._model.author = author;
        }
        return this;
    }

    setCreatedAt(timestamp) {
        if (typeof timestamp === 'number') {
            this._model.timestamp = timestamp;
        }
        return this;
    }

    setContent(content, timestamp) {
        if (typeof content === 'string') {
            this._model.content = content;
            this._model.updates.push({
                content, editedAt: timestamp,
            });
        }
        return this;
    }

    delete() {
        this._model.deletedAt = Date.now();

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

    static find(guildID, channelID, messageID) {
        return MessageModel
            .findOne({
                guild: guildID, channel: channelID, id: messageID,
            })
            .then((r) => {
                const message = new Message();
                message._model = r;
                return message;
            });
    }
}

module.exports = {
    Message,
};
