/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const ResponseModel = mongoose.model('botResponses', schema);

class Responses {
    constructor() {
        this._model = new ResponseModel();
    }

    get _mongoId() {
        return this._model._id;
    }

    get guildID() {
        return this._model.guild;
    }

    get message() {
        return this._model.message;
    }

    get botMode() {
        return this._model.botMode;
    }

    setGuild(guild) {
        if (typeof guild === 'string') {
            this._model.guild = guild;
        }
        return this;
    }

    setMessage(text) {
        if (typeof text === 'string') {
            this._model.message = text;
        }
        return this;
    }

    setBotMode(mode) {
        if (typeof mode === 'string') {
            this._model.botMode = mode;
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static findForMode(serverID, mode) {
        return ResponseModel.find({
            guild: serverID,
            botMode: mode,
        })
            .then((results) => results.map((r) => {
                const response = new Responses();
                response._model = r;
                return response;
            }));
    }
}

module.exports = {
    Responses,
};
