require('dotenv').config();
const source = require('rfr');
const express = require('express');

const logger = source('bot/utils/logger');
const HomeController = require('./controllers/homeController');
const DocsController = require('./controllers/docsController');
const StatisticsController = require('./controllers/statisticsController');
const SpotifyController = require('./controllers/spotifyController');
const NotFoundController = require('./controllers/notFoundController');
const AboutController = require('./controllers/aboutController');

const router = express();

router.use((req, res, next) => {
    logger.http(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
});

router.get('/', HomeController.get);
router.get('/documentation', DocsController.get);
router.get('/statistics', StatisticsController.get);
router.get('/authorize', SpotifyController.get);
router.get('/about', AboutController.get);
router.use(NotFoundController.get);

module.exports = router;
