/*
 * server.js
 * Server, responsible for listening for requests and delegating to the appropriate listeners.
 */

require('../config/nconfConfig');


var express = require('express'),
    url = require('url'),
    http = require('http'),
    nconf = require('nconf'),
    log = require('winston'),
    expressWinston = require('express-winston'),
    DummyHandler = require('./routes/DummyHandler')

function start(f) {
    //setup the DB connection
    internalStart(f)
}

function internalStart(f) {

    var onRequest = function(handler) {
        return function (req, res, next) {
            handler(req, function (error, value) {
                if (error) {
                    next(error)
                } else if (value) {
                    res.send(value)
                } else {
                    res.statusCode(204).end()
                }
            })
        }
    }

    var port = process.env.PORT || 5000,
        app = express()

    if (nconf.get('log:levels:info')) {
        app.use(expressWinston.logger({
            transports: [
                new log.transports.Console({
                    json: true,
                    colorize: true
                })
            ]
        }))
    }

    app.get('/ping', onRequest(function(req, f) {
        return f(null);
    }))

    app.get('/rollbarTest', onRequest(DummyHandler.ambiguousAction))

    var server = http.createServer(app);
    if (f) {
        f(server);
    }
    else {
        server.listen(port);
        log.info("Listening on port: " + port);
    }
}

exports.start = start