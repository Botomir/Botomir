/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');
const schema = require('./schema.js');

const SettingModels = mongoose.model('serverSettings', schema);

class Settings {
    constructor() {
        this._model = new SettingModels();
    }

    get _mongoId() {
        return this._model._id;
    }

    get guildID() {
        return this._model.guild;
    }

    get roleMessage() {
        return this._model.role_watch_message;
    }

    get musicChannelID() {
        return this._model.music_channel;
    }

    get commandPrefix() {
        return this._model.command_prefix;
    }

    get playlistName() {
        return this._model.playlist_name;
    }

    get playlistDescription() {
        return this._model.playlist_description;
    }

    get tempUnit() {
        return this._model.tempature_unit;
    }

    get weatherLocation() {
        return this._model.weather_location;
    }

    get memeSubs() {
        return this._model.meme_subreddits;
    }

    get cuteSubs() {
        return this._model.cute_subreddits;
    }

    setGuild(guild) {
        if (typeof guild === 'string') {
            this._model.guild = guild;
        }
        return this;
    }

    setRoleMessage(messageID) {
        if (typeof messageID === 'string') {
            this._model.role_watch_message = messageID;
        }
        return this;
    }

    setMusicChannel(channel) {
        if (typeof channel === 'string') {
            this._model.music_channel = channel;
        }
        return this;
    }

    setCommandPrefix(prefix) {
        if (typeof prefix === 'string') {
            this._model.command_prefix = prefix;
        }
        return this;
    }

    setPlaylistName(name) {
        if (typeof name === 'string') {
            this._model.playlist_name = name;
        }
        return this;
    }

    setPlaylistDescription(description) {
        if (typeof description === 'string') {
            this._model.playlist_description = description;
        }
        return this;
    }

    setTempUnit(unit) {
        if (typeof unit === 'string') {
            this._model.tempature_unit = unit;
        }
        return this;
    }

    setWeatherLocation(location) {
        if (typeof location === 'string') {
            this._model.weather_location = location;
        }
        return this;
    }

    addMemeSub(sub) {
        if (typeof sub === 'string') {
            this._model.meme_subreddits.push(sub);
        }
        return this;
    }

    addCuteSub(sub) {
        if (typeof sub === 'string') {
            this._model.cute_subreddits.push(sub);
        }
        return this;
    }

    save() {
        return this._model.save().then(() => this);
    }

    static getServerSettings(serverID) {
        return SettingModels.findOne({
            guild: serverID,
        })
            .then((res) => {
                if (res === null) return new Settings().setGuild(serverID);
                const s = new Settings();
                s._model = res;
                return s;
            });
    }

    static getAll() {
        return SettingModels.find({
        })
            .then((res) => res.map((r) => {
                const s = new Settings();
                s._model = r;
                return s;
            }));
    }
}

module.exports = {
    Settings,
};
