/*
    this is the application starting point
 */
var server = require('./src/server');
console.log('starting API');
var app = server.start();
