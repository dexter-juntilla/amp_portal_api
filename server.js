/**
 * Module dependencies
 */
var initialize  = require('./config/all')
  , nconf       = require('nconf')
  , winston     = require('winston');

nconf.argv()
     .env()
     .add( 'global', { file: __dirname + '/config/environments/' + process.env.NODE_ENV + '.json',  type: 'file' })
     .add( 'user', { file: __dirname + '/config/environments/default.json', type: 'file' });

/**
 * Environment
 */
var env 		= process.env.NODE_ENV || 'development'
  , server_name = nconf.get('SERVER_NAME')
  , port 		= nconf.get('LISTEN_PORT');

winston.remove(winston.transports.Console);
var logger = winston.add(winston.transports.Console, {
    timestamp: true,
    colorize: true
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};

/**
 * Global Variable
 */
global.winston 	= winston;
global.nconf 	= nconf;
global.util 	= require('util');
global.async 	= require('async');
global._ 		= require('underscore');
global.moment 	= require('moment');
global.path 	= require('path');
global.fs 		= require('fs');

/**
 * Boot the application
 */
initialize.boot(__dirname, env, { logger: logger }, function(err, server) {
    server.listen(port, function () {
        winston.info('application starting in %s on http://%s:%d', env, server_name, port)
    });
});
