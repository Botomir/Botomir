/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');

// move this later
const memeSubreddits = [
    'dankmemes',
    'memes',
    'HistoryMemes',
    'wholesomememes',
    'onlywholesomememes',
    'prequelmemes',
    'OTmemes',
    'sequelmemes',
    'bikinibottomtwitter',
    '2meirl4meirl',
    'meirl',
    'me_irl',
    'anime_irl',
    'MEOW_IRL',
    'woof_irl',
    'dankchristianmemes',
    'deepfriedmemes',
    'MemeEconomy',
];

// move this later
const cuteSubreddits = [
    'aww',
    'awwducational',
    'animalsbeingderps',
    'animalssmiling',
    'eyebleach',
    'babyelephantgifs',
    'bearcubgifs',
    'babyrhinogifs',
    'delightfullyannoyed',
    'otters',
    'startledcats',
    'floof',
    'rarepuppers',
    'NatureIsFuckingLit',
];

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        index: true,
        unique: true,
    },
    role_watch_message: String,
    music_channel: String,
    command_prefix: {
        type: String,
        maxLength: 1,
        required: true,
        default: '!',
    },
    playlist_name: {
        type: String,
        required: true,
        default: 'Awesome Discord Group Playlist',
    },
    playlist_description: {
        type: String,
        required: true,
        default: 'A playlist that contains all the songs that the discord group posted in the last little while.',
    },
    tempature_unit: {
        type: String,
        uppercase: true,
        maxLength: 1,
        required: true,
        default: 'C',
    },
    weather_location: {
        type: String,
        required: true,
        default: 'Toronto, ON',
    },
    meme_subreddits: {
        type: [String],
        default: memeSubreddits,
    },
    cute_subreddits: {
        type: [String],
        default: cuteSubreddits,
    },
});
