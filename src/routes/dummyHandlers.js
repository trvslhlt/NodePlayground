'use strict'
/*
 This is a playground class. Nothing of value should be left lying around.
 */

var ambiguousAction = (req, f) => {
    console.log("method: " + req.method)
    //req.query.forEach(function(e, i, a) {
    //    console.log("element: " + )
    //})
    console.log("req.query: " + req.query)
    console.log("req.params: " + req.params)
    console.log("req.body: " + req.body)
    var s = {
        thiss: "this",
        'that': true,
        'theOther': ["one", 2, false]
    }
    f(null, s)
}

var triggerUncaughtException = (req, f) => {
    undefinedFunction()
    f(null)
}

var triggerCaughtException = (req,f) => {
    try {
        undefinedFunction()
    } catch (e) {
        f(e)
    }
}

var helloWorldError = (req, f) => {
    f(new Error('Hello World'))
}

var letTest = (req, f) => {
    //console.log('letTest')
    if (req) {
        let blockVariable = 100;
        conssole.log(blockVariable)
        var functionVariable = 200;
    }
    console.log(functionVariable)
    f(null,"letTest")
}

exports.ambiguousAction = ambiguousAction
exports.triggerUncaughtException = triggerUncaughtException
exports.triggerCaughtException = triggerCaughtException
exports.helloWorldError = helloWorldError
exports.letTest = letTest