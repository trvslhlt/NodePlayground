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
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    rollbar = require('rollbar'),
    DummyHandler = require('./routes/dummyHandler'),
    ErrorTemplate = require('./routes/viewTemplates/externalError').ErrorTemplate

function start(f) {
    //TODO: setup the DB connection
    return internalStart(f)
}

function internalStart(f) {
    var port = process.env.PORT || 5000,
        app = express()


    app.use(bodyParser.json())
    app.use(expressValidator())


    var onRequest = (handler) => {
        return (req, res, next) => {
            handler(req, (error, value) => {
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

    app.get('/', onRequest(DummyHandler.ambiguousAction))
    app.get('/triggerUncaughtException', onRequest(DummyHandler.triggerUncaughtException))
    app.get('/triggerCaughtException', onRequest(DummyHandler.triggerCaughtException))
    app.get('/helloWorldError', onRequest(DummyHandler.helloWorldError))
    app.get('/letTest', onRequest(DummyHandler.letTest))

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

    var options = {
        level: "info",
        exitOnCaughtExceptions: true
    }
    rollbar.handleUncaughtExceptions(nconf.get('ROLLBAR_ACCESS_TOKEN'), options);
        app.use(rollbar.errorHandler(nconf.get('ROLLBAR_ACCESS_TOKEN')))





    app.use((err, req, res, next) => {
        var statusCode = 500;
        if (req.validationErrors()) {
            log.error(JSON.stringify(req.validationErrors()));
            statusCode = 400;
        } else if (err.statusCode) {
            statusCode = err.statusCode;
        }
        res.status(statusCode).json(new ErrorTemplate(err));
    });









    var server = http.createServer(app);
    if (f) {
        f(server);
    } else {
        server.listen(port);
        log.info("Listening on port: " + port);
    }

    return app
}

exports.start = start