const source = require('rfr');

const { EmbedBuilder } = require('discord.js');

const logger = source('bot/utils/logger');

const { sendMessage } = source('bot/utils/util');
const { getRandomComic, getComic } = source('bot/utils/xkcd');

function createEmbed(comic) {
    return new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`#${comic.num} - ${comic.safe_title}`)
        .setImage(comic.img)
        .setTimestamp(new Date(comic.year, comic.month, comic.day))
        .setFooter({
            text: `For any questions contact ${process.env.BOT_MODS || '@Colonel Pineapple#3164'}`,
        });
}

function xkcdCommand(message, args) {
    const comicPromise = args.length === 0 ? getRandomComic() : getComic(args[0]);

    return comicPromise
        .then((comic) => sendMessage(message.channel, {
            embeds: [createEmbed(comic)],
        }))
        .catch(() => {
            logger.error(`failed to get XKCD comic for ${args[0]}`);
            sendMessage(message.channel, `failed to get XKCD comic for ${args[0]}`);
        });
}

module.exports = {
    args: false,
    name: 'xkcd',
    botAdmin: false,
    description: 'Gets a random XKCD comic strip, or optionally a specific one',
    usage: '[number]',
    aliases: [],
    execute: xkcdCommand,
    docs: `#### XKCD
- Command: \`xkcd\`
- Returns: image of XKCD comic
- Example usage:
\`\`\`
User
> !xkcd

Botomir
> embedded message with image
\`\`\`

\`\`\`
User
> !xkcd 5

Botomir
> embedded message with image
\`\`\`
`,
};
