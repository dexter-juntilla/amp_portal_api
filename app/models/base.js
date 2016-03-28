var request = require('request');

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

module.exports = BaseModel;