var request = require('request'),
		childProcess = require('child_process'),
		phantomjs = require('phantomjs-prebuilt'),
		binPath = phantomjs.path,
		fse = require('fs-extra');

var BaseModel = function(connection) {
	BaseModel.connection = connection;
	return BaseModel;
}

BaseModel.addModel = function(name, model) {
	if (BaseModel[name])
	BaseModel[name] = {};
	BaseModel[name] = model;
}

BaseModel.generateGUID = function(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < length; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

BaseModel.cleanPhoneFormat = function(object, element) {
	for (var key in element) {
		if (object.hasOwnProperty(element[key]))
		object[element[key]] = object[element[key]].replace(/[^0-9]/g, '');
	}

	return object;
}

BaseModel.objectValidation = function(object, validator, callback) {
	var response = {
		message: '',
		success: true
	};

	for (var key in validator) {
		if (!object.hasOwnProperty(validator[key]) || !object[validator[key]])
		{
			response.message = validator[key] + " is Required.";
			response.success = false;
			break;
		}
	}

	return callback(response);
}

BaseModel.removeObjectElement = function(object, element) {
	var _object = _.clone(object);

	for (var key in element) {
		if (_object.hasOwnProperty(element[key]))
		delete _object[element[key]];
	}

	return _object;
}

BaseModel.JsonToQueryString = function(json) {
	winston.info('BaseModel - JsonToQueryString [Params: %s]', util.inspect(json));
	var query_string;
	for(var key in json) {
		if(json[key] || json[key] === 0)
		query_string = (query_string? query_string + '&' : '?') + key + '=' + json[key];
	}

	return query_string;
}

BaseModel.requestAPI = function(method, params, url, headers, callback) {
	winston.info('BaseModel - requestAPI [method: %s |params: %s |url: %s]', method, util.inspect(params), url);
	var self = this
	, contentType = { 'content-type': 'application/json; charset=utf-8' }
	, body = JSON.stringify(params);

	headers = _.extend(contentType, headers);

	var RequestDone = function(error, response, data) {
		var parsedData;
		if (error)
		{
			winston.error('BaseModel - requestAPI [RequestDone] [Error: %s]', util.inspect(error));
			return callback(error, null);
		}

		try {
			parsedData = JSON.parse(data);
		} catch (err) {
			winston.warn('BaseModel - requestAPI [RequestDone] [try.catch] [Error: %s]', util.inspect())
			parsedData = data;
		}

		if (!data)
		{
			winston.warn('BaseModel - requestAPI [RequestDone] [Response is Empty]');
			return callback(null, 'Response is Empty');
		}
		else if (parsedData && parsedData.error)
		{
			winston.error('BaseModel - requestAPI [RequestDone] [Error: %s]', parsedData.error.message);
			return callback(parsedData.error.message, null);
		}
		else
		return callback(null, parsedData);
	}

	if (method.toLowerCase() == 'get')
	request.get({ headers: headers, url: url }, RequestDone);
	else if (method.toLowerCase() == 'delete')
	request.del({ headers: headers, url: url }, RequestDone);
	else if (method.toLowerCase() == 'post')
	request.post({ headers: headers, url: url, body: body }, RequestDone);
	else if (method.toLowerCase() == 'put')
	request.put({ headers: headers, url: url, body: body }, RequestDone);
	else
	{
		winston.warn('BaseModel - requestAPI [Invalid Method: %s]', method);
		callback('Invalid Method', null);
	}
}

BaseModel.prepareHtmlBody = function(file, params, callback) {
	winston.info('BaseModel - prepareHtmlBody [file: %s] [params: %s]', file, util.inspect(params));
	fs.readFile(file, encoding = 'utf8', function(err, fileData) {
		if (err) {
			winston.error('BaseModel - prepareHtmlBody [Error: %s]', util.inspect(err));
			callback(err, null);
		} else {
			for (var key in params) {
				if (params.hasOwnProperty(key))
				fileData = fileData.replace('${' + key + '}', params[key]).replace('${' + key + '}', params[key]);
			}
			callback(null, fileData);
		}
	});
}

BaseModel.generatePDF = function(html, filename, callback) {
	winston.info('BaseModel - generatePDF [Params: %s]', html, filename);

	var html_path = nconf.get('WEB_ADDRESS') + html;

	var pdf_folder = path.join(process.cwd(), nconf.get('DOCUMENT_FOLDER').replace('.', ''));
	var pdf_path = path.join(pdf_folder, filename);
	var childArgs = [
		path.join(process.cwd(), 'config', 'htmltopdf.js'),
		html_path,
		pdf_path
	];

	fse.mkdirsSync(pdf_folder);
	winston.info('generatePDF [pdf_path: %s]', pdf_path);
	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		if(err)
		{
			winston.error('generatePDF [Error: %s]', util.inspect(err));
			callback(null, false);
		}
		if(stderr)
		{
			winston.error('generatePDF [Error: %s]', util.inspect(stderr));
			callback(null, false);
		}
		else
		{
			var file_path = nconf.get('DOCUMENT_FOLDER').replace('.', '') + filename;
			winston.info('generatePDF [Successfully]');
			callback(null, {success:true, file_path:file_path});
		}
	});
}

module.exports = BaseModel;
