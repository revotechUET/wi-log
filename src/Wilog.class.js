// class Wilog {
    
// }

'use strict';
var logger = require('winston');
require('winston-daily-rotate-file');
var fs = require('fs');
var mkdirp = require("mkdirp");
var moment = require('moment-timezone');
let filePath = "D:/code/logs"
mkdirp('logs', function (err) {
    if (err) console.log(err);
});


class WiLog {
    constructor(rootFolder) {
        this.logger = new (logger.Logger)({
            transports: [
                getRotateDailyLog('error', rootFolder),
                getRotateDailyLog('info', rootFolder),
                getRotateDailyLog('warn', rootFolder)
            ]
        });
    }

    info(obj) {
        this.logger.info(obj);
    }

    error(obj) {
        this.logger.error(obj);
    }

    warn(obj) {
        this.logger.warn(obj);
    }
}

function getRotateDailyLog(logLevel, filePath) {
    return new (logger.transports.DailyRotateFile)({
        filename: filePath + '/' + './' + logLevel + '.log',
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: logLevel,
        name: logLevel + '-logger',
        maxFiles: 15,
        timestamp() {
            return moment().tz('UTC').format('YYYY-MM-DD HH:mm:ss.SSSS');
        },
        formatter(params) {
            // Options object will be passed to the format function.
            // It's general properties are: timestamp, level, message, meta.
            const meta = params.meta !== undefined ? util.inspect(params.meta, {
                depth: null
            }) : '';
            return `[${params.timestamp}] [${params.level}] [${pkg.name}] *** ${params.message} ${meta}`;
        }
    });
}


module.exports = WiLog;
