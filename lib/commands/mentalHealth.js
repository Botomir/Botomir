// mentalHealth.js
// ===============

const source = require('rfr');

const { sendMessage } = source('lib/utils/util');

const mhEmbed = {
    color: 0x0099ff,
    title: 'Mental Health',
    fields: [
        {
            name: 'Mental Health Resources',
            value: 'https://www.ccmhs-ccsms.ca/mental-health-resources-1',
        },
        {
            name: 'Mental Health Services',
            value: 'https://switchandclick.com/2020/01/23/guide-to-mechanical-keyboard-cases/',
        },
        {
            name: 'Information on mental illnesses, disorders and diseases',
            value: 'https://www.canada.ca/en/public-health/topics/mental-illness.html',
        },
        {
            name: 'About suicide, prevention, risk factors, how to get help when you or someone you know is in need',
            value: 'https://www.canada.ca/en/public-health/services/suicide-prevention.html',
        },
        {
            name: 'Information on mental health and ways to improve it at work and in your daily life',
            value: 'https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html',
        },
    ],
};

function mentalHealthCommand(message) {
    sendMessage(message.channel, {
        embed: mhEmbed,
    });
}

exports.mentalHealthCommand = mentalHealthCommand;
