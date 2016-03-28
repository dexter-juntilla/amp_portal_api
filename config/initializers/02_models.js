var glob = require('glob')
  , base = require('../../app/models/base');

module.exports = function(done) {
	var _this = this;
	glob("app/models/**/*.js" , function (err, files) {
		for(i in files)
		{
			var filepath = '../../' + files[i];
			var patt = /base.js/;
			var model = require(filepath)(_this.db);
			var temp = filepath.match(/[^/]*\/[^/]*.js/)[0];
			var filename = temp.split('/')[1];
			var model_name = filename.substring(0, filename.length -3);
			if(!patt.test(files[i]))
				base.addModel(model_name, model)
		}
		return done();
	})
}