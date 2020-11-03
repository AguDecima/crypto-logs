var { createLogger, transports, format } = require('winston');

var logger = new createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            level: 'info',
            filename: `${__dirname}/../logs/all-logs.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5
        }),
        new transports.Console({
            level: 'debug',
            handleExceptions: true,
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};