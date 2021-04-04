const { createLogger, format, transports } = require('winston');

// logger format for stderr
const myFormat = format.printf(({ level, message, timestamp, metadata }) => `${timestamp} ${metadata.location} [${level}]: ${message}`);

const logger = createLogger({

    transports: [
        new transports.Console({
            level: process.env.MODE === 'production' ? 'info' : 'silly',
            format: format.combine(
                format.colorize({
                    all: true,
                }),
                format.metadata(),
                format.timestamp(),
                myFormat,
            ),
            silent: process.env.NODE_ENV === 'test',
        }),
    ],
});

function shortPath(file) {
    file.replace('\\', '/');
    const parts = file.split('/');
    const fileName = parts.pop();
    return parts.reduce((newPath, part) => `${newPath}${part[0]}/`) + fileName;
}

function parseStackFrame(err, frameOffset) {
    const frame = err.stack.split('\n')[frameOffset];
    let file;
    let line;
    let func;

    if (frame.indexOf('(') > -1) {
        // if error raised from a function
        [,,,,, func] = frame.split(' ');
        func = func.includes('anonymous') ? '??' : func;
        [file, line] = frame.split('(')[1].split(':');
    } else {
        // if error not raised from a function
        func = '??';
        [file, line] = frame.split(' ')[5].split(':');
    }
    return `${shortPath(file)}:${line}#${func}`;
}

// log wrapper function; prepends date, file, and line number
function log(level, message, ...rest) {
    // parse the stacktrace:
    // note: this function is always called by one of the wrappers (info, debug, error, warn),
    // so the stack indexing accounts for the frame created by those wrappers
    const e = new Error();
    const location = parseStackFrame(e, 3);
    let msg = null;

    if (message instanceof Error) {
        msg = `${message.name}: ${message.message}\n${message.stack}`;
    } else if (typeof message === 'string') {
        msg = message;
    } else {
        // print indented JSON string if message is not Error or string
        msg = JSON.stringify(message, null, 2);
    }

    if (rest.length > 0) {
        msg = rest.reduce((acc, arg) => {
            const str = typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2);
            return `${acc} ${str}`;
        }, msg);
    }

    // perform the log action
    logger.log({
        level,
        message: msg,
        location,
    });
}

// high priority leveled log
function error(err, ...rest) {
    log('error', err, ...rest);
}
// medium priority leveled log
function warn(msg, ...rest) {
    log('warn', msg, ...rest);
}
// low priority leveled log
function info(msg, ...rest) {
    log('info', msg, ...rest);
}
// just for debugging
function debug(msg, ...rest) {
    log('debug', msg, ...rest);
}

// just for debugging
function http(msg, ...rest) {
    log('http', msg, ...rest);
}
// just for debugging
function silly(msg, ...rest) {
    log('silly', msg, ...rest);
}
// just for debugging
function verbose(msg, ...rest) {
    log('verbose', msg, ...rest);
}

// export the logging functions
module.exports = {
    /**
     * debug() is to be used to log debugging information <b>only</b>.
     * If the server is running in "production" mode, then statements logged by
     * this function are <em>not saved</em>.
     * If the server is running "development" mode, then statements are logged
     * to the console and to <em>LOGDIR/debug.log</em>
     * @function
     * @param {string} msg - the log message
     */
    debug,
    /**
     * error() is to be used to log error information <b>only</b>.
     * All errors are saved to <em>LOGDIR/error.log</em>
     * @function
     * @param {Error|string} err - the error to log
     */
    error,
    /**
     * info() is to be used to log miscellaneous information, like events or
     * other interactions and actions on the server.
     * All info messages are saved to <em>LOGDIR/combined.log</em>
     * @function
     * @param {string} msg - the log message
     */
    info,
    /**
     * warn() is to be used to log warnings or non-critical errors <b>only</b>.
     * All errors are saved to <em>LOGDIR/error.log</em>
     * @function
     * @param {Error|string} err - the error to log
     */
    warn,

    /**
     * http() is to be used to log http information <b>only</b>.
     * If the server is running in "production" mode, then statements logged by
     * this function are <em>not saved</em>.
     * If the server is running "development" mode, then statements are logged
     * to the console.
     * @function
     * @param {string} msg - the log message
     */
    http,

    /**
     * silly() is to be used to log silly information <b>only</b>.
     * If the server is running in "production" mode, then statements logged by
     * this function are <em>not saved</em>.
     * If the server is running "development" mode, then statements are logged
     * to the console.
     * @function
     * @param {string} msg - the log message
     */
    silly,

    /**
     * verbose() is to be used to log verbose information <b>only</b>.
     * If the server is running in "production" mode, then statements logged by
     * this function are <em>not saved</em>.
     * If the server is running "development" mode, then statements are logged
     * to the console.
     * @function
     * @param {string} msg - the log message
     */
    verbose,

};
