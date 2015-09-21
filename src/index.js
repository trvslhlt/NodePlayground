/*
    index.js
    The application starting point. index.js starts the webserver
    and defines which endpoints are handled by which request handlers.
 */

var server = require('./server');
console.log('starting API');
server.start();


//var express = require('express');
//var router = express.Router();
//
///* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
//});
//
//module.exports = router;
//
//
///*
// index.js
// The application starting point, index.js starts the webserver and defines
// which endpoints are handled by which request handlers.
// Generic server components
// */
//var server = require("./server");
//
//console.log("Starting VRKL-API");
//server.start();