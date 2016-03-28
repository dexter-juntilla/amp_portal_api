var restify     	= require('restify')
  , fs          	= require('fs')
  , path        	= require('path')
  , morgan      	= require('morgan')
  , authentication	= require('./authentication')
  , existsSync  	= fs.existsSync || path.existsSync;

module.exports = {
    boot: function(dir, env, options, callback) {
        var self = this
          , exts = ['js'];

        if (typeof options == 'function')
        {
            callback = options;
            options = {};
        }

        options = options || {};
        options.initializersDir = options.initializersDir || path.resolve(dir, './config/initializers');

        if (!existsSync(dir))
            return callback(new Error('Application does not exist: ' + dir));

        // Boot the application by configuring the environment, invoking
        // initializers, loading controllers, and drawing routes.
        async.series([
            settings,
            initializers
        ], function(err, results) {
            if (err) 
                return callback(err);

			// expose the api documentation
			self.server.get('/.*/', restify.serveStatic({
				directory: process.cwd() + '/documentation/',
				default: 'index.html'
			}));

            return callback(null, self.server);
        })

        // internal function
        function initializers(done) {
            var dir = options.initializersDir;
            if (!existsSync(dir)) return done(); 

            // NOTE: Sorting is required, due to the fact that no order is guaranteed
            //       by the system for a directory listing.  Sorting allows initializers
            //       to be prefixed with a number, and loaded in a pre-determined order.
            var files = fs.readdirSync(dir).sort();
          
            async.forEachSeries(files, function(file, next) {
                var regex = new RegExp('\\.(' + exts.join('|') + ')$');
                if (regex.test(file)) 
                {
                    var mod = require(path.join(dir, file));
                    if (typeof mod == 'function') 
                    {
                        var arity = mod.length;
                        if (arity == 1) 
                        {
                            // Async initializer.  Exported function will be invoked, with next
                            // being called when the initializer finishes.
                            mod.call(self, next);
                        } 
                        else 
                        {
                            // Sync initializer.  Exported function will be invoked, with next
                            // being called immediately.
                            mod.call(self);
                            next();
                        }
                    } 
                    else 
                    {
                        // Initializer does not export a function.  Requiring the initializer
                        // is sufficient to invoke it, next immediately.
                        next();
                    }
                } 
                else 
                    next();
            }, function(err) {
                return done(err);
            })
        }

        function settings(done) {
            var server = restify.createServer({
                name: 'service boiler plate',
                version: '1.0.0'
            });

            // added headers
            restify.CORS.ALLOW_HEADERS.push('Token');
            restify.CORS.ALLOW_HEADERS.push('Authorization');

            server.use(restify.CORS())      
            server.opts('/\.*/', corsHandler, optionsRoute);
            server.use(restify.fullResponse());
            server.use(restify.acceptParser(server.acceptable));
            server.use(restify.queryParser());
            server.use(restify.bodyParser());
            server.use(restify.authorizationParser());
            server.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: options.logger.stream }));
            
			// do authentication here
			server.use(function(req, res, next) {
				authentication(req, res, next);
			});         

			self.server = server;
            return done();

            // internal function
            function corsHandler(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Token, Authorization');
                res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS,POST');
                res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
                res.setHeader('Access-Control-Max-Age', '1000');

                return next();
            }

            function optionsRoute(req, res, next) {
                res.send(200);
                return next();
            }          
        }        
    }
}