var fs 					= require('fs')
  , controllers_path 	= process.cwd() + '/app/controllers';

module.exports = function(done) {
	var _this 			= this
	  , controllers 	= {};
	
	if(!fs.existsSync(controllers_path))
		return done();

	fs.readdirSync(controllers_path).forEach(function (file) {
	    if (file && file.indexOf('.js') != -1) 
	        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	});

	this.controllers = controllers;
	return done();
}
