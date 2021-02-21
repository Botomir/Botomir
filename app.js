// app.js
// ======

require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const source = require('rfr');
const helmet = require('helmet');
const mongoose = require('mongoose');

const Bot = source('lib/bot');
const {getSpotifyAuthToken} = source('lib/spotify/spotifyApi');
const logger = source('lib/utils/logger');

const app = express();

app.use(helmet());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

app.use(express.static('static'));

// home page so you can see that this is running
app.get('/', (req, res) => {
    res.render('home', {
        clientID: Bot.client.user.id,
    });
});

app.get('/documentation', (req, res) => {
    res.render('docs');
});

// So Kaffeine can ping the application
app.get('/status', (req, res) => {
    logger.info('status ping');
    res.status(204).end(); // no content but status okay
});

app.get('/authorize', (req, res) => {
    const userid = req.query.state;
    const {code} = req.query;
    let error = req.query.error || 'Missing the userid and the authentication code';

    if (userid && code) {
        getSpotifyAuthToken(userid, code);
        error = null;
    }

    return res.render('authenticate', {
        error,
    });
});

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
