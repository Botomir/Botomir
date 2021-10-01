const source = require('rfr');

const { redditPost } = source('bot/utils/reddit');

function redditCommand(message, args) {
    redditPost(message, args[0]);
}

module.exports = {
    args: 1,
    name: 'image',
    botAdmin: false,
    description: 'pulls post from specified subreddit',
    usage: 'subreddit',
    aliases: [],
    execute: redditCommand,
    docs: `#### Image
- Command: \`image\`
- Args:
    - required, \`<subreddit>\`
- Returns: an embedded link to a post from the specified subreddit
- Limitations:
  - Cannot send links to text, video, or audio posts. Only pictures or gifs
- Example usage:
\`\`\`
User
> !image funny

Botomir
> <embedded message with reddit post>
\`\`\``,
};
