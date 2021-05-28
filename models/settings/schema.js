/**
 * Defines a mongoose schema for Post objects.
 *
 * @see module:models/post
 */

const mongoose = require('mongoose');
const source = require('rfr');

const moment = require('moment-timezone');

const { snowflakeValidator } = source('models/util');

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

const mentalHealthDefaults = [
    {
        name: 'Mental Health Resources',
        url: 'https://www.ccmhs-ccsms.ca/mental-health-resources-1',
    },
    {
        name: 'Mental Health Services',
        url: 'https://switchandclick.com/2020/01/23/guide-to-mechanical-keyboard-cases/',
    },
    {
        name: 'Information on mental illnesses, disorders and diseases',
        url: 'https://www.canada.ca/en/public-health/topics/mental-illness.html',
    },
    {
        name: 'About suicide, prevention, risk factors, how to get help when you or someone you know is in need',
        url: 'https://www.canada.ca/en/public-health/services/suicide-prevention.html',
    },
    {
        name: 'Information on mental health and ways to improve it at work and in your daily life',
        url: 'https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html',
    },
];

const linkMappingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.Schema({
    guild: {
        type: String,
        index: true,
        unique: true,
        required: true,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    role_watch_message: {
        type: String,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    welcome_channel: {
        type: String,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    music_channel: {
        type: String,
        maxLength: 20,
        validate: snowflakeValidator,
    },
    command_prefix: {
        type: String,
        minLength: 1,
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
        enum: ['C', 'F'],
        default: 'C',
    },
    weather_location: {
        type: String,
        required: true,
        default: 'Toronto, ON',
    },
    timezone: {
        type: String,
        required: true,
        default: 'America/Toronto',
        validate: (val) => moment.tz.zone(val) !== null,
    },
    bot_admin_role: {
        type: String,
        required: true,
        default: 'botomir-admin',
    },
    meme_subreddits: {
        type: [String],
        default: memeSubreddits,
    },
    cute_subreddits: {
        type: [String],
        default: cuteSubreddits,
    },
    disabled_commands: {
        type: [String],
    },
    mental_health: {
        type: [linkMappingSchema],
        default: mentalHealthDefaults,
    },
    unassignable_roles: {
        type: [String],
    },
});
