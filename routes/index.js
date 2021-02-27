require('dotenv').config();
const source = require('rfr');
const express = require('express');

const logger = source('lib/utils/logger');
const HomeController = require('./controllers/homeController');
const DocsController = require('./controllers/docsController');
const SpotifyController = require('./controllers/spotifyController');
const NotFoundController = require('./controllers/notFoundController');

const router = express();

router.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

router.get('/', HomeController.get);
router.get('/documentation', DocsController.get);
router.get('/authorize', SpotifyController.get);
router.use(NotFoundController.get);

module.exports = router;
