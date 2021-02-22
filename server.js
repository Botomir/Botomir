require('dotenv').config();
const source = require('rfr');

const app = source('app');
const Bot = source('lib/bot');
const logger = source('lib/utils/logger');

let port = process.env.PORT;
if (port == null || port === '') {
    port = 8300;
}

app.listen(port, () => {
    Bot.client.login(process.env.DISCORD_TOKEN);
    logger.info(`Server started on port ${port}`);
});
