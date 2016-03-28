var glob = require('glob');

module.exports = function(done) {
	var self = this;
	glob("app/routes/**/*.js" , function (er, files) {
		for(i in files)
		{
			var filepath = '../../' + files[i];
			require(filepath)(self);
		}
		return done();
	})
}