/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema');

const WebhookModel = mongoose.model('webhook', schema);

class Webhook {
    constructor() {
        this._model = new WebhookModel();
    }

    get _mongoId() {
        return this._model._id;
    }

    get hookID() {
        return this._model.id;
    }

    get guildID() {
        return this._model.guild;
    }

    get channelID() {
        return this._model.channel;
    }

    get createdBy() {
        return this._model.created_by;
    }

    get message() {
        return this._model.message_content;
    }

    get provider() {
        return this._model.hook_provider;
    }

    get method() {
        return this._model.method;
    }

    get secret() {
        return this._model.secret;
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
            this._model.message_content = messsage;
        }
        return this;
    }

    setCreatedBy(author) {
        if (typeof author === 'string') {
            this._model.created_by = author;
        }
        return this;
    }

    setMethod(method) {
        if (typeof method === 'string') {
            this._model.method = method;
        }
        return this;
    }

    setProvider(provider) {
        if (typeof provider === 'string') {
            this._model.hook_provider = provider;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static getHook(hookID, method) {
        return WebhookModel
            .findOne({
                id: hookID,
                method,
            })
            .then((result) => {
                if (!result) return null;

                const s = new Webhook();
                s._model = result;
                return s;
            });
    }

    static getServerHooks(serverID) {
        return WebhookModel
            .find({
                guild: serverID,
            })
            .then((results) => results.map((r) => {
                const s = new Webhook();
                s._model = r;
                return s;
            }));
    }
}

module.exports = {
    Webhook,
};
