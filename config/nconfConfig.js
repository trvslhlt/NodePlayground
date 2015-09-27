/*
    nconfConfig.js
    This file sets up the environment variables with 'nconf'
 */

var nconf = require('nconf'),
    log = require('winston');

// Configure nconf
nconf.argv().env();

var nodeEnvironment = nconf.get("NODE_ENV");
if (!nodeEnvironment) {
    log.warn("NODE_ENV not defined, falling back to development configuration");
    nodeEnvironment = "development";
}
nconf.file({file: 'config/' + nodeEnvironment + '.json'});
log.info("Configured nconf with environment name: " + nodeEnvironment);
