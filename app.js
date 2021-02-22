require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const source = require('rfr');
const helmet = require('helmet');
const mongoose = require('mongoose');

const Bot = source('lib/bot');
const logger = source('lib/utils/logger');

const HomeController = source("controllers/homeController");
const DocsController = source("controllers/docsController");
const SpotifyController = source("controllers/spotifyController");
const NotFoundController = source("controllers/notFoundController");

const app = express();

app.use(helmet());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

app.use(express.static('static'));

app.get('/', (req, res) => {
    HomeController.get(req, res, Bot);
});
app.get('/documentation', DocsController.get);
app.get('/authorize', SpotifyController.get);
app.use(NotFoundController.get);

let port = process.env.PORT;
if (port == null || port === '') {
    port = 8300;
}

app.listen(port, () => {
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
