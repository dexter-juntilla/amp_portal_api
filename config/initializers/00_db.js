var r = require('rethinkdb');

module.exports = function(done) {
	var _this = this;

	async.waterfall([
		// open the rethink connection
		function(callback) {
			var credential = {
				host: 	nconf.get('DB_SERVER'), 
				port: 	nconf.get('DB_PORT'), 
				db: 	nconf.get('DB_NAME')
			}

			r.connect(credential, function(err, connection) {
				if(err)
				{
					winston.error('Initializers DB [connect] [Error: %s]', util.inspect(err))
					callback(err, null);
				}
				else
				{
					winston.info('Initializers DB [Connection to RethinkDB Opened]');
					callback(null, connection);
				}
			})
		},
		// check if the database already exists 
		function(connection, callback) {
		    r.dbList().run(connection, function(err, result) {
		    	if(err)
		    	{
					winston.error('Initializers DB [dbList] [Error: %s]', util.inspect(err))
					callback(err, null);		    		
		    	}
		    	else
		    	{
					if(result && result.toString().indexOf(nconf.get('DB_NAME')) > -1)
					{
						winston.info('Initializers DB [Database already exists]'); 
						callback(null, connection);
					}
					else
					{
						winston.info('Initializers DB [Database not exists]'); 
						r.dbCreate(nconf.get('DB_NAME')).run(connection, function(err, result){
					    	if(err)
					    	{
								winston.error('Initializers DB [dbCreate] [Error: %s]', util.inspect(err))
								callback(err, null);		    		
					    	}
					    	else
					    		callback(null, connection);						 
						});
					}
		    	}
		    });
		},
		// create table if not exist in the database
		function(connection, callback) {
			async.parallel({
				// creating table user
				tbl_User: function(callback) {
					r.tableCreate('tbl_User').run(connection, function(err, result){
						if(!err)
							winston.info('Initializers DB [tbl_User created]');
						callback(null, true);
					});
				}
			}, function(err, result) {
				if(err)
				{
					winston.error('Initializers DB [parallel] [Error: %s]', util.inspect(err));
					callback(err, null);
				}
				else
				  callback(null, connection);
			});
		}
	], function(err, result) {
		if(err)
		{
			winston.error('Initializers DB [Error: %s]', util.inspect(err));
			throw err;
		}
		else
		{
			winston.info('Initializers DB [Successfully]');	
			_this.db = result;
			return done();
		}
	})
}