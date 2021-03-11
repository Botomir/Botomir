const source = require('rfr');

const { sendMessage } = source('bot/utils/util');

const keebEmbed = {
    color: 0x0099ff,
    title: 'Keyboard Resources',
    description: 'Here are some resources for your keyboard journey',
    fields: [
        {
            name: 'What is a mechanical keyboard?',
            value: 'A mechanical keyboard is a keyboard built with high quality, typically spring activated, key switches. These key switches vary based on the keyboard’s application or user preference.',
        },
        {
            name: 'Cases',
            value: 'https://switchandclick.com/2020/01/23/guide-to-mechanical-keyboard-cases/',
        },
        {
            name: 'Plates',
            value: 'https://keyboard.university/200-courses/plate-materials-sizes',
        },
        {
            name: 'Switches',
            value: 'https://dygma.com/blogs/stories/the-ultimate-guide-to-mechanical-keyboard-switches-for-2019',
        },
        {
            name: 'Keycap Materials',
            value: 'https://keyboardkings.com/comparing-pbt-keycaps-vs-abs-keycaps/',
        },
        {
            name: 'Keyboard Sizes',
            value: 'https://keyboard.university/100-courses/keyboard-sizes-layouts',
        },
        {
            name: 'Group Buys',
            value: 'https://keyboard.university/100-courses/group-buy',
        },
        {
            name: 'Keycaplender',
            value: 'https://keycaplendar.firebaseapp.com/',
        },
        {
            name: 'Vendor',
            value: 'https://kbdfans.com/',
            inline: true,
        },
        {
            name: 'Vendor',
            value: 'https://mechanicalkeyboards.com/',
            inline: true,
        },
        {
            name: 'Vendor',
            value: 'https://www.deskhero.ca/',
            inline: true,
        },
        {
            name: 'Vendor',
            value: 'https://www.ashkeebs.com/',
            inline: true,
        },
    ],
};

function keebCommand(message) {
    sendMessage(message.channel, {
        embed: keebEmbed,
    });
}

module.exports = {
    args: false,
    name: 'keeb',
    botAdmin: false,
    description: 'Gives information about mechanical keyboards',
    usage: '',
    aliases: [],
    execute: keebCommand,
};
