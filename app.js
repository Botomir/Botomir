require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const source = require('rfr');
const helmet = require('helmet');
const mongoose = require('mongoose');

const logger = source('bot/utils/logger');
const router = source('routes');
const Bot = source('bot');

const app = express();

app.use(helmet());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(router);

let port = process.env.PORT;
if (port == null || port === '') {
    port = 8300;
}

const server = app.listen(port, () => {
    Bot.client.login(process.env.DISCORD_TOKEN);
    logger.info(`Server started on port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then((r) => logger.info(`Successfully connected to MongoDB: ${r}`))
    .catch((e) => logger.error(`Error starting up mongo: ${e}`));



process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');

  server.close(() => logger.info('HTTP server closed'));
  Bot.client.destroy();
  mongoose.connection.close().then(() => logger.info('database connection closed'))

});
