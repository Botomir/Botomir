const source = require('rfr');

const { redditPost } = source('lib/utils/reddit');

function redditCommand(message, args) {
    redditPost(message, args[0]);
}

module.exports = {
    args: 1,
    name: 'reddit',
    botAdmin: false,
    description: 'pulls post from specified subreddit',
    usage: 'subreddit',
    aliases: [],
    execute: redditCommand,
    docs: '#### Reddit\n\n'
        + '- Command: `reddit`\n'
        + '- Args:\n'
        + '    - required, `<subreddit>`\n'
        + '- Returns: an embedded link to a post from the specified subreddit\n'
        + '- Limitations:\n'
        + '  - Cannot send links to text, video, or audio posts. Only pictures or gifs\n'
        + '- Example usage:\n'
        + '  - `!reddit funny`\n'
        + '```\n'
        + 'User\n'
        + '> !reddit funny\n\n'
        + 'Botomir\n'
        + '> <embedded message with reddit post>\n'
        + '```',
};
