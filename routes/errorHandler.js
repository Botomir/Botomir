const source = require('rfr');

const logger = source('bot/utils/logger');

function logErrors (err, req, res, next) {
  logger.error(err);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
    switch (err.status || 500) {
        case 403:
            return res.status(403).render('403');
        case 404:
            return res.status(404).render('404');
        default:
            return next(err);
    }
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    return res.status(500).render('500', {
        errorMessage: err.message,
    });
}

function catchNotFound(req, res, next) {
    return next({status: 404, message: 'Page not found'});
}

module.exports = {
    catchNotFound,
    logErrors,
    clientErrorHandler,
    errorHandler,
};
